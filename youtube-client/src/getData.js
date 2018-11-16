import { addAttr } from './utils';


const url = token => 'https://www.googleapis.com/youtube/v3/search'
+ `?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&pageToken=${
  token
}&type=video&part=snippet&maxResults=15&q=`;

const urlView = ids => 'https://www.googleapis.com/youtube/v3/videos'
+ `?part=statistics&id=${ids.join(',')
}&key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg`;

let pageToken = '';

export const resetPageToken = () => {
  pageToken = '';
};

export default function getDataFromYoutube() {
  const inputSearch = document.getElementById('search');
  if (inputSearch.value.length > 1) {
    fetch(`${url(pageToken)}${inputSearch.value}`)
      .then(response => response.json())
      .then((data) => {
        const array = data.items;
        console.log(data);
        pageToken = data.nextPageToken;

        const listIds = array.map(item => item.id.videoId);
        const main = document.getElementsByTagName('main')[0];
        array.forEach((elem) => {
          const { snippet } = elem;
          const dataContainer = document.createElement('div');
          dataContainer.id = elem.id.videoId;
          dataContainer.className = 'data-container';
          main.appendChild(dataContainer);

          const fragment = document.createDocumentFragment();

          const divClip = document.createElement('div');
          divClip.className = 'clip';
          fragment.appendChild(divClip);

          const divAuthor = document.createElement('span');
          divAuthor.className = 'author';
          fragment.appendChild(divAuthor);

          const divTitle = document.createElement('h2');
          fragment.appendChild(divTitle);

          const divPublicationDate = document.createElement('span');
          divPublicationDate.className = 'publication-date';
          fragment.appendChild(divPublicationDate);

          const divDescription = document.createElement('p');
          divDescription.className = 'description';
          fragment.appendChild(divDescription);

          divTitle.innerText = snippet.title;
          divAuthor.innerText = `\uD83D\uDC68 ${snippet.channelTitle}`;
          divDescription.innerText = snippet.description;

          const date = new Date(snippet.publishedAt);
          const twoNumberDate = number => (number < 10 ? `0${number}` : number);
          divPublicationDate.innerText = `\uD83D\uDCC5 ${date.getFullYear()}-${twoNumberDate(
            date.getMonth() + 1,
          )}-${twoNumberDate(date.getDate())}`;

          const img = document.createElement('img');
          const imgUrl = elem.snippet.thumbnails.high.url;
          const attrimg = {
            alt: 'youtube-video',
            src: imgUrl,
          };
          addAttr(img, attrimg);
          divClip.appendChild(img);
          fragment.appendChild(divTitle);
          dataContainer.appendChild(fragment);
        });
        return fetch(urlView(listIds));
      })
      .then(response => response.json())
      .then(({ items }) => {
        const listViews = items.map(({ id, statistics: { viewCount } }) => ({ viewCount, id }));
        return listViews;
      })
      .then((listViews) => {
        listViews.forEach((elem) => {
          const dataContainer = document.getElementById(elem.id);
          const divView = document.createElement('div');
          divView.className = 'view';
          divView.innerText = `\uD83D\uDC40 ${elem.viewCount}`;
          dataContainer.appendChild(divView);
        });
      });
  }
}
