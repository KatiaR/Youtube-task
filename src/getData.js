import CreateMarkup from './createInitialMarkup';
import ManageNavigationDots from './manageNavigationDots';
import { getPageToken } from './utils';

const url = token => 'https://www.googleapis.com/youtube/v3/search'
+ `?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&pageToken=${
  token
}&type=video&part=snippet&maxResults=15&q=`;

const urlView = ids => 'https://www.googleapis.com/youtube/v3/videos'
+ `?part=statistics&id=${ids.join(',')
}&key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg`;

export default function getDataFromYoutube() {
  const inputSearch = document.getElementById('search');
  if (inputSearch.value.length < 2) { return; }

  fetch(`${url(getPageToken())}${inputSearch.value}`)
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
      ManageNavigationDots.calculateDots();
    });
}
