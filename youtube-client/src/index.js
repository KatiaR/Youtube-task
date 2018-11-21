import './scss/main.scss';
import getDataFromYoutube, { resetPageToken, slider } from './getData';
import { addAttr, numberLastPage } from './utils';
import CreateSearchField from './createSearchField';
import CreateNavigationDots from './createNavigationDots';

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
  console.log(document.getElementsByClassName('block-navigation')[0]);
  const sliderContainer = document.createElement('div');
  sliderContainer.className = 'wrapper-slider';
  mainBlock.appendChild(sliderContainer);
  getDataFromYoutube();
}
const searchButton = document.getElementById('searchBtn');
searchButton.addEventListener('click', showAnswer);

export function loadData() {
  const dotsBlock = document.getElementsByClassName('block-navigation')[0];
  if (dotsBlock.children.length) {
    [...dotsBlock.children].forEach(elem => dotsBlock.removeChild(elem));
  }
  getDataFromYoutube();
}

export default function attHidden() {
  const blockList = document.getElementsByClassName('data-container');
  [...blockList].forEach((elem, index) => {
    if (elem.classList.contains('active')) {
      elem.classList.remove('active');
    }
    const { position, blocksPerPage } = slider;
    if (position * blocksPerPage <= index && index < position * blocksPerPage + blocksPerPage) {
      elem.classList.add('active');
    }
  });
}

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

function switchMouse() {
  const carousel = document.querySelector('main');
  let isDown = false;
  let startX;
  let scrollLeft1;
  let walk;
  let wrapper;
  function mousedownAndTouchstart(e) {
    [wrapper] = document.getElementsByClassName('wrapper-slider');
    isDown = true;
    carousel.classList.add('active-carousel');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft1 = carousel.scrollLeft;
  }
  carousel.addEventListener('mousedown', mousedownAndTouchstart);
  carousel.addEventListener('touchstart', mousedownAndTouchstart);
  function mouseleaveAndTouchcancel() {
    wrapper.style.left = 0;
    walk = 0;
    isDown = false;
    carousel.classList.remove('active-carousel');
  }
  carousel.addEventListener('mouseleave', mouseleaveAndTouchcancel);
  carousel.addEventListener('touchcancel', mouseleaveAndTouchcancel);
  function mouseupAndTouchend() {
    const displacementFaultMinus = -50;
    const displacementFaultPlus = 50;
    if (walk < displacementFaultMinus && slider.position < numberLastPage(slider)) {
      slider.position += 1;
    } else if (walk > displacementFaultPlus && slider.position > 0) {
      slider.position -= 1;
    }
    const dotNum = document.getElementsByClassName('navigation');
    [...dotNum].forEach((elem, index) => {
      if (elem.classList.contains('active-dot')) {
        elem.classList.remove('active-dot');
      }
      if (index === slider.position) {
        elem.classList.add('active-dot');
      }
    });
    attHidden();
    if (slider.position === numberLastPage(slider) && !slider.loading) {
      slider.loading = true;
      loadData();
    }
    wrapper.style.left = 0;
    walk = 0;
    isDown = false;
  }
  carousel.addEventListener('mouseup', mouseupAndTouchend);
  carousel.addEventListener('touchend', mouseupAndTouchend);
  function mousemoveAndTouchmove(e) {
    if (!isDown) return;
    if (wrapper) {
      wrapper.style.left = `${walk}px`;
    }
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    walk = x - startX;
    carousel.scrollLeft = scrollLeft1 - e.pageX + carousel.offsetLeft - startX;
  }
  carousel.addEventListener('mousemove', mousemoveAndTouchmove);
  carousel.addEventListener('touchmove', mousemoveAndTouchmove);
}
switchMouse();
