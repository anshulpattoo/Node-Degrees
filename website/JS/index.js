function defineElements() {
    const elements = {
        introText: document.querySelectorAll('.app-intro-text span'),
        header: document.querySelector('header'),
        video: document.querySelector('video'),
        introSection: document.querySelector('.intro-section'),
        body: document.querySelector('body'),
        stickyTitleBar: document.querySelector('.animate__fadeIn')
        
    };
    return elements;
}

function onload() {
    const elements = defineElements();
    setTimeout(function() {
        elements.introText.forEach(el => el.style.display = 'inline');
    }, 50);
    return elements;
}

window.addEventListener('load', onload);


window.onscroll = function(ev) {
    const elements = defineElements();
    if (window.scrollY >= elements.introSection.offsetHeight) {
        const markup = `<div class='row sticky animate__animated animate__fadeIn' style="
            text-align: center;
            position: fixed;
            height:100px;
            background-color:skyblue;"
            class="container">
                <p style="
                margin-top:20px;
                font-size:40px;
                color:black;
                font-family: 'Libre Caslon Display', serif;
                ">
                Github Degrees of Separation
                </p>
            </div>`;
        elements.body.insertAdjacentHTML('afterbegin', markup);
        
    }
};
