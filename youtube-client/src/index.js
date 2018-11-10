import './scss/main.scss';


const section = document.createElement('section');
section.className = 'main';
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

const addAttr = (element, attributes) => Object.entries(attributes).forEach(
  ([key, value]) => element.setAttribute(key, value),
);

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

const sectionVideo = document.createElement('section');
section.className = 'video';
section.appendChild(sectionVideo);


const url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&type=video&part=snippet&maxResults=15&q=';

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => {
  const inputSearch = document.getElementById('search');
  if (inputSearch.value.length > 2) {
    fetch(`${url}${inputSearch.value}`)
      .then(response => response.json())
      .then((data) => {
        console.warn(data);
        const div2 = document.createElement('div');
        const main = document.getElementById('main');
        /* div.innerText = JSON.stringify(data) */

        const array = data.items;
        console.warn(array);
        array.forEach((elem) => {
          const div = document.createElement('div');
          const { snippet } = elem;
          console.warn(snippet);
          console.warn(snippet.channelTitle);
          console.warn(snippet.description);
          console.warn(snippet.publishedAt);
          console.warn(snippet.title);
          div.innerText = snippet.channelTitle;
          const img = elem.snippet.thumbnails.default.url;
          console.warn(img);
          div2.appendChild(div);
        });
        sectionVideo.appendChild(div2);
      });
  }
});
