export const createElement = ({ tagName, classNames = [], value = '' }) => {
  const element = document.createElement(tagName);
  element.classList.add(...classNames);
  if (value) element.innerHTML = value;
  return element;
};
