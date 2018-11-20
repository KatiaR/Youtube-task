import './scss/main.scss';
import getDataFromYoutube, { resetPageToken, slider } from './getData';
import { addAttr } from './utils';
//import { createSearchField } from './createSearchField';


 const section = document.createElement('section');
 section.className = 'search-section';
 document.body.appendChild(section);

 const form = document.createElement('form');
 form.setAttribute('action', '#');
 section.appendChild(form);

 const input = document.createElement('input');
 input.className = 'search-field';
 const attr = {
   type: 'text',
   id: 'search',
   placeholder: 'search video',
 };

 addAttr(input, attr);

 const attrbtn = {
   type: 'submit',
   id: 'searchBtn',
   value: 'Search',
 };
 form.appendChild(input);

 const btn = document.createElement('input');
 btn.className = 'search-btn';
 form.appendChild(btn);
 addAttr(btn, attrbtn);

 const attrAddMore = {
   type: 'button',
   id: 'addMore',
   value: 'Add more',
 };
const btnAdd = document.createElement('button');
btnAdd.className = 'search-btn';
btnAdd.textContent = 'Add more';
form.appendChild(btnAdd);
addAttr(btnAdd, attrAddMore);

const searchButton = document.getElementById('searchBtn');

const main = document.createElement('main');
main.className = 'video-field';
document.body.appendChild(main);

function showAnswer() {
  resetPageToken();
  const wrapperSlider = document.getElementsByClassName('wrapper-slider');
  const dotsBlock = document.getElementsByClassName('block-navigation');
  if (wrapperSlider.length && dotsBlock.length) {
    document.body.removeChild(wrapperSlider[0]);
    document.body.removeChild(dotsBlock[0]);
  }
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'wrapper-slider';
  main.appendChild(sliderContainer);
  getDataFromYoutube();
}
searchButton.addEventListener('click', showAnswer);


function addContainer() {
  const dotsBlock = document.getElementsByClassName('block-navigation');
  if (dotsBlock.length) {
    [...dotsBlock].forEach(e => document.body.removeChild(e));
  }
  getDataFromYoutube();
}
btnAdd.addEventListener('click', addContainer);


export default function attHidden() {
  const blockList = document.getElementsByClassName('data-container');
  [...blockList].forEach((elem, index) => {
    elem.classList.remove('active');
    const { position, count } = slider;
    if (position * count <= index && index < position * count + count) {
      elem.classList.add('active');
    }
  });
}


const widthHandler = () => {
  if (window.innerWidth < 480) {
    slider.count = 1;
  }
  if (window.innerWidth > 480 && window.innerWidth <= 800) {
    slider.count = 2;
  }
  if (window.innerWidth > 800) {
    slider.count = 4;
  }
};
widthHandler();
window.addEventListener('resize', widthHandler);

function switchMouse() {
  const carousel = document.querySelector('main');
  let isDown = false;
  let startX;
  let scrollLeft;
  let walk;
  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active-carousel');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });
  carousel.addEventListener('mouseleave', () => {          
    isDown = false;
    carousel.classList.remove('active-carousel');
  });
  carousel.addEventListener('mouseup', () => {
    if (walk < 0) {
      slider.position += 1;
    } else if (slider.position > 0) {
      slider.position -= 1;
    }
    const dotNum = document.getElementsByClassName('navigation');
    [...dotNum].forEach((elem, index) => {
      elem.classList.remove('active-dot');
      if (index === slider.position) {
        elem.classList.add('active-dot');
      }
    });
    attHidden();
    //isDown = false;
    //carousel.classList.remove('active-carousel');
  });
  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    walk = x - startX;
    carousel.scrollLeft = scrollLeft - e.pageX + carousel.offsetLeft - startX;
  });
}
switchMouse();
