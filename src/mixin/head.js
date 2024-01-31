export default (propObj, ...slot) => {
    const siteName = "butchi.jp"

    const pageTtlTxt = propObj?.title

    const ttlTxt = pageTtlTxt ? `${pageTtlTxt} | ${siteName}` : siteName

    return headTag`${[
        metaTag`${{ charset: "UTF-8" }}`,
        metaTag`${{
            name: "viewport",
            content: "width=device-width, initial-scale=1.0",
        }}`,

        titleTag`${ttlTxt}`,
        linkTag`${{
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
        }}`,
        linkTag`${{ rel: "stylesheet", href: "/css/style.css" }}`,
        scriptTag`${{ type: "module", src: "/js/script.js" }}`,
        scriptTag`${{ type: "module", src: "/js/bundle.js" }}`,

        ...slot,
    ]}`
}
