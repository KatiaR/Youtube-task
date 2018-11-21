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
}
