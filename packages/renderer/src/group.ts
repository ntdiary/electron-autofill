import {CardForm, PasswordForm} from "./form";

type formType = PasswordForm | CardForm | undefined;

let holder: formType;

/**
 * parse the form type
 *
 * @param input
 * @param formElement
 */
function buildForm(input: HTMLInputElement, formElement: HTMLFormElement): formType {
  const name = input.name;
  let form: formType;
  if (PasswordForm.keys.findIndex(el => el === name) >= 0) {
    form = new PasswordForm(formElement.elements);
    holder = form;
  } else if (CardForm.keys.findIndex(el => el === name) >= 0) {
    form = new CardForm(formElement.elements);
  }
  return form;
}

function autoSave() {
  if (!holder) {
    return;
  }
  holder.saveData().then(() => {
    holder = undefined;
  });
}

export {
  buildForm,
  autoSave,
}
