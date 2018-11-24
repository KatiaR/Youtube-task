import { slider } from './utils';

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
