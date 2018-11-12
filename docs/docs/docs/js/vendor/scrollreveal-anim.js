// Scroll reveal
window.sr = ScrollReveal();

for (var index = 1; index < 11; index++) {
    // fade in up
    sr.reveal('.sr-up-td' + index, {
        delay: 100 * index,
        scale: 1,
        distance: '40px',
    });
    // fade in down
    sr.reveal('.sr-down-td' + index, {
        delay: 100 * index,
        scale: 1,
        distance: '-40px',
    });
    // zoom in
    sr.reveal('.sr-zoomin-td' + index, {
        delay: 100 * index,
        scale: 0.8,
        distance: '0',
    });
    // zoom out
    sr.reveal('.sr-zoomout-td' + index, {
        delay: 100 * index,
        scale: 1.2,
        distance: '0',
    });

}