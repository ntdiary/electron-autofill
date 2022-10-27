import {
    Card,
    CardType,
    FillElement,
    ICard,
    IPassword,
    Item,
    Password,
    PasswordType
} from "../types";
import {isInputElement} from "../utils";
import localforage from "localforage";

class Form<T extends Item> {
    inputs: HTMLFormControlsCollection;
    data: T[];
    text: string;

    constructor(collection: HTMLFormControlsCollection) {
        this.inputs = collection;
        this.data = [];
        this.text = '';
    }

    async fetchData() {
        this.data = [];
    }

    buildNodes(): HTMLUListElement | null {
        if (this.data.length < 1) {
            return null;
        }
        const ul = document.createElement('ul');
        for (const item of this.data) {
            const li = document.createElement('li');
            li.innerHTML = `<div class="icon" /><div><div>${item.getName()}</div><div>${item.getDescription()}</div></div>`;
            li.addEventListener('click', () => this.autofill(item, false));
            li.addEventListener('mouseenter', () => this.autofill(item, true));
            ul.append(li);
        }
        return ul;
    }

    autofill(item: T, preview: boolean) {
    };

    updateValue(input: FillElement, value: string, preview: boolean) {
        if (!isInputElement(input)) {
            return;
        }
        if (preview) {
            input.value = value;
            return;
        }
        input.value = '';
        const field = 'value';
        const reactDescriptor = Object.getOwnPropertyDescriptor(input, field);
        if (!reactDescriptor) {
            return;
        }
        const descriptor = Object.getOwnPropertyDescriptor(input.constructor.prototype, field);
        if (descriptor === undefined) {
            return;
        }
        const reactSet = reactDescriptor.set;
        const {set} = descriptor;
        Object.defineProperty<HTMLInputElement>(input, field, {
            configurable: true,
            set: function (v) {
                // @ts-ignore
                set.call(this, v);
            }
        });
        input.value = value;
        Object.defineProperty<HTMLInputElement>(input, field, {
            configurable: true,
            set: reactSet
        });
        const event = new InputEvent('input', {
            bubbles: true,
        });
        input.dispatchEvent(event);
    }
}

class PasswordForm extends Form<Password> {
    static keys: Array<PasswordType> = ['username', 'password'];

    constructor(collection: HTMLFormControlsCollection) {
        super(collection);
        this.text = 'Manage Passwords...';
    }

    async fetchData() {
        const arr = await localforage.getItem<IPassword[]>("password");
        if (arr === null) {
            return;
        }
        this.data = arr.map(el => new Password(el));
    }

    autofill(item: Password, preview: boolean) {
        PasswordForm.keys.forEach((k) => {
            this.updateValue(this.inputs.namedItem(k), item[k], preview)
        })
    };
}

class CardForm extends Form<Card> {
    static keys: CardType[] = ['nameOnCard', 'cardNumber', 'expirationDate', 'securityCode'];

    constructor(collection: HTMLFormControlsCollection) {
        super(collection);
        this.text = 'Manage Cards...';
    }

    async fetchData() {
        const arr = await localforage.getItem<ICard[]>("card");
        if (arr === null) {
            return;
        }
        this.data = arr.map(el => new Card(el));
    }

    autofill(item: Card, preview: boolean) {
        CardForm.keys.forEach((k) => {
            this.updateValue(this.inputs.namedItem(k), item[k], preview)
        })
    };
}

export {
    PasswordForm,
    CardForm
}
