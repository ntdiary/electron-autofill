import {FillElement} from "./types";

function isInputElement(target: FillElement): target is HTMLInputElement {
  return target !== null
    && target !== undefined
    && (target as Element).nodeName === 'INPUT';
}

function isFormElement(target: EventTarget | undefined): target is HTMLFormElement {
  return target !== null
    && target !== undefined
    && (target as Element).nodeName === 'FORM';
}

function isElement(target: EventTarget | RadioNodeList | null): target is Element {
  return target !== null
    && 'nodeName' in (target as Element);
}

function getNodeName(target: EventTarget): string {
  if (!isElement(target)) {
    return '';
  }
  return target.nodeName.toLowerCase();
}

function getClassName(target: EventTarget): string {
  if (!isElement(target)) {
    return '';
  }
  return target.className;
}

function getValue(elements: HTMLFormControlsCollection, name: string): string {
  const item = elements.namedItem(name);
  if (!isInputElement(item)) {
    return '';
  }
  return item.value;
}

export {
  isInputElement,
  isFormElement,
  isElement,
  getClassName,
  getNodeName,
}
