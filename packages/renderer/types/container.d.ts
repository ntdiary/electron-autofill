import { LitElement, TemplateResult } from "lit";
import { StyleInfo } from "lit/directives/style-map.js";
declare class AutofillSelect extends LitElement {
    static styles: import("lit").CSSResult;
    open: boolean;
    event: Event | null;
    styles: StyleInfo;
    protected _ul: TemplateResult | undefined;
    protected _text: string;
    constructor();
    private _show;
    private _filter;
    connectedCallback(): void;
    disconnectedCallback(): void;
    protected render(): TemplateResult<1>;
}
export { AutofillSelect, };
