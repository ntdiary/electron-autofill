import { FillElement } from "./types";
declare function isInputElement(target: FillElement): target is HTMLInputElement;
declare function isFormElement(target: EventTarget | undefined): target is HTMLFormElement;
declare function isElement(target: EventTarget | RadioNodeList | null): target is Element;
declare function getNodeName(target: EventTarget): string;
declare function getClassName(target: EventTarget): string;
export { isInputElement, isFormElement, isElement, getClassName, getNodeName, };
