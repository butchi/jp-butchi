const metaArr = [{
    charset: "UTF-8"
}, {
    name: "viewport", content: "width=device-width, initial-scale=1.0"
}]

export default ({ ttlTxt }) => headTag`${[
    titleTag`${ttlTxt}`,
    linkTag`${{ rel: "stylesheet", href: "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" }}`,
    linkTag`${{ rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }}`,
    linkTag`${{ rel: "stylesheet", href: "/css/style.css" }}`,
    scriptTag`${{ type: "module", src: "/js/script.js" }}`,
    scriptTag`${{ src: "https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js" }}`,

    ...metaArr.map(m => metaTag`${m}`),
]}`
