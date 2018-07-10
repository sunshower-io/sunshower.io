'use strict';
// var mainDocument = $(document);

// init foundation
// $(document).foundation();

// Init all plugin when document is ready 
$(document).on('ready', function () {
  // 0. Init console to avoid error
  var method;
  var noop = function () { };
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'
  ];
  var length = methods.length;
  var console = (window.console = window.console || {});
  var contextWindow = $(window);
  var $root = $('html, body');
  while (length--) {
    method = methods[length];
    // Only stub undefined methods.
    if (!console[method]) {
      console[method] = noop;
    }
  }

  // 1. Background image as data attribut 
  var list = $('.bg-img');
  for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-image-src');
    list[i].style.backgroundImage = "url('" + src + "')";
    list[i].style.backgroundRepeat = "no-repeat";
    list[i].style.backgroundPosition = "center";
    list[i].style.backgroundSize = "cover";
  }
  // Background color as data attribut
  var list = $('.bg-color');
  for (var i = 0; i < list.length; i++) {
    var src = list[i].getAttribute('data-bgcolor');
    list[i].style.backgroundColor = src;
  }

  // 2. Init Coutdown clock
  try {
    // check if clock is initialised
    $('.clock-countdown').downCount({
      date: $('.site-config').attr('data-date'),
      offset: +10
    });
  }
  catch (error) {
    // Clock error : clock is unavailable
    console.log("clock disabled/unavailable");
  }

  // 3. Navigation menu
  // 3.1 Show/hide menu when icon is clicked
  var menuItems = $('.all-menu-wrapper .nav-link');
  var menuIcon = $('.menu-icon, #navMenuIcon');
  var menuBlock = $('.all-menu-wrapper');
  var menuLinks = $(".top-menu-links a, .main-menu a, .all-menu-wrapper a");
  // Menu icon clicked
  menuIcon.on('click', function () {
    console.log('menu clicked')
    menuIcon.toggleClass('menu-visible')
    menuBlock.toggleClass('menu-visible')
    menuItems.toggleClass('menu-visible');
    return false;
  });

  // Hide menu after a menu item clicked
  menuLinks.on('click', function () {
    if (menuItems.hasClass('menu-visible')) {
      menuIcon.removeClass('menu-visible');
      menuBlock.removeClass('menu-visible');
      menuItems.removeClass('menu-visible');
    }
    return true;
  });
  // 3.2 Page navigation
  $('#topBarMenu').onePageNav({
    currentClass: 'active',
    changeHash: false,
    scrollSpeed: 750,
    scrollThreshold: 0.5,
    filter: '',
    easing: 'swing',
    begin: function () {
      //I get fired when the animation is starting
    },
    end: function () {
      //I get fired when the animation is ending
    },
    scrollChange: function ($currentListItem) {
      //I get fired when you enter a section and I pass the list item of the section
    }
  });

  // 4 Carousel Slider

  // 4.c carousel-swiper-hash demo
  new Swiper('.carousel-swiper-hash-demo .swiper-container', {
    pagination: '.carousel-swiper-hash-demo .items-pagination',
    paginationClickable: true,
    paginationBulletRender: function (swiper, index, className) {
      var text = swiper.slides[index + 1].getAttribute('data-hash');
      return '<span class="' + className + ' ">' + text + '</span>';
    },
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 0,
  });

  // 4.c carousel-swiper-review demo
  new Swiper('.carousel-swiper-review-demo .swiper-container', {
    pagination: '.carousel-swiper-review-demo .items-pagination',
    paginationClickable: true,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 0,
  });

  // 4.d carousel-beta demo
  new Swiper('.carousel-swiper-beta-demo .swiper-container', {
    pagination: '.carousel-swiper-beta-demo .items-pagination',
    paginationClickable: '.carousel-beta-alpha-demo .items-pagination',
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    autoplay: 5000,
    autoplayDisableOnInteraction: false,
    slidesPerView: 1,
    spaceBetween: 0,
  });

  // contact form
  var sendEmailForm = $('.send_email_form');
  var sendMessageForm = $('.send_message_form');
  // Default server url
  var newsletterServerUrl = './ajaxserver/serverfile.php';
  var messageServerUrl = './ajaxserver/serverfile.php';

  // Use form define action attribute
  if (sendEmailForm.attr('action') && (sendEmailForm.attr('action')) != '') {
    newsletterServerUrl = sendEmailForm.attr('action');
  }
  if (sendMessageForm.attr('action') && (sendMessageForm.attr('action') != '')) {
    messageServerUrl = sendMessageForm.attr('action');
  }

  sendEmailForm.initForm({
    serverUrl: newsletterServerUrl,
  });
  sendMessageForm.initForm({
    serverUrl: messageServerUrl,
  });

  // 8. Hide some ui on scroll
  var scrollHeight = $(document).height() - contextWindow.height();
  contextWindow.on('scroll', function () {
    var scrollpos = $(this).scrollTop();
    var siteHeaderFooter = $('.page-footer, .page-header');

    // if (scrollpos > 10 && scrollpos < scrollHeight - 100) {
    if (scrollpos > 50) {
      siteHeaderFooter.addClass("scrolled");
    }
    else {
      siteHeaderFooter.removeClass("scrolled");
    }
  });



  // 9. Page Loader : hide loader when all are loaded
  contextWindow.on('load', function () {
    $('#page-loader').addClass('p-hidden');
    $('.section').addClass('anim');
  });

});

