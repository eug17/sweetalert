import {
  titleMarkup,
  textMarkup,
} from '../markup';

import { injectElIntoModal } from './modal';
import { stringToNode, isTextHTML } from '../utils';
/*
 * Fixes a weird bug that doesn't wrap long text in modal
 * This is visible in the Safari browser for example.
 * https://stackoverflow.com/a/3485654/2679245
 */
const webkitRerender = (el: HTMLElement) => {
  if (navigator.userAgent.includes('AppleWebKit')) {
    el.style.display = 'none';
    el.offsetHeight;
    el.style.display = '';
  }
}

export const initTitle = (title: string): void => {
  if (title) {
    const titleEl: HTMLElement = injectElIntoModal(titleMarkup);
    titleEl.textContent = title;

    webkitRerender(titleEl);
  }
};

export const initText = (text: string | HTMLElement): void => {
  if (text) {
    const textEl: HTMLElement = injectElIntoModal(textMarkup);
    if (text instanceof HTMLElement) {
      textEl.appendChild(text);
    } else if (isTextHTML(text)) {
      const _el: HTMLElement = stringToNode(text);
      textEl.appendChild(_el);
    } else {
      let textNode = document.createDocumentFragment();
      text.split('\n').forEach((textFragment, index, array) => {
        textNode.appendChild(document.createTextNode(textFragment));

        // unless we are on the last element, append a <br>
        if (index < array.length - 1) {
          textNode.appendChild(document.createElement('br'));
        }
      });
      textEl.appendChild(textNode);
    }
    webkitRerender(textEl);
  }
};

