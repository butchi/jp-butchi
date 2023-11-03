import "./matra-vanilla.mjs"
import { $q, objectArray, ulElement, aElement, comment } from "./matra-vanilla-helper.mjs"

import bibObj from "./bib.mjs"

const metaArr = [{
    charset: "UTF-8"
}, {
    name: "viewport", content: "width=device-width, initial-scale=1.0"
}]

const ttlTxt = "岩淵勇樹 | butchi.jp"

const btcDefaultLayoutTag = htmlElement("btc-default-layout")

const litScript = `
import { BtcDefaultLayout } from "./js/module/btc-default-layout.js"

customElements.define("btc-default-layout", BtcDefaultLayout)
`

const headBlock = headTag`${[
    titleTag`${ttlTxt}`,
    linkTag`${{ rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }}`,
    linkTag`${{ rel: "stylesheet", href: "css/style.css" }}`,
    scriptTag`${{ type: "module", src: "js/script.js" }}`,
    scriptTag`${{ type: "module" }}${litScript}`,

    ...metaArr.map(m => metaTag`${m}`),
]}`

const rubyName = ([kanjiArr, yomiArr]) => {
    const elmArr = kanjiArr.map((kanji, idx) => {
        return [
            kanji,
            rpTag`${"("}`,
            rtTag`${yomiArr[idx]}`,
            rpTag`${")"}`,
        ].join("")
    })

    return rubyTag`${elmArr}`
}

const headerBlock = headerTag`${[
    h1Tag`${$q(".btc-site-title")}${[
        spanTag`${{ lang: "ja" }}${rubyName([["岩淵", "勇樹", "物智"], ["いわぶち", "ゆうき", "ぶつち"]])}`,
        "/",
        spanTag`${{ lang: "en" }}IWABUCHI Yu(u)ki (butchi)`,
    ]}`,
]}`

const secBibBlock = sectionTag`${$q(".section-bibliography#bibliography")}${[
    h3Tag`${$q("btc-section-title")}略歴`,
    divTag`${$q(".inner-block")}${[
        ulElement(objectArray`${["date-time", "time-text", "event-text"]}${[
            ["1984", "1984年", "福井県大野市生まれ"],
            ["2007", "2007年", "金沢大学 工学部 情報システム工学科 卒業"],
            ["2009", "2009年", "金沢大学大学院 自然科学研究科 電子情報工学専攻 博士前期課程修了"],
            ["2012", "2012年", "金沢大学大学院 自然科学研究科 電子情報科学専攻 博士後期課程修了・博士（工学）"],
            ["2012-04", "2012年4月～2020年", aElement("https://www.kayac.com/", "面白法人カヤック")],
        ]}`.map(({ "date-time": datetime, "time-text": timeTxt, "event-text": evtTxt }) => [timeTag`${{ datetime }}${timeTxt}`, evtTxt])),
        aElement("self/profile/", "→ 略さない歴"),
        "<br>",
        aElement("self/creed/", "→ 者是"),
        "<br>",
        aElement("self/people/", "→ 関連人物"),
        sectionTag`${$q("#research-theme")}${[
            h4Tag`${$q(".btc-heading")}研究テーマ`,
            pTag`数学的特性に基づくインターフェースや、美しい画像表現のためのハードウェア、効率的な処理を行う演算器など。`,
            pTag`数学モデルの集積回路・インタラクティブシステムなどへの応用に関する研究に従事。`,
        ]}`,
    ]}`,
]}`

const secDocBlock = sectionTag`${$q(".section-document#document")}${[
    h3Tag`${$q(".btc-section-title")}諸々`,
    divTag`${$q(".inner-block")}${[
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}作品`,
            ulElement(objectArray`${["slug", "text", "url"]}${[
                ["web", "Web", "works/web/"],
                ["movie", "映像", "works/movie/"],
                ["design", "デザイン", "works/design/"],
                ["music", "音楽", "works/music/"],
                ["writing", "詩・執筆", "works/writing/"],
            ]}`.map(({ url: href, text: content }) => aElement({ href, content })))
        ]}`,
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"研究"}`,
            ulElement(objectArray`${["slug", "text", "url"]}${[
                ["butchi-number", "物智数", "documents/butchi-number/"],
                ["analytic-signal", "解析信号", "documents/analytic-signal/"],
                ["fractal", "フラクタル", "documents/fractal/"],
            ]}`.map(({ url: href, text: content }) => aElement({ href, content })))
        ]}`,
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"執筆"}`,
            ulElement([
                aElement("documents/symbol/", "記号辞典 ～コンピューターにおける記号の意味と使われ方～"),
            ]),
        ]} `,
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"プログラム"}`,
            ulElement(objectArray`${["slug", "text", "url"]}${[
                ["graphicalpad", "GraphiCalPad", "documents/graphicalpad/"],
                ["webclappad", "WebClapPad", "documents/webclappad/"],
                ["nandemo-magic", "なんでも魔法。", "documents/nandemo-magic/"],
                ["popopopokemon", "ポポポポケモン！", "documents/po3pokemon/"],
                ["secondly-happy", "秒刊ハッピー", "https://butchi.github.io/secondly-happy/"],
            ]}`.map(({ url: href, text: content }) => aElement({ href, content })))
        ]} `,
    ]}`,
]}`

const bibItem = slug => {
    const obj = bibObj[slug]

    const { author, title, journal, volume, number, pages, date, site } = obj

    const authorTxt = typeof author === "string" ? author : author.join(", ")

    const journalTxt = journal ? `${journal}, ` : ""

    const volumeTxt = volume ? `Vol.${volume}, ` : ""

    const numberTxt = number ? `No.${number}, ` : ""

    const pagesTxt = pages ? (pages instanceof Array ? `pp. ${pages?.join("--")}, ` : `p. ${pages}, `) : ""

    const dateTxt = date ? `${date}` : ""

    const siteTxt = site ? ` ${aElement(site, " [詳細ページ]")}` : ""

    return `${authorTxt}, ${title}, ${journalTxt}${volumeTxt}${numberTxt}${pagesTxt}${dateTxt}.${siteTxt}`
}

const secPublishBlock = sectionTag`${$q(".section-publication#publication")}${[
    h3Tag`${$q(".btc-section-title")}発表文献`,
    divTag`${$q(".inner-block")}${[
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"国際発表"}`,
            ulElement([
                bibItem("butchi-number--2010-06--iwabuchi-yuki"),
            ]),
        ]}`,
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"国内発表"}`,
            ulElement([
                bibItem("icd--2007-07--iwabuchi-yuki"),
                bibItem("ec--2008--iwabuchi-yuki"),
                bibItem("wiss--2008--iwabuchi-yuki"),
                bibItem("ite--2008--maeda-yui"),
                bibItem("mus-85--iwabuchi-yuki"),
                bibItem("interaction--2011--iwabuchi-yuki"),
                bibItem("art-science--2011--iwabuchi-yuki"),
                bibItem("lams--2013--iwabuchi-yuki"),
                bibItem("mus-105--iwabuchi-yuki"),
            ]),
        ]}`,
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}${"学内発表・講義関連"}`,
            ulElement([
                [
                    "自主課題研究「偏角関数を用いた曲線の研究」(2006)",
                    aElement("org/kanazawa-univ/b3-research/b3-research.pdf", "[レポート(PDF)]"),
                    aElement("org/kanazawa-univ/b3-research/b3-research.ppt", "[発表スライド(.ppt)]"),
                ], [
                    "卒業論文「2進数の平面的表現に関する考察」(2007)",
                    aElement("org/kanazawa-univ/b-thesis/", "[詳細ページ]"),
                ], [
                    "カオスとその応用「研究紹介 ～フラクタルと絡めて～」(2007)",
                    aElement("org/kanazawa-univ/chaos/chaotic-dynamics-and-its-applications.ppt", "[発表スライド(.ppt)]"),
                ], [
                    "修士論文「閉曲線図形を利用した音色生成法」(2009)",
                    aElement("org/kanazawa-univ/m-thesis.ppt", "[発表スライド(.ppt)]"),
                ], [
                    "博士論文「図形と音声の変換手法とその応用に関する研究」(2012)",
                    aElement("org/kanazawa-univ/d-thesis/", "[詳細ページ]"),
                ],
                aElement("org/kanazawa-univ/reading-seminar/", "論文輪講"),
                aElement("org/kanazawa-univ/tte/", "テクノロジトレンド工学"),
                aElement("org/kanazawa-univ/cubic-puzzle/", "キュービックパズルの迷宮"),
                [
                    "記数法のさまざまな拡張～2進数からButchi数まで～（2012年）",
                    aElement("documents/yugen20120826", "[発表スライド(HTMLページ)]"),
                ]
            ]),
        ]}`,
    ]}`,
]} `

const mdi = icoName => iTag`${$q(`.mdi.mdi-${icoName}`)}`
const materialIcon = icoName => iTag`${$q(".material-icons")}${icoName}`

const facebookIco = mdi("facebook-box")
const twitterIco = mdi("twitter-box")
const webIco = materialIcon("web")

const secLinkBlock = sectionTag`${$q(".section-link#link")}${[
    h3Tag`${$q(".btc-section-title")}リンク`,
    divTag`${$q(".inner-block")}${[
        sectionTag`${[
            h4Tag`${$q(".btc-heading")}所属`,
            ulElement(objectArray`${["slug", "text", "url"]}${[
                ["pzkn", "パズル懇話会", "https://pzkn.seesaa.net/"],
                ["yugen", "湧源クラブ", "https://www.yugen.org/"],
                ["mathcafe", "数学カフェ", "https://mathcafe.net/"],
                ["imageclub", "Image Club", "https://image.club/"],
                ["wbawakate", "全脳アーキテクチャ若手の会", "https://wbawakate.jp/"],
            ]}`.map(({ url: href, text: content }) => aElement({ href, content })))
        ]}`,
        sectionTag`${[
            h5Tag`${$q(".btc-heading")}過去の所属`,
            ulElement(objectArray`${["slug", "text", "url"]}${[
                ["ku", "金沢大学", "https://www.kanazawa-u.ac.jp/"],
                ["merl", "金沢大学 工学部 情報システム工学科 集積回路工学研究室", "https://www.merl.jp/"],
                ["ict", "金沢大学 FD・ICT教育推進", "https://fdict.el.kanazawa-u.ac.jp/"],
                ["melomelo", "金沢大学アカペラサークル “MeloMelo”", "https://melomelo.main.jp/"],
                ["fackanazawa", "金沢大学美術部", "https://www.geocities.jp/kinndai_art/"],
            ]}`.map(({ url: href, text: content }) => aElement({ href, content })))
        ]}`,
        sectionTag`${[
            h5Tag`${$q(".btc-heading")}${"関連リンク"}`,
            ulElement(objectArray`${["slug", "icon", "text", "url"]}${[
                ["fb", facebookIco, "岩淵 勇樹", "https://www.facebook.com/iwabuchi.yuki.butchi"],
                ["twitter-y", twitterIco, "butchi_y （趣味アカウント）", "https://twitter.com/butchi_y"],
                ["twitter-x", twitterIco, "butchi_x（サブアカウント）", "https://twitter.com/butchi_x"],
                ["qiita", webIco, "Qiita (ID: butchi_y)", "https://qiita.com/butchi_y"],
                ["pixiv", webIco, "pixiv (id=119)", "https://www.pixiv.net/member.php?id=119"],
                ["geek-house", webIco, "ギークハウス横浜", "https://geek-house-yokohama.webnode.jp/"],
                ["nichimath", webIco, "日曜数学会", "https://twitter.com/nichimath"],
            ]}`.map(({ icon, url: href, text: content }) => [icon, aElement({ href, content })]))
        ]}`,
    ]}`,
]} `

const footerBlock = footerTag`${[
    divTag`${$q(".inner-block")}${[
        divTag`${$q(".e-mail")}${[
            pTag`${$q(".address")}${[
                iTag`${$q(".material-icons")}email`,
                spanTag`${"butchiyu"}`,
                spanTag`${"+mailer-1"}`,
                spanTag`${"-jp-butchi"}`,
                spanTag`${"@gmail.com"}`,
            ]}`,
        ]}`
    ]}`,
]}`


const htmlTxt = htmlTag`${{ lang: "ja" }}${[
    headBlock,

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        btcDefaultLayoutTag`${{ title: "岩淵勇樹 | butchi.jp" }}${[
            headerBlock,
            mainTag`${[
                secBibBlock,
                secDocBlock,
                secPublishBlock,
                secLinkBlock,
            ]}`,
            footerBlock,
        ]}`,
    ]}`,
]}`

console.log(htmlTxt)
