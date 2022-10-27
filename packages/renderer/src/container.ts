import {buildContent} from "./group";
import {isInputElement} from "./utils";

let container: HTMLElement;

/**
 * hide popup
 */
function detach() {
    if (document.body.contains(container)) {
        document.body.removeChild(container);
    }
}

/**
 * show popup
 */
function attach() {
    if (!document.body.contains(container)) {
        document.body.appendChild(container);
    }
}

/**
 * create the popup container.
 */
function initContainer() {
    container = document.createElement('div');
    container.className = 'autofill-pop--container';

    // avoid triggering the focusout event 
    container.addEventListener('mousedown', (e) => {
        e.preventDefault();
    });

    // autofill
    container.addEventListener('click', () => {
        detach();
    });
}

/**
 * calculate the position
 * @param target
 * @param container
 */
function calcPosition(target: HTMLInputElement, container: HTMLElement): void {
    const rect = target.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    container.style.top = `${rect.top - 10}px`;
    if ((bodyRect.width - rect.right) < 200) {
        container.style.right = `${bodyRect.width - rect.left + 20}px`;
        container.style.left = 'auto';
    } else {
        container.style.left = `${rect.right + 20}px`;
        container.style.right = 'auto';
    }
}

const showPopup = async (e: MouseEvent) => {
    const target = e.target;
    if (!isInputElement(target)) {
        return;
    }
    if (!target.autocomplete || target.autocomplete === 'off') {
        return;
    }
    if (!container) {
        initContainer();
    }
    
    // parse form type and build content.
    const content = await buildContent(e, '');
    if (content === undefined) {
        return;
    }
    container.replaceChildren(content);
    
    calcPosition(target, container);

    attach();
    
    target.addEventListener('focusout', detach, {once: true, capture: true})
}

/**
 * filter
 */
const handleInput = () => {
    
}

export {
    showPopup,
    handleInput,
}
