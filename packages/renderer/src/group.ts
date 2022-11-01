import {CardForm, PasswordForm} from "./form";

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

export {
  buildForm,
}
