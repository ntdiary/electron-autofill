import {isFormElement, isInputElement} from "./utils";
import {CardForm, PasswordForm} from "./form";

let content: HTMLDivElement;
let line: HTMLDivElement;
let manager: HTMLDivElement;

type formType = PasswordForm | CardForm | null;

/**
 * parse the form type
 * 
 * @param target
 * @param elements
 */
function buildForm(target: HTMLInputElement, elements: HTMLFormControlsCollection): formType {
    const name = target.name;
    if (PasswordForm.keys.findIndex(el => el === name) >= 0) {
        return new PasswordForm(elements);
    } else if (CardForm.keys.findIndex(el => el === name) >= 0) {
        return new CardForm(elements);
    }
    return null;
}

async function buildContent(e: Event, value: string | null): Promise<HTMLElement | undefined> {
    const target = e.target;
    if (!isInputElement(target)) {
        return;
    }
    const path: EventTarget[] = e.composedPath();
    const formElement = path.find(el => isFormElement(el));
    if (!isFormElement(formElement)) {
        return;
    }
    const form = buildForm(target, formElement.elements);
    if (form === null) {
        return;
    }
    await form.fetchData();
    const ul = form.buildNodes();
    if (ul === null) {
        return;
    }
    if (!content) {
        content = document.createElement('div');
    }
    if (!line) {
        line = document.createElement('div');
        line.className = 'line';
    }
    if (!manager) {
        manager = document.createElement('p');
    }
    manager.innerText = form.text;
    content.replaceChildren(ul, line, manager);
    return content;
}

export {
    buildContent
}
