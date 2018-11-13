import './scss/main.scss';
import getDataFromYoutube, { resetPageToken } from './getData';
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
  if (mainBlock.length) {
    document.body.removeChild(mainBlock[0]);
  }
  const main = document.createElement('main');
  main.className = 'video-field';
  document.body.appendChild(main);
  getDataFromYoutube();
});

btnAdd.addEventListener('click', () => {
  getDataFromYoutube();
});
