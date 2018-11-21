import { slider } from './getData';
import { numberLastPage } from './utils';
import attHidden, { loadData } from './index';

export default class CreateNavigationDots {
  static createInitialDots() {
    const fragment = document.createDocumentFragment();

    const dots = document.createElement('div');
    dots.className = 'block-navigation';
    fragment.appendChild(dots);
    document.body.appendChild(fragment);

    function controlButtons(e) {
      console.log(e.target);
      if (!(e && e.target && e.target.dataset && e.target.dataset.id)) {
        return;
      }

      slider.position = +e.target.dataset.id;
      const dotNum = document.getElementsByClassName('navigation');
      [...dotNum].forEach(elem => elem.classList.remove('active-dot'));
      e.target.classList.add('active-dot');
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
      attHidden();
      slider.loading = false;
    }
  }
}
