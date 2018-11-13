import './scss/main.scss';

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

const addAttr = (element, attributes) =>
  Object.entries(attributes).forEach(([key, value]) =>
    element.setAttribute(key, value)
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

const main = document.createElement('main');
main.className = 'video-field';
document.body.appendChild(main);

const url =
  'https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&type=video&part=snippet&maxResults=15&q=';

const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', () => {
  const inputSearch = document.getElementById('search');
  if (inputSearch.value.length > 2) {
    fetch(`${url}${inputSearch.value}`)
      .then(response => response.json())
      .then(data => {
        console.warn(data);
        

        const array = data.items;
        console.warn(array);
        array.forEach(elem => {
          
          const { snippet } = elem;
          const dataContainer = document.createElement('section');
          dataContainer.className = 'data-container';
          main.appendChild(dataContainer);

          const divClip = document.createElement('div');
          divClip.className = 'clip';
          dataContainer.appendChild(divClip);

          const divAuthor = document.createElement('div');
          divAuthor.className = 'author';
          dataContainer.appendChild(divAuthor);

          const divTitle = document.createElement('div');
          divTitle.className = 'title';
          dataContainer.appendChild(divTitle);

          const divPublicationDate = document.createElement('div');
          divPublicationDate.className = 'publication-date';
          dataContainer.appendChild(divPublicationDate);

          const divView = document.createElement('div');
          divView.className = 'view';
          dataContainer.appendChild(divView);

          const divDescription = document.createElement('div');
          divDescription.className = 'description';
          dataContainer.appendChild(divDescription);

          divTitle.innerText = snippet.title;
          divAuthor.innerText = snippet.channelTitle;
          divDescription.innerText = snippet.description;
          divPublicationDate.innerText = snippet.publishedAt;
          const img = document.createElement('img');
          const imgUrl = elem.snippet.thumbnails.high.url;
          const attrimg = {
            alt: 'youtube-video',
            src: imgUrl,
          };
          addAttr(img, attrimg);
          divClip.appendChild(img);

          dataContainer.appendChild(divTitle);
        });
      });
  }
});
