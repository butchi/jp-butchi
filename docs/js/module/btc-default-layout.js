import mdcStyle from "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" assert { "type": "css" }
import materialIcon from "https://fonts.googleapis.com/icon?family=Material+Icons" assert { "type": "css" }
import * as mdc from "https://cdn.skypack.dev/material-components-web"

import { LitElement, html, ref, createRef } from "/js/lib/lit-all.min.js"

export class BtcDefaultLayout extends LitElement {
    rootPath = "/"
    mdcTopAppBarRef = createRef()
    contentRef = createRef()
    drawerRef = createRef()

    static properties = {
        title: { type: String },
    }

    static styles = [
        mdcStyle,
        materialIcon,
    ]

    firstUpdated() {
        const MDCDrawer = mdc.drawer.MDCDrawer
        const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar

        const drawer = MDCDrawer.attachTo(this.drawerRef.value);

        const topAppBar = new MDCTopAppBar.attachTo(this.mdcTopAppBarRef.value)

        topAppBar.setScrollTarget(this.contentRef.value)
        topAppBar.listen('MDCTopAppBar:nav', _ => {
            drawer.open = !drawer.open
        })
    }

    render() {
        return html`
        <aside class="mdc-drawer mdc-drawer--modal" ${ref(this.drawerRef)}>
            <div class="mdc-drawer__content">
                <nav class="mdc-deprecated-list">
                    <a class="mdc-deprecated-list-item mdc-deprecated-list-item--activated" href="${this.rootPath}" aria-current="page" tabindex="0">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">inbox</i>
                        <span class="mdc-deprecated-list-item__text">ホーム</span>
                    </a>
                    <a class="mdc-deprecated-list-item" href="${this.rootPath}self/">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">person</i>
                        <span class="mdc-deprecated-list-item__text">About me</span>
                    </a>
                    <a class="mdc-deprecated-list-item" href="${this.rootPath}works/">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">draw</i>
                        <span class="mdc-deprecated-list-item__text">作品紹介</span>
                    </a>
                    <a class="mdc-deprecated-list-item" href="${this.rootPath}publication/">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">drafts</i>
                        <span class="mdc-deprecated-list-item__text">発表文献</span>
                    </a>
                    <a class="mdc-deprecated-list-item" href="${this.rootPath}documents/">
                        <span class="mdc-deprecated-list-item__ripple"></span>
                        <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">drafts</i>
                        <span class="mdc-deprecated-list-item__text">解説記事</span>
                    </a>
                </nav>
            </div>
        </aside>
    
        <div class="mdc-drawer-scrim"></div>

        <div class="mdc-drawer-app-content">
            <header class="mdc-top-app-bar" ${ref(this.mdcTopAppBarRef)}>
                <div class="mdc-top-app-bar__row">
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                        <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                            aria-label="Open navigation menu">menu</button>
                        <span class="mdc-top-app-bar__title">${this.title}</span>
                    </section>
                    <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-end" role="toolbar">
                        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                            aria-label="Favorite">favorite</button>
                        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                            aria-label="Search">search</button>
                        <button class="material-icons mdc-top-app-bar__action-item mdc-icon-button"
                            aria-label="Options">more_vert</button>
                    </section>
                </div>
            </header>
        </div>
        <div class="mdc-top-app-bar--fixed-adjust">
            <div class="mdc-layout-grid">
                <div class="mdc-layout-grid__cell content" ${ref(this.contentRef)}>
                    <slot></slot>
                </div>
            </div>
        </div>
        `
    }
}