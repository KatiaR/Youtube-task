// import { addAttr } from './utils';

// export default class CreateMarkup {
//   static createInitialMarkup(array) {
//     const sliderHtml = document.getElementsByClassName('wrapper-slider')[0];
//     array.forEach((elem) => {
//       const { snippet } = elem;
//       const dataContainer = document.createElement('div');
//       dataContainer.id = elem.id.videoId;
//       dataContainer.className = 'data-container';
//       sliderHtml.appendChild(dataContainer);

//       const fragment = document.createDocumentFragment();

//       const divClip = document.createElement('div');
//       divClip.className = 'clip';
//       fragment.appendChild(divClip);

//       const divAuthor = document.createElement('span');
//       divAuthor.className = 'author';
//       fragment.appendChild(divAuthor);

//       const divTitle = document.createElement('h2');
//       fragment.appendChild(divTitle);

//       const divPublicationDate = document.createElement('span');
//       divPublicationDate.className = 'publication-date';
//       fragment.appendChild(divPublicationDate);

//       const divDescription = document.createElement('p');
//       divDescription.className = 'description';
//       fragment.appendChild(divDescription);

//       divTitle.textContent = snippet.title;
//       divAuthor.textContent = `\uD83D\uDC68 ${snippet.channelTitle}`;
//       divDescription.textContent = snippet.description;

//       const date = new Date(snippet.publishedAt);
//       const twoNumberDate = number => (number < 10 ? `0${number}` : number);
//       divPublicationDate.textContent = `\uD83D\uDCC5 ${date.getFullYear()}-${twoNumberDate(
//         date.getMonth() + 1,
//       )}-${twoNumberDate(date.getDate())}`;

//       const img = document.createElement('img');
//       const imgUrl = elem.snippet.thumbnails.high.url;
//       const attrimg = {
//         alt: 'youtube-video',
//         src: imgUrl,
//       };
//       addAttr(img, attrimg);
//       divClip.appendChild(img);
//       fragment.appendChild(divTitle);
//       dataContainer.appendChild(fragment);
//     });
//   }
// }
