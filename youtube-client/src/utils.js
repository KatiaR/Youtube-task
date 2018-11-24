export function addAttr(element, attributes) {
  return Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export function numberLastPage(slider) {
  const countPages = slider.amountContainer / slider.blocksPerPage;
  return slider.amountContainer > 0 ? Math.ceil(countPages) - 1 : null;
}

export default {
  addAttr,
  numberLastPage,
};

let pageToken = '';

export const getPageToken = () => pageToken;

export const resetPageToken = () => {
  pageToken = '';
};

export const setPageToken = (token) => {
  pageToken = token;
};

export const slider = {
  position: 0, blocksPerPage: 1, amountContainer: 0, loading: false,
};
