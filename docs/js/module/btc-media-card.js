import { html, css, ref, createRef, ifDefined } from "../lib/lit-all.min.js"

import { BtcCard } from "./btc-card.js"

export class BtcMediaCard extends BtcCard {
    imgRef = createRef()

    static styles = [
        this.styles,
        css`
        .mdc-card {
            margin-bottom: 15px;

            width: 256px;
            height: 256px;
        }

        .mdc-card__media-content {
            background: linear-gradient(rgb(255, 255, 255, 1), 15%, rgba(255, 255, 255, 0));
        }
        `
    ]

    firstUpdated() {
        this.imgElm = this.shadowRoot.host.querySelector("img")

        this.imgSrc = this.imgElm.getAttribute("src")

        this.imgRef.value.style = `background-image: url(${this.imgSrc});`

        this.aElm = this.shadowRoot.host.querySelector("a")

        this.href = this.aElm.getAttribute("href")

        this.h1Elm = this.shadowRoot.host.querySelector("h1")

        this.title = this.h1Elm.innerHTML

        this.requestUpdate()
    }

    render() {
        return html`
        <div class="mdc-card">
            <div class="mdc-card__media mdc-card__media--square" ${ref(this.imgRef)}>
                <a href="${this.href || ''}">
                    <div class="mdc-card__media-content">
                        ${this.title}
                    </div>
                </a>
            </div>
        </div>
        `
    }
}