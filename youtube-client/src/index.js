import './scss/main.scss';
import getDataFromYoutube, { resetPageToken, slider } from './getData';
import { addAttr } from './utils';

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
btnAdd.innerText = 'Add more';
form.appendChild(btnAdd);
addAttr(btnAdd, attrAddMore);

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => {
  resetPageToken();
  const mainBlock = document.getElementsByTagName('main');
  const dotsBlock = document.getElementsByClassName('block-navigation');
  if (mainBlock.length && dotsBlock.length) {
    document.body.removeChild(mainBlock[0]);
    document.body.removeChild(dotsBlock[0]);
  }
  const main = document.createElement('main');
  main.className = 'video-field';
  document.body.appendChild(main);

  const slider = document.createElement('div');
  slider.className = 'wrapper-slider';
  main.appendChild(slider);
  getDataFromYoutube();
});

btnAdd.addEventListener('click', () => {
  const dotsBlock = document.getElementsByClassName('block-navigation');
  if (dotsBlock.length) {
    [...dotsBlock].forEach(e => document.body.removeChild(e));
  }
  getDataFromYoutube();
});

export function attHidden() {
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
    console.log(window.innerWidth)
    console.log(slider.count)
  }
  if (window.innerWidth > 480 && window.innerWidth <= 800) {
    slider.count = 2;
    console.log(window.innerWidth)
    console.log(slider.count)
  }
  if (window.innerWidth > 800) {
    slider.count = 4;
    console.log(window.innerWidth)
    console.log(slider.count)
  }
};
widthHandler();
window.addEventListener('resize', widthHandler);
