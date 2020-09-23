/* eslint-disable no-unused-vars */
/* eslint-disable func-style */
/* eslint-disable require-jsdoc */

function SetCss() {
    let css = '.slides{position: relative} .controls{position: relative} .indicators{display: flex};';
    let head = document.querySelector('head');
    let style = document.createElement('style');
    style.setAttribute('type', 'text/css');
    style.appendChild(document.createTextNode(css));
    head.appendChild(style);
}

let prevChildIndex = null;
let handler = function ClickItem(e) {
    let element = e.target;
    if (element.classList.contains('indicators__item')) {
        let parent = document.querySelector('.indicators');
        let currentIndex = +e.target.getAttribute('data-slide-to');
        parent.childNodes[currentIndex].setAttribute('style', 'background: red;');

        //chek onclick
        if (prevChildIndex !== null) {
            parent.childNodes[prevChildIndex].setAttribute('style', null);
        }
        prevChildIndex = currentIndex;
    }
}

function createCarousel(slidesCount = 5) {
    //adding css in #carousel container
    SetCss();

    let container = document.querySelector('#carousel');
    //creating container for slides
    let slidesContainer = document.createElement('ul');
    slidesContainer.setAttribute('class', 'slides');

    slidesContainer.addItem = function (index) {
        //adding slides
        let childItem = document.createElement('li');
        childItem.setAttribute('class', 'slides__item');
        if (index === 0) childItem.classList.add('active');
        //adding links
        let childLink = document.createElement('a');
        childLink.setAttribute('href', '#');
        //append a into li
        childItem.appendChild(childLink);
        this.appendChild(childItem);
    }

    //creating indicators
    let indicatorsContainer = document.createElement('div');
    indicatorsContainer.setAttribute('class', 'indicators');
    indicatorsContainer.addEventListener('click', handler);
    indicatorsContainer.addItem = function (index) {
        let childItem = document.createElement('span');
        childItem.innerText = index;
        childItem.setAttribute('class', 'indicators__item');
        if(index === 0) childItem.classList.add('active');
        childItem.setAttribute('data-slide-to', index);
        this.appendChild(childItem);
    }
    //adding controls container
    let controlsContainer = document.createElement('div');
    controlsContainer.setAttribute('class', 'controls');
    controlsContainer.addItem = function (index) {
        if(index > 2) return;
        let childItem = document.createElement('div');
        childItem.setAttribute('class', 'controls__item');

        let childLink = document.createElement('i');
        childLink.setAttribute('class', 'fas');

        //setting prev, next, pause
        childItem.appendChild(childLink);
        switch (index) {
            case 0:
                childItem.classList.add('controls__prev');
                childLink.classList.add('fa-chevron-left');
                break;
            case 1:
                childItem.classList.add('controls__next');
                childLink.classList.add('fa-chevron-right');
                break;
            case 2:
                childItem.classList.add('controls__pause');
                childLink.classList.add('fa-play');
                break;
        }
        childItem.appendChild(childLink);
        this.appendChild(childItem);
    }

    for (let i=0; i < slidesCount; i++) {
        slidesContainer.addItem(i);
        indicatorsContainer.addItem(i);
        controlsContainer.addItem(i);
    }

    container.appendChild(slidesContainer);
    container.appendChild(indicatorsContainer);
    container.appendChild(controlsContainer);
}

createCarousel(4);

/*function createCarousel(slidesCount = 5) {
    let container = document.querySelector('#carousel');
    let slides = container.querySelectorAll('.slides .slides__item');
    let indicatorContainer = container.querySelector('.indicators');
    let indicators = indicatorContainer.querySelectorAll('.indicators__item');
    let controls = container.querySelector('.controls');
    let pauseBtn = controls.querySelector('.controls__pause');
    let prevBtn = controls.querySelector('.controls__prev');
    let nextBtn = controls.querySelector('.controls__next');


    let currentSlide = 0;
    let timerID = null;
    let interval = 2000;
    let isPlaying = true;
    slides.length = slidesCount;

    const FA_PAUSE = '<i class="fas fa-pause"></i>';
    const FA_PLAY = '<i class="fas fa-play"></i>';

    function gotoNth(n) {
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
        currentSlide = (slidesCount + n) % slidesCount;
        slides[currentSlide].classList.toggle('active');
        indicators[currentSlide].classList.toggle('active');
    }

    function gotoPrev() {
        gotoNth(currentSlide - 1);
    }
    function gotoNext() {
        gotoNth(currentSlide + 1);
    }
    function play() {
        pauseBtn.innerHTML = FA_PAUSE;
        isPlaying = !isPlaying;
        timerID = setInterval(gotoNext, interval);
    }
    function pause() {
        if (isPlaying) {
            pauseBtn.innerHTML = FA_PLAY;
            isPlaying = !isPlaying;
            clearInterval(timerID);
        }
    }
    function pausePlay() {
        if (isPlaying) pause();
        else play();
    }
    function prev() {
        pause();
        gotoPrev();
    }
    function next() {
        pause();
        gotoNext();
    }
    function indicate(e) {
        let target = e.target;

        if (target.classList.contains('indicators__item')) {
            pause();
            gotoNth(+target.getAttribute('data-slide-to'));
        }
    }


    pauseBtn.addEventListener('click', pausePlay);
    prevBtn.addEventListener('click', prev);
    nextBtn.addEventListener('click', next);
    indicatorContainer.addEventListener('click', indicate);

    timerID = setInterval(gotoNext, interval);
}

createCarousel(4);*/
