import { numberLastPage } from './utils';
import attHidden from './index';
import CreateMarkup  from './createInitialMarkup';


export const slider = {
  position: 0, blocksPerPage: 1, amountContainer: 0, loading: false,
};

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

export const setPageToken = (token) => {
  pageToken = token;
};

export default function getDataFromYoutube() {
  const inputSearch = document.getElementById('search');
  if (inputSearch.value.length < 2) { return; }

  fetch(`${url(pageToken)}${inputSearch.value}`)
    .then(response => response.json())
    .then((data) => {
      const listIds = CreateMarkup.createInitialMarkup(data);
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
        const description = dataContainer.getElementsByClassName('description')[0];
        const divView = document.createElement('div');
        divView.className = 'view';
        divView.textContent = `\uD83D\uDC40 ${elem.viewCount}`;
        dataContainer.insertBefore(divView, description);
      });
    })
    .then(() => {
      const pages = document.getElementsByClassName('data-container');
      slider.amountContainer = pages.length;
      const pagesDots = numberLastPage(slider) + 1;
      const dots = document.getElementsByClassName('block-navigation')[0];
      for (let i = 0; i < pagesDots; i += 1) {
        const dot = document.createElement('div');
        dot.className = 'dot-navigation';
        const dotNum = document.createElement('span');
        dotNum.className = 'navigation';
        dotNum.setAttribute('data-id', i);
        dotNum.textContent = `${i + 1}`;
        if (i === slider.position) {
          dotNum.classList.add('active-dot');
        }
        dot.appendChild(dotNum);
        dots.appendChild(dot);
        attHidden();
        slider.loading = false;
      }
    });
}
