import './scss/main.scss';
import { slider } from './utils';
import getDataFromYoutube, { resetPageToken } from './getData';
import CreateSearchField from './createSearchField';
import CreateNavigationDots from './createNavigationDots';
import SwitchPages from './switchPages';

CreateSearchField.createInitialSearch();
CreateNavigationDots.createInitialDots();

const main = document.createElement('main');
main.className = 'video-field';
document.body.appendChild(main);

function showAnswer() {
  resetPageToken();
  slider.position = 0;
  slider.amountContainer = 0;
  const mainBlock = document.getElementsByClassName('video-field')[0];
  const dotsBlock = document.getElementsByClassName('block-navigation')[0];
  if (mainBlock.children.length) {
    [...mainBlock.children].forEach(elem => mainBlock.removeChild(elem));
  }
  if (dotsBlock.children.length) {
    [...dotsBlock.children].forEach(elem => dotsBlock.removeChild(elem));
  }
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'wrapper-slider';
  mainBlock.appendChild(sliderContainer);
  getDataFromYoutube();
}
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', showAnswer);


const widthHandler = () => {
  const styles = getComputedStyle(document.body);
  const widthValue = styles.getPropertyValue('--widthBlock');
  const [declaration] = Object.values(document.styleSheets[0].rules).filter(
    ({ selectorText }) => selectorText === 'body main .wrapper-slider .data-container',
  );
  const { style: declarationStyle } = declaration;
  if (window.innerWidth < 480) {
    slider.blocksPerPage = 1;

    if (widthValue !== '60vw') {
      declarationStyle.setProperty('min-width', '60vw');
      declarationStyle.setProperty('max-width', '60vw');
    }

    CreateNavigationDots.calculateDots();
  }
  if (window.innerWidth > 480 && window.innerWidth <= 800) {
    slider.blocksPerPage = 2;
    if (widthValue !== '30vw') {
      declarationStyle.setProperty('min-width', '30vw');
      declarationStyle.setProperty('max-width', '30vw');
    }
    CreateNavigationDots.calculateDots();
  }
  if (window.innerWidth > 800) {
    slider.blocksPerPage = 4;
    if (widthValue !== '15vw') {
      declarationStyle.setProperty('min-width', '15vw');
      declarationStyle.setProperty('max-width', '15vw');
    }
    CreateNavigationDots.calculateDots();
  }
};
widthHandler();
window.addEventListener('resize', widthHandler);
SwitchPages.switch();
