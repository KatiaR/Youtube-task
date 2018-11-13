export const addAttr = (element, attributes) => Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
