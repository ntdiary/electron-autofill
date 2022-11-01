import {buildForm} from "./group";
import {isElement, isFormElement, isInputElement} from "./utils";
import {css, html, LitElement, TemplateResult} from "lit";
import {property, state} from "lit/decorators.js";
import {styleMap} from "lit/directives/style-map.js";

class AutofillSelect extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: -4em;
      left: -200px;
      font-family: var(--autofill-font-family, sans-serif);
      z-index: var(--autofill-index, 999999);
    }
    .container {
      position: fixed;
      padding: 5px 0;
      border-radius: 5px;
      min-width: 100px;
      max-width: 300px;
      max-height: 300px;
      min-height: 2em;
      font-size: 14px;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0 0 5px 1px rgba(0, 0, 0, .3);
      cursor: default;
    }
    ul {
      margin: 0;
      padding: 0;
    }
    li {
      padding: 0 10px;
      line-height: 2em;
      list-style: none;
    }
    p {
      margin: 0;
      padding: 0 10px;
      box-sizing: border-box;
      line-height: 2em;
    }
    li:hover, p:hover {
      background-color: rgba(0, 0, 0, .1);
    }
    .line {
      margin: 5px 0;
      border-top: 1px solid #ddd;
    }
  `;

  connectedCallback() {
    super.connectedCallback();
    window.addEventListener('click', this._show, {capture: true});
    window.addEventListener('input', this._filter);
  }

  @state()
  protected _ul: TemplateResult | undefined;

  @state()
  protected _text: string = '';

  private _show = async (e: Event) => {
    this.event = e;
    const target = e.target;
    if (!isInputElement(target)) {
      return;
    }
    if (!target.autocomplete || target.autocomplete === 'off') {
      return;
    }
    this._calcPosition(target);
    this.open = true;

    const path: EventTarget[] = e.composedPath();
    const formElement = path.find(el => isFormElement(el));
    if (!isFormElement(formElement)) {
      return;
    }
    const form = buildForm(target, formElement.elements);
    if (form === null) {
      return;
    }
    await form.fetchData();
    this._ul = form.buildNodes();
    this._text = form.text;
    // hidden
    target.addEventListener('focusout', () => {
      this.open = false;
    }, {once: true, capture: true})
  }

  private _filter = (e: Event) => {
    this.event = e;
  }

  disconnectedCallback(): void {
    window.removeEventListener('click', this._show);
    window.removeEventListener('input', this._filter);
  }

  private _calcPosition = (target: HTMLInputElement) => {
    const rect = target.getBoundingClientRect();
    const bodyRect = document.body.getBoundingClientRect();
    if ((bodyRect.width - rect.right) < 200) {
      this.styles = {
        top: `${rect.top - 10}px`,
        left: 'auto',
        right: `${bodyRect.width - rect.left + 20}px`,
      }
      return;
    }
    this.styles = {
      top: `${rect.top - 10}px`,
      left: `${rect.right + 20}px`,
      right: 'auto',
    }
  }

  @property({type: Boolean})
  open = false;

  @property()
  event: Event | null = null;

  @property()
  styles: any = {};

  constructor() {
    super();
    // avoid triggering the focusout event
    this.addEventListener('mousedown', (e) => {
      const target = e.composedPath()[0];
      if (!isElement(target)
        || target.className === 'container'
        || target.className === 'line') {
        return;
      }
      e.preventDefault();
    });
    // autofill or admin
    this.addEventListener('click', (e) => {
      this.open = false;
      // TODO:develop
      const target = e.composedPath()[0];
      if (!isElement(target) || target.nodeName !== 'P') {
        return;
      }
      setTimeout(() => {
        window.alert('developing');
      }, 100);
    });
  }

  protected render() {
    if (!this._ul) {
      return html``;
    }
    return html`
      <div class="container" ?hidden="${!this.open}"
        style="${styleMap(this.styles)}">
        ${this._ul}
        <div class="line"></div>
        <p class="admin">${this._text}</p>
      </div>
    `;
  }
}

export {
  AutofillSelect,
}
