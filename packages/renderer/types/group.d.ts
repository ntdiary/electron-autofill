import { CardForm, PasswordForm } from "./form";
declare type formType = PasswordForm | CardForm | undefined;
/**
 * parse the form type
 *
 * @param input
 * @param formElement
 */
declare function buildForm(input: HTMLInputElement, formElement: HTMLFormElement): formType;
declare function autoSave(): void;
export { buildForm, autoSave, };
