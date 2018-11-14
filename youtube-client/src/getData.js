import { addAttr } from './utils';

const url = token => `https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg&pageToken=${token}&type=video&part=snippet&maxResults=15&q=`;
const urlView = ids => `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${ids.join(',')}&key=AIzaSyC-hssxGiAeTHERVfsB2sEU5bowi0Lawhg`;

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
        console.warn(data);
        const array = data.items;
        pageToken = data.nextPageToken;
        const listIds = array.map(item => item.id.videoId);
        console.warn(array);
        const main = document.getElementsByTagName('main')[0];
        array.forEach((elem) => {
          const { snippet } = elem;
          const dataContainer = document.createElement('section');
          dataContainer.id = elem.id.videoId;
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

          const date = new Date(snippet.publishedAt);
          const twoNumberDate = number => (number < 10 ? `0${number}` : number);
          divPublicationDate.innerText = `${date.getFullYear()}-${twoNumberDate(date.getMonth() + 1)}-${twoNumberDate(date.getDate())}`;

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
        return listIds;
      })
      .then((listIds) => {
        console.log('listIds');
        console.log(listIds);
        console.log('urlView(listIds)');
        console.log(urlView(listIds));
        return fetch(urlView(listIds));
      })
      .then(response => response.json())
      /*.then(({ items }) => {
        items.forEach((item) => {
          console.log('ddsgadga', item);
          const { statistics: { viewCount } } = item;
          console.log(viewCount);
          return viewCount;
        });*/
      .then((dataViews) => {
        console.warn(dataViews);
          const arrayViews = dataViews.items;
          const listViews = arrayViews.map(item => item.statistics.viewCount);
          console.warn(listViews);
          return listViews;
      })
      .then((listViews) => {
        const dataContainer = document.querySelectorAll('.data-container');
        listViews.forEach((elem) => {
          const divView = document.createElement('div');
          setTimeout(() => {
          divView.className = 'view';
          dataContainer.appendChild(divView);
          divView.innerText = elem; 
          }, 0);
          
        });
      });
     /* const divView = document.querySelectorAll('view');
        console.log('qwe123', divView);
        divView.innerText = viewCount;
        console.log('qwe123', divView);*/
  }
}
