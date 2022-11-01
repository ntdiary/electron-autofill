import {AutofillSelect} from "./container";
import localforage from "localforage";

type BaseOption = {
  driver: string;
  fontFamily?: string;
  heuristic?: boolean;
  zIndex?: string;
}

interface DatabaseOption extends BaseOption {
  driver: 'indexedDB';
  dbName: string;
  storeName: string;
}

interface keychainOption extends BaseOption {
  driver: 'keychain';
}

type Option = DatabaseOption | keychainOption;

declare global {
  interface HTMLElementTagNameMap {
    'autofill-select': AutofillSelect,
  }
}

customElements.define('autofill-select', AutofillSelect);

const DefaultConfig: Option = {
  driver: 'indexedDB',
  dbName: 'demo',
  storeName: 'demo',
  zIndex: '9999',
}

function isDatabase(option: Option): option is DatabaseOption {
  return option !== undefined && option.driver === 'indexedDB';
}

class ElectronAutofill {
  private _config: Option | undefined;

  private _node: HTMLElement;

  private _ready: boolean;

  constructor() {
    this._ready = false;
    this._node = document.createElement('autofill-select');
  }

  setup(option?: Option) {
    if (this._ready) {
      throw new Error('has been called');
    }
    const config = Object.assign({}, DefaultConfig, option || {});
    this._config = config;
    this._node.style.setProperty('--autofill-font-family', config.fontFamily || null);
    this._node.style.setProperty('--autofill-index', config.zIndex || null);
    document.body.appendChild(this._node);
    if (isDatabase(config)) {
      localforage.config({
        name: config.dbName,
        storeName: config.storeName,
      });
    }
    this._ready = true;
  }
}


export default new ElectronAutofill();
