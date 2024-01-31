import "@material/web/button/filled-button.js"

import { LitElement, css, html } from "lit"

/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
export class BtcButton extends LitElement {
    render() {
        return html`<md-filled-button @click=${this._onClick}
            ><slot></slot
        ></md-filled-button>`
    }
}

window.customElements.define("btc-button", BtcButton)
