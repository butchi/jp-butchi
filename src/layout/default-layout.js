const defaultLayout = (_, propObj, ...slotArr) => `<aside class="mdc-drawer mdc-drawer--modal">
    <div class="mdc-drawer__content">
        <nav class="mdc-deprecated-list">
            <a class="mdc-deprecated-list-item mdc-deprecated-list-item--activated" href="/" aria-current="page" tabindex="0">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">inbox</i>
                <span class="mdc-deprecated-list-item__text">ホーム</span>
            </a>
            <a class="mdc-deprecated-list-item" href="/person/">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">person</i>
                <span class="mdc-deprecated-list-item__text">About me</span>
            </a>
            <a class="mdc-deprecated-list-item" href="/works/">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">draw</i>
                <span class="mdc-deprecated-list-item__text">作品紹介</span>
            </a>
            <a class="mdc-deprecated-list-item" href="/publication/">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">drafts</i>
                <span class="mdc-deprecated-list-item__text">発表文献</span>
            </a>
            <a class="mdc-deprecated-list-item" href="/documents/">
                <span class="mdc-deprecated-list-item__ripple"></span>
                <i class="material-icons mdc-deprecated-list-item__graphic" aria-hidden="true">drafts</i>
                <span class="mdc-deprecated-list-item__text">解説記事</span>
            </a>
        </nav>
    </div>
</aside>

<div class="mdc-drawer-scrim"></div>

<div class="mdc-drawer-app-content">
    <header class="mdc-top-app-bar">
        <div class="mdc-top-app-bar__row">
            <section class="mdc-top-app-bar__section mdc-top-app-bar__section--align-start">
                <button class="material-icons mdc-top-app-bar__navigation-icon mdc-icon-button"
                    aria-label="Open navigation menu">menu</button>
                <span class="mdc-top-app-bar__title">${propObj.ttlTxt}</span>
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
        <div class="mdc-layout-grid__cell content">${slotArr[0].join("\n")}</div>
    </div>
</div>
<script>
const MDCDrawer = mdc.drawer.MDCDrawer
const MDCTopAppBar = mdc.topAppBar.MDCTopAppBar

const drawer = MDCDrawer.attachTo(document.querySelector(".mdc-drawer"));

const topAppBar = new MDCTopAppBar.attachTo(document.querySelector(".mdc-top-app-bar"))

topAppBar.setScrollTarget(document.querySelector(".content"))
topAppBar.listen('MDCTopAppBar:nav', _ => {
    drawer.open = !drawer.open
})
</script>`

export default defaultLayout