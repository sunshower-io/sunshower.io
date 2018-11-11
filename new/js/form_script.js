"use strict";

/* Ajax Form Plugin V 1.0.1
 * Send contact and newsletter form data to a server and waiting for its response.
 * Compatible with jqery validator plugin
 */

// (function ($) {
//
//     $.fn.initForm = function (options) {
//         var settings = $.extend({
//             type: 'post',
//             // serverUrl: '#',
//             // serverUrl: '/new/ajaxserver/server.php',
//             serverUrl: 'http://www.google.com',
//             successClean: this.find('.form-success-clean'),
//             successGone: this.find('.form-success-gone'),
//             successInvisible: this.find('.form-success-invisible'),
//             successVisible: this.find('.form-success-visible'),
//             textFeedback: this.find('.form-text-feedback'),
//         }, options);
//         var $ajax = {
//             sendRequest: function (p) {
//                 var form_fill = $(p);
//
//                 // Get the form data.
//                 var form_inputs = form_fill.find(':input'),
//                     form_data = {};
//                 form_inputs.each(function () {
//                     var value = $(this).val(),
//                         name = this.name;
//
//                     if (name || value) {
//                         if (!name) {
//                             form_data[value] = value;
//                         } else {
//                             form_data[name] = value;
//                         }
//                     }
//                 });
//                 var request = {
//                     type: 'io.sunshower.sdk.v1.model.core.security.RegistrationRequestElement',
//                     'first-name': form_data['full-name'],
//                     'email-address': form_data['email'],
//                     'phone-number': form_data['phone-number']
//                 };
//                 $.ajax(
//                     {
//                         /*
//                          *Your Ajax Server Here,
//                          * use internal url (such as './ajaxserver/server.php') or
//                          * external URL such as:  url: 'http://www.example.com/avenir/ajaxserver/server.php'
//                          * depending to your requirements
//                          */
//                         // url: settings.serverUrl,
//                         url: 'https://localhost:8443/kernel/api/v1/signup?products=stratosphere:design&products=stratosphere:discover',
//                         type: settings.type,
//                         data: JSON.stringify(request),
//                         dataType: 'json',
//
//                         /* CALLBACK FOR SENDING EMAIL GOEAS HERE */
//                         success: function (data) {
//                             //Ajax connexion was a success, now handle response
//                             if (data && !data.error) {
//                                 // Hide for if no error
//                                 settings.successClean.val("");
//                                 settings.successInvisible.addClass('invisible');
//                                 settings.successGone.addClass('gone');
//                                 settings.successVisible.removeClass('invisible');
//                                 settings.successVisible.removeClass('gone');
//                                 console.log('Request sent successfully');
//                             }
//                             // Else the login credentials were invalid.
//                             else {
//                                 //Ajax connexion reject an error a success, now handle response
//                                 settings.textFeedback.removeClass('gone');
//                                 settings.textFeedback.removeClass('invisible');
//                                 settings.textFeedback.html('Error when sending request.');
//                                 console.log('Could not process AJAX request to server');
//                             }
//                         },
//                         /* show error message */
//                         error: function (jqXHR, textStatus, errorThrown) {
//                             //ajax error
//                             settings.textFeedback.removeClass('gone');
//                             settings.textFeedback.removeClass('invisible');
//                             settings.textFeedback.html('Error when sending request.');
//                             console.log('ajax error');
//
//                         }
//                         /* END EMAIL SENDING CALLBACK */
//                     });
//             }
//
//         };
//
//
//         //if jquery validator plugin is enable, use it
//         if (jQuery.validator) {
//             jQuery.validator.setDefaults({
//                 success: "valid"
//             });
//             this.validate({
//                 rules: {
//                     field: {
//                         required: true,
//                         email: true
//                     }
//                 }
//             });
//         }
//
//
//         this.submit(function (event) {
//             console.log('Send request');
//             event.preventDefault();
//             if (jQuery.validator) {
//                 if ($(this).valid()) {
//                     $ajax.sendRequest(this);
//                 }
//             }
//             else {
//                 $ajax.sendRequest(this);
//             }
//         });
//
//     };
//
// }(jQuery));

/* End of ajax */

$(function() {
    $('#signupsuccess').hide();
});

$('#signup-form').submit(function (event) {

    event.preventDefault();

    var buildRawStructure = function () {
            var form = $(event.target),
                inputs = form.find(':input'),
                result = {};
            inputs.each(function () {
                var key = this.name,
                    value = $(this).val();
                if (key || value) {
                    if (!key) {
                        result[value] = value;
                    } else {
                        result[key] = value;
                    }
                }
            });
            console.log(result);
            return result;
        },

        randomTemPW = function () {
            //meh--can't log in unless active anyway.  We'll just assign you a random pw in the email;
            var alphabet = '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
            if (window.crypto) {
                var vals = new Uint32Array(10),
                    result = '';
                window.crypto.getRandomValues(vals);
                for(var val in vals) {
                    var actualval = vals[val] % alphabet.length;
                    result += alphabet[actualval];
                }
                return result;
            } else {
                var result = '';
                for(var i = 0; i < 10; i++) {
                    var v = Math.random() * alphabet.length,
                        n = alphabet[v];
                    result += n;
                }
                return result;
            }


        },
        sanitizeName = function(name)  {
            return name ? name.split('\\s+').join('_') + randomTemPW() : '';
        },

        buildRequest = function () {
            var rawStructure = buildRawStructure(),
                request = {
                    type: 'io.sunshower.sdk.v1.model.core.security.RegistrationRequestElement',
                    'first-name': '',//rawStructure['full-name'],
                    'email-address': rawStructure['email'],
                    'phone-number': '',//rawStructure['phone-number'],
                    products: ['sunshower', 'troposophere','anvil'],
                    username: rawStructure['full-name'] ? sanitizeName(rawStructure['full-name']) : rawStructure['email'].replace('@', '').replace(/\./g,''),
                    'password': randomTemPW() // this is ok--you can't log in without us
                    // activating you, anyway, and we'll reset your password then
                };
            return request;
        },
        url = 'https://sun.sunshower.io:8443/kernel/api/v1/signup?products=stratosphere:design&products=stratosphere:discover',
        request = buildRequest();

    if($(event.target).valid()) {

        $.ajax({
            url: url,
            type: 'post',
            dataType: 'json',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(request),
            success: function(data, text, jqxhr) {
                $('#formcontainer').hide();
                $('#signupsuccess').show();

            }
        });
    }


});

// Make them as plugin
