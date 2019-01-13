import { numberLastPage, slider } from './utils';
import attHidden from './attHidden';
import loadData from './loadPage';
import HideNavigationDots from './hideNavigationDots';

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
    HideNavigationDots.hideExtraDots();
  }
}
