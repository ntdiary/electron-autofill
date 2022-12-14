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
import {html, TemplateResult} from "lit";

// TODO:test
declare global {
  interface Window {
    localforage: LocalForage
  }
}
let store: LocalForage;

function setupStore(name: string, storeName: string) {
  store = localforage.createInstance({name, storeName})
  window.localforage = store;
}

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

  async saveData() {
  }

  buildNodes(): TemplateResult | undefined {
    if (this.data.length < 1) {
      return;
    }
    const items = [];
    for (const item of this.data) {
      items.push(
        html`
          <li @click="${() => this.autofill(item, false)}"
            @mouseenter="${() => this.autofill(item, true)}">
            <div class="icon"/>
            <div>
              <div>${item.getName()}</div>
              <div>${item.getDescription()}</div>
            </div>
          </li>
        `)
    }
    return html`
      <ul>
        ${items}
      </ul>
    `;
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
    if (set === undefined) {
      return;
    }
    Object.defineProperty<HTMLInputElement>(input, field, {
      configurable: true,
      set: function (v) {
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
    const arr = await store.getItem<IPassword[]>("password");
    if (arr === null) {
      return;
    }
    this.data = arr.map(el => new Password(el));
  }

  async saveData() {
    let arr = await store.getItem<IPassword[]>("password");
    if (!arr) {
      arr = [];
    }
    const obj: IPassword = {username: '', password: ''};
    for (const key of PasswordForm.keys) {
      const item = this.inputs.namedItem(key);
      if (!isInputElement(item)) {
        return;
      }
      obj[key] = item.value;
    }
    const item = arr.find(item => item.username === obj.username);
    if (item) {
      if (item.password === obj.password) {
        return;
      }
      item.password = obj.password;
    } else {
      arr.push(obj);
    }
    new Notification('test', {body: 'password has been saved'});
    await store.setItem<IPassword[]>('password', arr);
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
    const arr = await store.getItem<ICard[]>("card");
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
  CardForm,
  Form,
  setupStore
}
