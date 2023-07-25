import mdcStyle from "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" assert { "type": "css" }

import { LitElement, html } from "/js/lib/lit-all.min.js"

export class BtcCard extends LitElement {
    static styles = [
        mdcStyle,
    ]

    render() {
        return html`
        <div class="mdc-card">
            <slot></slot>
        </div>
        `
    }
}