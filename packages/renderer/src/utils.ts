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



export {
    isInputElement,
    isFormElement
}
