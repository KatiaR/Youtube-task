import { numberLastPage, slider } from './utils';
import attHidden from './attHidden';
import HideNavigationDots from './hideNavigationDots';

export default class ManageNavigationDots {
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
    HideNavigationDots.hideExtraDots();
  }
}
