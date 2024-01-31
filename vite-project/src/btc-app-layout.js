import "@material/drawer"

import { LitElement, css, html, unsafeCSS } from "lit"

import { MDCDrawer } from "@material/drawer"
import { MDCTopAppBar } from "@material/top-app-bar"

import iconButtonStyle from "@material/icon-button/dist/mdc.icon-button.css?inline"
import drawerStyle from "@material/drawer/dist/mdc.drawer.css?inline"
import listStyle from "@material/list/dist/mdc.list.css?inline"
import topAppBarStyle from "@material/top-app-bar/dist/mdc.top-app-bar.css?inline"
import layoutGridStyle from "@material/layout-grid/dist/mdc.layout-grid.css?inline"

export class BtcAppLayout extends LitElement {
    static get properties() {
        return {
            pageTitle: {
                type: String,
                attribute: "page-title",
            },
            drawerArr: {
                type: Array,
            },
        }
    }

    constructor() {
        super()

        this.drawerArr = []
    }

    firstUpdated() {
        const drawerListSlot = this.shadowRoot.querySelector(
            'slot[name="drawer-list"]'
        )
        drawerListSlot.addEventListener("slotchange", () => {
            this.handleDrawerListSlotChange()
        })

        const drawer = MDCDrawer.attachTo(
            this.renderRoot.querySelector(".mdc-drawer")
        )

        const topAppBar = new MDCTopAppBar.attachTo(
            this.renderRoot.querySelector(".mdc-top-app-bar")
        )

        topAppBar.setScrollTarget(this.renderRoot.querySelector(".content"))
        topAppBar.listen("MDCTopAppBar:nav", _ => {
            drawer.open = !drawer.open
        })
    }

    handleDrawerListSlotChange() {
        const slot = this.shadowRoot.querySelector('slot[name="drawer-list"]')
        const ulElm = slot.assignedNodes()[0]

        if (ulElm) {
            const drawerArr = [...ulElm.querySelectorAll("li")].map(
                (liElm, idx) => {
                    const tabIndex = idx
                    const aElm = liElm.querySelector("a")
                    const iconName = liElm.getAttribute("icon-name")
                    const href = aElm.getAttribute("href")
                    const label = aElm.textContent
                    const isActivated =
                        liElm.getAttribute("is-activated") === "true"
                    const isCurrent =
                        liElm.getAttribute("is-current") === "true"

                    return {
                        href,
                        iconName,
                        label,
                        tabIndex,
                        isActivated,
                        isCurrent,
                    }
                }
            )

            this.drawerArr = drawerArr
        }
    }

    render() {
        return html`<aside class="mdc-drawer mdc-drawer--modal">
                <div class="mdc-drawer__content">
                    <nav class="mdc-deprecated-list">
                        ${this.drawerArr.map(item => {
                            const {
                                href,
                                iconName,
                                label,
                                tabIndex,
                                isActivated,
                                isCurrent,
                            } = item

                            return html`
                                <a
                                    class="mdc-deprecated-list-item${isActivated
                                        ? " mdc-deprecated-list-item--activated"
                                        : ""}"
                                    aria-current="${isCurrent
                                        ? "page"
                                        : "false"}"
                                    href="${href}"
                                    tabindex="${tabIndex}"
                                >
                                    <span
                                        class="mdc-deprecated-list-item__ripple"
                                    ></span>
                                    <i
                                        class="material-icons mdc-deprecated-list-item__graphic"
                                        aria-hidden="true"
                                        >${iconName}</i
                                    >
                                    <span class="mdc-deprecated-list-item__text"
                                        >${label}</span
                                    >
                                </a>
                            `
                        })}
                    </nav>
                    <slot name="drawer-list" style="visibility: hidden;"></slot>
                </div>
            </aside>

            <div class="mdc-drawer-scrim"></div>

            <div class="mdc-drawer-app-content">
                <header class="mdc-top-app-bar">
                    <div class="mdc-top-app-bar__row">
                        <section
                            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start"
                        >
                            <button
                                class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                                aria-label="Open navigation menu"
                            >
                                menu
                            </button>
                            <span class="mdc-top-app-bar__title">
                                ${this.pageTitle}
                            </span>
                        </section>
                        <section
                            class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end"
                            role="toolbar"
                        >
                            <button
                                class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                                aria-label="Favorite"
                            >
                                favorite
                            </button>
                            <button
                                class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                                aria-label="Search"
                            >
                                search
                            </button>
                            <button
                                class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                                aria-label="Options"
                            >
                                more_vert
                            </button>
                        </section>
                    </div>
                </header>
            </div>
            <div class="mdc-top-app-bar--fixed-adjust">
                <div class="mdc-layout-grid">
                    <div class="mdc-layout-grid__cell content">
                        <slot name="content"></slot>
                    </div>
                </div>
            </div>`
    }

    static get styles() {
        return [
            css`
                .material-icons {
                    font-family: "Material Icons";
                    font-weight: normal;
                    font-style: normal;
                    font-size: 24px; /* Preferred icon size */
                    display: inline-block;
                    line-height: 1;
                    text-transform: none;
                    letter-spacing: normal;
                    word-wrap: normal;
                    white-space: nowrap;
                    direction: ltr;

                    /* Support for all WebKit browsers. */
                    -webkit-font-smoothing: antialiased;
                    /* Support for Safari and Chrome. */
                    text-rendering: optimizeLegibility;

                    /* Support for Firefox. */
                    -moz-osx-font-smoothing: grayscale;

                    /* Support for IE. */
                    font-feature-settings: "liga";
                }
            `,
            unsafeCSS(iconButtonStyle),
            unsafeCSS(drawerStyle),
            unsafeCSS(listStyle),
            unsafeCSS(topAppBarStyle),
            unsafeCSS(layoutGridStyle),
        ]
    }
}

window.customElements.define("btc-app-layout", BtcAppLayout)
