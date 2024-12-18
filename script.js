'use strict';

///////////////////////////////////////
// Modal window
/* Create classes and style them then add and remove with javascript */

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to')
const sectionOne = document.querySelector('#section--1')
const nav = document.querySelector('.nav')

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

/* for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal); */

btnsOpenModal.forEach(btn => btn.addEventListener('click',openModal))

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
/* SMOOTH LEARN MORE */
btnScrollTo.addEventListener('click',function(e){
  const s1coords = sectionOne.getBoundingClientRect();
  sectionOne.scrollIntoView({behavior:'smooth'})
})

/* COOKIE */
const header = document.querySelector('.header')
const message = document.createElement('div')
message.classList.add('cookie-message')
message.innerHTML= 'We use cookies for analytics and improved functionalities <button class = "btn btn--close--cookie">Got it!</button>'
header.append(message)
document.querySelector ('.btn--close--cookie').addEventListener('click',function(){
  message.remove()
})

/* Parent element */
document.querySelector('.nav__links').addEventListener('click',function(e){
  e.preventDefault()

  /* MATCH STRATEGY */
  if(e.target.classList.contains('nav__link')){
    const id = e.target.getAttribute('href')
    console.log(id) /* Already perfect selector so we use without the quotation */
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
})

// TABBED COMPONENTS
const tabs = document.querySelectorAll('.operations__tab')
const tabContainer = document.querySelector('.operations__tab-container')
const tabContent = document.querySelectorAll('.operations__content')
tabContainer.addEventListener('click',function(e){
const clicked = e.target.closest('.operations__tab') /* In using only target you get even the children ,e.g span inside and all , so we target parent element which is also not efficient because you tend to click the whole operation section, so we search for closest operation tab*/

/* GUARD CLAUSE : THESAME AS SAYING IF CLICKED BE ACTIVE ELSE DO NOT */
if(!clicked) return
/* REMOVE ACTIVE ON ALL TABS : so you remove all and below if clicked makes it active,first active ,so no confusion bro 😊*/

/* REMOVE ACTIVE CLASSES */
tabs.forEach(t => t.classList.remove('operations__tab--active'));
/* REMOVE ALL TAB CONTENT AND REVEAL ONLY ON CLICK */
tabContent.forEach(c=>c.classList.remove('operations__content--active'))
clicked.classList.add('operations__tab--active')

/* ACTIVate content area */
console.log(clicked.dataset.tab)
document.querySelector(`.operations__content--${clicked.dataset.tab}`)
.classList.add('operations__content--active') /* Element are saved in data set property , we add to make it active if clicked*/
})

/* MENU FADE ANIMATION */
/* HANDLE HOVER */
const handleOver = function(e,opacity){
  if(e.target.classList.contains ('nav__link')){
    const link = e.target
    const siblings = link.closest('.nav').querySelectorAll('.nav__link') /* Checks for parent element nav with the sibling nav__link select all*/
    const logo = link.closest('.nav').querySelector('img')
  
    siblings.forEach(el => {
      if (el !== link) el.style.opacity = this
  
    })
    logo.style.opacity = this
  }
}
/* MOUSE IN */
nav.addEventListener('mouseover',handleOver.bind(0.5))
nav.addEventListener('mouseout',handleOver.bind(1)) 



const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headerObserver.observe(header);

///////////////////////////////////////
// Reveal sections
const allSections = document.querySelectorAll('.section');

const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return; /* If not intersecting return right away but if it's intersecting run the other code*/
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15, /* WES SET 0.15 SO WHEN IT'S 15% INTO PAGE IT SHOw */
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});


/* LOADING IMAGES : You can put clearer image in data source */
/* SELECT ELEMENT WITH DATA SOURCE PROPERTY */
const imageTarget = document.querySelectorAll('img[data-src]')

const loadImg = function(entries,observer){
  const [entry] = entries
  console.log(entry)

  if(!entry.isIntersecting) return;
  
  /* Replace source image with data src image */
  entry.target.src = entry.target.dataset.src

  entry.target.addEventListener('load',()=>{
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}

const imageObserver = new IntersectionObserver (loadImg,{
  root:null,
  threshold:0.15,
})

imageTarget.forEach(img => imageObserver.observe(img))


const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let curSlide = 0;
  const maxSlide = slides.length;

  // Functions
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        'beforeend',
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  const activateDot = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(dot => dot.classList.remove('dots__dot--active'));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  // Next slide
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const prevSlide = function () {
    if (curSlide === 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }
    goToSlide(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    goToSlide(0);
    createDots();

    activateDot(0);
  };
  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);
  btnLeft.addEventListener('click', prevSlide);

  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    e.key === 'ArrowRight' && nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const { slide } = e.target.dataset;
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
slider();


/* BIND METHOD: CREATES COPY OF FUNCTION CALLED ON , set this keyword to value passed to bind */
/* MOUSE OUT */


/* STICKY NAV : By adding sticky to nav position fixed,background color white*/

/* const initialCords = sectionOne.getBoundingClientRect()
window.addEventListener('scroll',function(){ */
  /* Check for initial rect that contains X,Y of section */
  /* WIll be fired up as website is scrolled  scrollY-top X-side*/
/*   console.log(window.scrollY)
  if(window.scrollY > initialCords.top) nav.classList.add('sticky')
  else nav.classList.remove('sticky')
}) */





/* Mouse out to undo mouse enter */
/* DOM TRAVERSING : SELECTING AN ELEMENT BASED ON ANOTHER */
/* const h1 = document.querySelector('h1') */
/* Going downwards */
/* console.log(document.querySelectorAll('.highlight'))
console.log(h1.childNodes)
console.log(h1.children)
h1.firstElementChild.style.color = "white"
h1.lastElementChild.style.color = "black" */

/* Parent element */


/* console.log(h1.parentNode)
console.log(h1.parentElement) */

/* h1.closest('.header').style.background = 'var(--gradient-secondary)' */ /* VAR + COLOR USING CSS ROOT */

/* console.log(h1.previousElementSibling)
console.log(h1.nextElementSibling)  *//* It doesnt have a previous sibling only a next sibling */

////


/* Page navigation */
/* document.querySelectorAll('.nav__link').forEach(function(el){
  el.addEventListener('click',function(e){
    e.preventDefault()
    const id = this.getAttribute('href')
    console.log(id) */ /* Already perfect selector so we use without the quotation */
/*    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  })
})
 */
/* 
Event delegation
Best to put event handler on parent element so that if the child is triggered it just works 
add event listener to parent element ,determine what element originated event
*/




/* Practice */

/* SELECTING ELEMENTS */

/* Selecting entire HTMl  */
/* console.log(document.documentElement) */
/* for head and body */
/* console.log(document.head)
console.log(document.body) */

/* Single element */
 

/* const allSection = document.querySelectorAll('.section')
console.log(allSection)  */

/* With ID */
/* document.getElementById('section--1') */

/* With tag names */
/* const allButtons = document.getElementsByTagName('button') */ /* All elements with button */
/* console.log(allButtons) */

/* class names */
/* document.getElementsByClassName('btn') */ /* Similar to get elementById */

/* CREATING AND INSERTING ELEMENTS */
/* header.append(message)  *//* puts at end  Last Born*/
 /* Puts at beginning 1st born */

/* To make appear in both places */
/* header.append(message.cloneNode(true)) */
/* header.before(message) *//* Creates or adds before the header */
/* header.after(message)  *//* Adds after the header */

/* DELETE ELEMENTS */

 /*  message.classList.add('hidden') */


/* Style */
/* Gives it inline styling */
/* message.style.backgroundColor = '#37383d'
message.style.width = '110%'

console.log(getComputedStyle(message).color) */ /* Shows all styling while with dot element it brings out property  */

/* Parse int or float it's a floating point number so we use float */
/* message.style.height = Number.parseFloat(getComputedStyle(message).height,10) + 20 + 'px'
 */
/* Change property to change what an initial element is in the css */
/* document.documentElement.style.setProperty('--color-primary','orangered') */ /* name , and the color  */

/* Attributes */
/* const logo = document.querySelector('.nav__logo')
console.log(logo.alt)
console.log(logo.src) */ /* To be able to get the elments of the stuff */
/* console.log(logo.className) */

/* You can also set elements */
/* logo.alt = "Beautiful minimalist logo" */

/* You can also set and get attribute */
/* console.log(logo.getAttribute('designer'))
logo.setAttribute('company','bankist') */ /* The attribute and then the name */

/* Absolute and relative src link */
/* console.log(logo.src)  */ /* The absolute the link from file it was linked */
/* console.log(logo.getAttribute('src')) */ /* Relative the direct link */
/* Another example */
/* const link = document.querySelector('.twitter-link')
console.log(link.getAttribute('href'))
console.log(link.href) */

/* Data attributes */
/* console.log(logo.dataset.versionNumber)  *//* Transform to camelCase */

/* Classes */
/* logo.classList.add('c','j' *)/ /* You can add multiple classes by adding multiple value */
/* logo.classList.remove('c')
logo.classList.toggle('c')
logo.classList.contains('c') */

/* Smooth scrolling */
/* console.log(e.target.getBoundingClientRect()) */ /* X = distance from border from border of browser , Y is distance from the top ,  */
/*  console.log('Current scroll X/Y' , window.pageXOffset,pageYOffset)
*/
/*  window.scrollTo(s1coords.left,s1coords.top + window.pageYOffset) */ /* We add the page Y offset for it go to the features section despite the scroll , we can also add the X for formalities */
/* 
window.scrollTo({
left: s1coords.left + window.pageXOffset,
top:s1coords.top + window.pageYOffset,
behavior:"smooth"
}) */




/* EVENTS */
/* const h1 = document.querySelector('h1')
h1.addEventListener('mouseenter',function(e){
  alert('well its cool i guess')
}) */

/* const alertH1 = function(e){
  alert(`Dope`)
  h1.removeEventListener('mouseenter',alertH1)
} 
h1.addEventListener('mouseenter',alertH1) */

/* setTimeout(()=>h1.removeEventListener('mouseenter',alertH1),3000) */
/* h1.onmouseenter = function(e){
  alert('old school')
} */

/* const Car = function(make,speed){
  this.make = make
  this.speed = speed
}

Car.prototype.accelerate = function(){
  this.speed += 10
  console.log(`${this.make} is going at ${this.speed} Km/h`)
}
Car.prototype.brake = function(){
  this.speed -= 5
  console.log(`${this.make} is going at ${this.speed} Km/h`)
}
const bmw = new Car ('BMW',120)
const mercedes = new Car ('Mercedes',95)

bmw.accelerate()
bmw.accelerate()
bmw.accelerate()

mercedes.brake()
mercedes.brake()

const epl = function(team,goals){
  this.team = team
  this.goals = goals
}

epl.prototype.relegation = function(){
  this.goals -=20
  console.log(`${this.team} is relegated with ${this.goals}`)
}

epl.prototype.promotion = function(){
  this.goals +=20
  console.log(`${this.team} is promoted with ${this.goals}` )
}

const manunited = new epl ('Man United',20)
const liverpool = new epl ('Liverpool', 83)

manunited.relegation()
liverpool.promotion()
 */

/* Object oriented programming */

/* Class expression */
/* const personCl = class{}
 */
/* Class declaration */
/* class personCl{
  constructor(firstName,birthYear){ */ /* Method of personCl class */
  /*  this.firstName = firstName
    this.birthYear = birthYear
  }

  calcAge(){
    console.log(2024-this.birthYear)
  }

  greet(){
    console.log(`Hi ${this.firstName}`)
  }
} */

/* const jessica = new personCl ('Jessica',1996)
const favour  = new personCl('Favour',2002)
console.log(jessica)
console.log(favour)
favour.calcAge()
favour.greet()
console.log(jessica.__proto__ === personCl.prototype)

personCl.prototype.greet = function(){
  console.log(`Hey ${this.firstName}`)
} */

/* jessica.greet() */

/* EVENT PROPAGATION */
/* const randomInt = (max,min) => 
  Math.floor(Math.random() * (max - min + 1) + min)
const randomColor = () => `rgb(${randomInt(0,255)},${randomInt(0,255)}, ${randomInt(0,255)})`
 */
/* document.querySelector('.nav__link').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor()  */ /* It's going to point to the parent element the nav-link */
 /*  console.log(e.target,e.currentTarget)  *//* Where event originated */
  /* e.stopPropagation() */ /* Stops from toucing parent element */
/* }) */

/* document.querySelector('.nav__links').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor()
  console.log(e.target,e.currentTarget)
}) */
/* e.currentTarget where element is attached */

/* document.querySelector('.nav').addEventListener('click',function(e){
  this.style.backgroundColor = randomColor()
  console.log(e.target,e.currentTarget)
}) */

/* If you click on the element it only affects the element and it's parent element and not the child element

if no parent element then it only affects the element  
*/

/* INTERSECTION OBSERVER API */
/* const obsCallback = function(entries, observer){ */
  /* Entries are arrays of threshold entries */
/*   entries.forEach(entry =>{
    console.log(entry)  // FOR each entry into a page it will logout the entries and prperty
  })
} */
/* const obsOptions = { */
  /* ROOT ELEMENT IS THE TARGET ELEMENT */
    /* root:null, */ /* observe target element Intersect all page if null */
    /* threshold:0.1 */ /* Percentage at which observer will be called 10% = 0.1 shows with 10% intersection ration*/

/* } */


/* const observer = new IntersectionObserver(obsCallback,obsOptions)
observer.observe(sectionOne) */ /* observe Target element */


/* INtersection observer Api
1. CALLBACK function :containing arguments of entry and the observer Logic passed here
2. OPTIONS object: containing the root and the threshold
3. INtersection : with callback and option parameter

*/


/* OBSERVE HEADER : SO THAT WHEN HEADER IS OUT OF VIEW NAV WILL SHOW */
/* Already called header upwards */


/* Add hidden class ,add to html of all four sections advices to add hidden class via javascript */

/* SMOOTH SCROLLING */
