import { addAttr } from './utils';

export default class CreateSearchField {
  static createInitialSearch() {
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

    document.body.appendChild(fragment);
  }
}
