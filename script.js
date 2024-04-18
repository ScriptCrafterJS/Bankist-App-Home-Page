'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////////

//creating the html cookie element
const message = document.createElement('div');
message.classList.add('cookie-message');
message.innerHTML =
  'we use cookies for improved functionality and analytics. <button class="btn btn--close-cookie">Got It!</button>';

//appending our created html cookie element
const header = document.querySelector('.header');
header.append(message);

//when click the button Got It! it will remove the message
document.querySelector('.btn--close-cookie').addEventListener('click', () => {
  message.remove();
});

//setting some styles for the message element
message.style.backgroundColor = '#37383d';
message.style.width = '120%';
message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 40 + 'px';

const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnScroll.addEventListener('click', function () {
  // const sectionInfo = section1.getBoundingClientRect();

  // window.scrollTo(
  //   sectionInfo.left + window.pageXoffset,
  //   sectionInfo.top + window.pageYOffset
  // );

  // window.scrollTo({
  //   left: sectionInfo.left + window.pageXoffset,
  //   top: sectionInfo.top + window.pageYOffset,
  //   behavior: 'smooth',
  // });

  section1.scrollIntoView({ behavior: 'smooth' });
});

// document.querySelectorAll('.nav__link').forEach(function (element) {
//   element.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = element.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault(); //to prevent a from talking me somewhere else or refreshing the page or ...etc
  const element = e.target; // the actual element that cause the event.
  if (element.classList.contains('nav__link')) {
    //the if statement here to check if its only one of the nav links not the logo and not anything else.
    const id = element.getAttribute('href'); // #features
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

// const h1 = document.querySelector('h1');
// console.log(h1.querySelectorAll('.highlight'));
// console.log(h1.children);

// h1.firstElementChild.style.color = 'yellow';
// h1.lastElementChild.style.color = 'blue';

// h1.closest('.header').style.backgroundColor = 'var(--color-secondary)';

// h1.closest('h1').style.backgroundColor = 'var(--color-primary)';

// console.log(h1.previousElementSibling);
// console.log(h1.nextElementSibling);
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');

tabsContainer.addEventListener('click', function (e) {
  const tab = e.target.closest('.operations__tab');
  if (!tab) return;
  //giving the clicked tab button its active status
  //first clean them all, then add to the specified (clicked) one
  tabs.forEach(t => t.classList.remove('operations__tab--active'));
  tab.classList.add('operations__tab--active');
  const tabContent = document.querySelector(
    `.operations__content--${tab.dataset.tab}`
  );
  //changing the content of the appeared tab
  tabsContent.forEach(cont =>
    cont.classList.remove('operations__content--active')
  );
  tabContent.classList.add('operations__content--active');
});

//links fading motion
const hoveringFade = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        //means to not add the fading effect to the current hovering one
        el.style.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

//addEventListener needs a function to call not a value
// we didn't use mouseenter because it does not go in the bubbling phase
nav.addEventListener('mouseover', hoveringFade.bind(0.5));

nav.addEventListener('mouseout', hoveringFade.bind(1));

// sticky navbar scroll

// const initialCoords = section1.getBoundingClientRect();

//here the efficiency is Really Bad because the scroll is keep calling the function each time we scroll -solution: observer API
// window.addEventListener('scroll', function () {
//   if (window.scrollY > initialCoords.top) {
//     nav.classList.add('sticky');
//   } else {
//     nav.classList.remove('sticky');
//   }
// });

// const callBack = function (entries, observer) {
//   entries.forEach(value => {
//     console.log(value);
//   });
// };

// const observerOptions = {
//   root: null,
//   threshold: [0, 0.2], //means if it shows 20% of it on the viewport fire the func, and if its not showing at all : fires the func,
// };

// const observer = new IntersectionObserver(callBack, observerOptions);
// observer.observe(section1);

const headerSection = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;

const observerCallBack = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) {
    //means if its intersect or not
    nav.classList.add('sticky');
  } else {
    nav.classList.remove('sticky');
  }
};

const observer = new IntersectionObserver(observerCallBack, {
  root: null,
  threshold: 0, //the time header goes out of the viewport when leaving, and in the viewport if entering
  rootMargin: `-${navHeight}px`,
});
observer.observe(headerSection);

//reveal all sections animation
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  //and we need to stop observing because we do it one time and then not at all (better efficiency)
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  roo: null,
  threshold: 0.15,
});
allSections.forEach(section => {
  sectionObserver.observe(section);
  // section.classList.add('section--hidden');
});

////////////////////////////////
//lazy loading images

const targetImages = document.querySelectorAll('img[data-src]');

const showImage = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  // we shall not remove the lazy class right away because when you swap images they always need to be loaded first
  // entry.target.classList.remove('lazy-img');
  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });

  imageObserver.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(showImage, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

targetImages.forEach(image => {
  imageObserver.observe(image);
  image.classList.add('lazy-img');
});

//////////////////////////////////////////////////////

//we will wrap everything in a function so we don't polute the global name space
//Slider...

const slider = function () {
  const slider = document.querySelector('.slider');
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotsContainer = document.querySelector('.dots');

  //creating the dots based on the number of slides
  function createDots() {
    slides.forEach(function (_, index) {
      dotsContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${index}"></button>`
      );
    });
  }

  slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
  });

  let currentSlide = 0;
  const lastSlideIndex = slides.length - 1;

  function moveRight() {
    if (currentSlide < lastSlideIndex) {
      currentSlide++;
    } else {
      //if we are at the last slide go to the first slide
      currentSlide = 0;
    }
    moveSlides(currentSlide);
  }

  function moveLeft() {
    if (currentSlide > 0) {
      currentSlide--;
    } else {
      //if we are at the first slide go to the last slide
      currentSlide = lastSlideIndex;
    }
    moveSlides(currentSlide);
  }

  function moveSlides(currentSlide) {
    slides.forEach((slide, index) => {
      slide.style.transform = `translateX(${(index - currentSlide) * 100}%)`;
    });
    activateDot(currentSlide);
  }

  //function to activate the dot based on the slide that is currently showing up
  const activateDot = function (slide) {
    document.querySelectorAll('.dots__dot').forEach(dot => {
      dot.classList.remove('dots__dot--active');
    });

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };
  //we call it to activate the first one by default

  const init = function () {
    createDots();
    activateDot(0);
  };
  init();

  btnLeft.addEventListener('click', moveLeft);
  btnRight.addEventListener('click', moveRight);
  //handling arrow keys for slider
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight') {
      moveRight();
    } else if (e.key === 'ArrowLeft') {
      moveLeft();
    }
  });
  dotsContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      moveSlides(slide);
    }
  });
};
slider();
//and we could pass to that function an object if we want to change the slide content for something else
