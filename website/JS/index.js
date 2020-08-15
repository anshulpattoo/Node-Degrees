window.addEventListener('load', function() {
    const elements = {
        introText: document.querySelectorAll('.app-intro-text span'),
        video: document.querySelector('video'),
        head: document.querySelector('head')
    };
    setTimeout(function() {
        elements.introText.forEach(el => el.style.display = 'inline-block');
    }, 50);
});

/*

$('.graph-section').waypoint(function(direction) {
    if (direction == "down") {
        $('nav').addClass('sticky');
    } else {
        $('nav').removeClass('sticky');
    }
}, {
  offset: '60px'
});
*/
console.log("hello, world");