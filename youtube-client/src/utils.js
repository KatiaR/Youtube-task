export function addAttr(element, attributes) {
  return Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
}

export default {
  addAttr,
};
