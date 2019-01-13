import getDataFromYoutube from './getData';

export default function loadData() {
  const dotsBlock = document.getElementsByClassName('block-navigation')[0];
  if (dotsBlock.children.length) {
    [...dotsBlock.children].forEach(elem => dotsBlock.removeChild(elem));
  }
  getDataFromYoutube();
}
