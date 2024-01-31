import "#root/src/lib/matra-vanilla.js"

const listItemArr = [
    {
        href: "/",
        iconName: "home",
        label: "ホーム",
        isActivated: true,
        isCurrent: true,
    },
    {
        href: "/person/",
        iconName: "person",
        label: "About me",
    },
    {
        href: "/works/",
        iconName: "draw",
        label: "作品紹介",
    },
    {
        href: "/publication/",
        iconName: "drafts",
        label: "発表文献",
    },
    {
        href: "/documents/",
        iconName: "article",
        label: "解説記事",
    },
]

const siteName = "butchi.jp"

const defaultLayout = (_, propObj, ...slotArr) =>
    `
        <btc-app-layout page-title="${propObj.title} | ${siteName}">
            <ul slot="drawer-list">
                ${listItemArr
                    .map(item => {
                        const {
                            href,
                            iconName,
                            label,
                            isActivated,
                            isCurrent,
                        } = item
                        return liTag`
                            ${Object.assign(
                                {
                                    "icon-name": iconName,
                                },
                                isActivated ? { "is-activated": true } : {},
                                isCurrent ? { "is-current": true } : {}
                            )}
                            ${aTag`${{ href }}${[label]}`}
                        `
                    })
                    .join("")}
            </ul>
            <div slot="content">${slotArr[0].join("")}</div>
        </btc-app-layout>
    `

export default defaultLayout
