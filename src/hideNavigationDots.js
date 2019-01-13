import { slider } from './utils';

export default class HideNavigationDots {
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
}
