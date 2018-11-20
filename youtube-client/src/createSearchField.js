/*import { addAttr } from './utils';

export default function createSearchField() {
  const fragment = document.createDocumentFragment();

  const section = document.createElement('section');
  section.className = 'search-section';
  fragment.appendChild(section);

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
  document.body.appendChild(fragment);
}
*/
