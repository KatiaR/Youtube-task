import { slider, numberLastPage } from './utils';
import attHidden from './attHidden';
import loadData from './loadPage';
import CreateNavigationDots from './createNavigationDots';

export default class SwitchPages {
  static switch() {
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
      startX = (e.pageX || e.changedTouches[0].clientX) - carousel.offsetLeft;
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
    // carousel.addEventListener('touchcancel', mouseleaveAndTouchcancel);
    function mouseupAndTouchend() {
      const displacementFaultMinus = -50;
      const displacementFaultPlus = 50;
      if (walk < displacementFaultMinus && slider.position < numberLastPage(slider)) {
        slider.position += 1;
      } else if (walk > displacementFaultPlus && slider.position > 0) {
        slider.position -= 1;
      }
      CreateNavigationDots.setActiveDot();
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
      const x = (e.pageX || e.changedTouches[0].clientX) - carousel.offsetLeft;
      walk = x - startX;
      carousel.scrollLeft = scrollLeft1 - (e.pageX || e.changedTouches[0].clientX)
       + carousel.offsetLeft - startX;
    }
    carousel.addEventListener('mousemove', mousemoveAndTouchmove);
    carousel.addEventListener('touchmove', mousemoveAndTouchmove);
  }
}
