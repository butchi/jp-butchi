import { LitElement, html, css } from "/js/lib/lit-all.min.js"

export class BtcButchiNumberTable extends LitElement {
    static styles = [
        css`
        :host {
            margin-top: 1em;
            border-top: 0px;
            border-left: 0px;
            border-bottom: 1px solid #000000;
            border-right: 1px solid #000000;
            display: inline-table;
            vertical-align: bottom;
        }
        `,
    ]

    render() {
        return html`
        <slot></slot>
        `
    }
}