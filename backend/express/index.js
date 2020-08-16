//Global variable definitions
let repoValOne;
let repoValTwo;
let elements;

/* Function definitions */

//Definining elements in the DOM
function defineElements() {
    elements = {
        introText: document.querySelectorAll('.app-intro-text span'),
        header: document.querySelector('header'),
        video: document.querySelector('video'),
        graphSection: document.querySelector('.graph-section'),
        introSection: document.querySelector('.intro-section'),
        introSectionHeader: document.querySelector('.section-header'),
        body: document.querySelector('body'),
        stickyTitleBar: document.querySelectorAll('.sticky'),
        repoCompButton: document.querySelector('button'),
        repoTextBoxes: document.querySelectorAll('input')  
    };
}

//Set a time delay on load of the webpage to enable the video to load first, then text.
function onload() {
    defineElements();
    setTimeout(function() {
        elements.introText.forEach(el => el.style.display = 'inline');
    }, 50);
}

//Registers values user has entered for repositories.
function valReg() {
    if (!el.value) {
        alert('A repository value has not been entered');
    } else {
        if (index === 1) {
            repoValOne = el.value;
        } else {
            repoValTwo = el.value;
        }
    }
}

//The front-end portion of the repo search can be conducted over here 
function repoSearch() {
    defineElements();
    /* Repo search stuff (can be implemented by Forest) */
}

/* ALL EVENT LISTENERS */
window.addEventListener('load', onload);

/* Cool header event triggered based on scrolls (poor implementation, but implementation nonetheless) */
window.addEventListener('scroll', function() {
    defineElements();
    if (window.scrollY >= elements.graphSection.offsetHeight * 2.25) {
        const markup = `<div class='sticky animate__animated animate__fadeIn' style="
            text-align: center;
            position: fixed;
            height:100px;
            "
            class="container">
                <p style=" margin-top: 20px;">
                Github Degrees of Separation
                </p>
            </div>`;
        elements.body.insertAdjacentHTML('afterbegin', markup); 
    } else {
        if (elements.stickyTitleBar) {
            elements.stickyTitleBar.forEach(el => {
                el.classList.add('animate__animated');
                el.classList.add('animate__fadeOut');
            });
        }
    }
});

/* Form submission */
document.addEventListener('click', function(e) {
    defineElements();
    if (e.target.closest('button')) {
        elements.repoTextBoxes.forEach((el, index) => {
            valReg();
        /*******************
        *   CARRY OUT REPOSITORY SEARCH HERE. WE CAN ABSTRACT AWAY COMPLEXITY IN
        *   REPOSEARCH() FUNCITON
        *
        *
        */
            
        /* LOADER IMPLEMENTATION...?
        
        
        /*
        *** PRINT/OUTPUT RESULTS TO THE HTML DOC
        **
        */
        });
    }
});

/*

// Form submission via enter key press
document.addEventListener('keypress', function(e) {
   defineElements();
   console.log(e.target);
   if (e.target.closest('input') {
       console.log('Pressed');
   }
                          }
                         );
*/
