import { Card, CardType, FillElement, Item, Password, PasswordType } from "../types";
import { TemplateResult } from "lit";
declare global {
    interface Window {
        localforage: LocalForage;
    }
}
declare function setupStore(name: string, storeName: string): void;
declare class Form<T extends Item> {
    inputs: HTMLFormControlsCollection;
    data: T[];
    text: string;
    constructor(collection: HTMLFormControlsCollection);
    fetchData(): Promise<void>;
    saveData(): Promise<void>;
    buildNodes(): TemplateResult | undefined;
    autofill(item: T, preview: boolean): void;
    updateValue(input: FillElement, value: string, preview: boolean): void;
}
declare class PasswordForm extends Form<Password> {
    static keys: Array<PasswordType>;
    constructor(collection: HTMLFormControlsCollection);
    fetchData(): Promise<void>;
    saveData(): Promise<void>;
    autofill(item: Password, preview: boolean): void;
}
declare class CardForm extends Form<Card> {
    static keys: CardType[];
    constructor(collection: HTMLFormControlsCollection);
    fetchData(): Promise<void>;
    autofill(item: Card, preview: boolean): void;
}
export { PasswordForm, CardForm, Form, setupStore };
