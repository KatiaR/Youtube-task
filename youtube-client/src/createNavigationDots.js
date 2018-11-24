import { numberLastPage, slider } from './utils';
import attHidden from './attHidden';
import loadData from './loadPage';

export default class CreateNavigationDots {
  static createInitialDots() {
    const fragment = document.createDocumentFragment();

    const dots = document.createElement('div');
    dots.className = 'block-navigation';
    fragment.appendChild(dots);
    document.body.appendChild(fragment);

    function controlButtons(e) {
      if (!(e && e.target && e.target.dataset && e.target.dataset.id)) {
        return;
      }

      slider.position = +e.target.dataset.id;
      CreateNavigationDots.setActiveDot();
      attHidden();
      if (slider.position === numberLastPage(slider) && !slider.loading) {
        slider.loading = true;
        loadData();
      }
    }
    dots.addEventListener('click', controlButtons);
  }

  static calculateDots() {
    const pages = document.getElementsByClassName('data-container');
    slider.amountContainer = pages.length;
    if (!slider.amountContainer) {
      return;
    }
    const pagesDots = numberLastPage(slider) + 1;
    const dotsBlock = document.getElementsByClassName('block-navigation')[0];
    if (dotsBlock.children.length) {
      [...dotsBlock.children].forEach(elem => dotsBlock.removeChild(elem));
    }
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
      dotsBlock.appendChild(dot);
    }
    attHidden();
    slider.loading = false;
    CreateNavigationDots.hideExtraDots();
  }

  static hideExtraDots() {
    const dotNum = document.getElementsByClassName('dot-navigation');
    if (dotNum.length < 9) {
      return;
    }
    [...dotNum].forEach((elem, index, arr) => {
      if (elem.classList.contains('hide-dot')) {
        elem.classList.remove('hide-dot');
      }
      if (index < slider.position - 2 || index > slider.position + 2) {
        elem.classList.add('hide-dot');
      }
      if (index === 0 || index === arr.length - 1) {
        elem.classList.remove('hide-dot');
      }
    });
    const ellipsisNAV = document.getElementsByClassName('ellipsis-navigation');
    if (ellipsisNAV.length) {
      [...ellipsisNAV].forEach(e => e.parentNode.removeChild(e));
    }
    const hidedDots = document.getElementsByClassName('hide-dot');
    if (hidedDots.length) {
      const dot1 = document.createElement('div');
      dot1.className = 'ellipsis-navigation';
      const dotNum1 = document.createElement('span');
      dotNum1.className = 'ellipsis';
      dotNum1.textContent = '...';
      dot1.appendChild(dotNum1);
      hidedDots[0].parentNode.insertBefore(dot1, hidedDots[0]);
      if (slider.position > 3 && slider.position < dotNum.length - 4) {
        const dot2 = dot1.cloneNode(true);
        hidedDots[0].parentNode.insertBefore(dot2, hidedDots[hidedDots.length - 1]);
      }
    }
  }

  static setActiveDot() {
    const dotNum = document.getElementsByClassName('navigation');
    [...dotNum].forEach((elem, index) => {
      if (elem.classList.contains('active-dot')) {
        elem.classList.remove('active-dot');
      }
      if (index === slider.position) {
        elem.classList.add('active-dot');
      }
    });
    CreateNavigationDots.hideExtraDots();
  }
}
