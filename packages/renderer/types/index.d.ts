import { AutofillSelect } from "./container";
declare type BaseOption = {
    driver: string;
    fontFamily?: string;
    heuristic?: boolean;
    zIndex?: string;
};
interface DatabaseOption extends BaseOption {
    driver: 'indexedDB';
    dbName: string;
    storeName: string;
}
interface keychainOption extends BaseOption {
    driver: 'keychain';
}
declare type Option = DatabaseOption | keychainOption;
declare global {
    interface HTMLElementTagNameMap {
        'autofill-select': AutofillSelect;
    }
    interface WindowEventMap {
        autofill: CustomEvent;
    }
}
declare class ElectronAutofill {
    private _config;
    private readonly _node;
    private _ready;
    constructor();
    setup(option?: Option): void;
    save(): void;
}
declare const _default: ElectronAutofill;
export default _default;
