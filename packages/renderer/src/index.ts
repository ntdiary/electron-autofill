import {AutofillSelect} from "./container";
import {autoSave} from "./group";
import {setupStore} from "./form";

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
  interface WindowEventMap {
    autofill: CustomEvent
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

  private readonly _node: HTMLElement;

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
      setupStore(config.dbName, config.storeName);
    }
    window.addEventListener('autofill', (e: CustomEvent<string>) => {
      const detail = e.detail;
      if (detail === 'save') {
        autoSave();
      }
    });
    this._ready = true;
  }

  save() {
    const e = new CustomEvent('autofill', {
      detail: 'save'
    });
    window.dispatchEvent(e);
  }
}

export default new ElectronAutofill();
