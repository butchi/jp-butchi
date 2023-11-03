import "./matra-vanilla.mjs"

const btcDefaultLayoutTag = htmlElement("btc-default-layout")

const htmlTxt = htmlTag`${{ lang: "ja" }}${[
    headTag`${[
        titleTag`${"岩淵勇樹 | butchi.jp"}`,
        linkTag`${{ rel: "stylesheet", href: "https://fonts.googleapis.com/icon?family=Material+Icons" }}`,
        linkTag`${{ rel: "stylesheet", href: "css/style.css" }}`,
        scriptTag`${{ type: "module", src: "js/script.js" }}`,
        scriptTag`${{ type: "module" }}${[`
            import { BtcDefaultLayout } from "./js/module/btc-default-layout.js"

            customElements.define("btc-default-layout", BtcDefaultLayout)
        `]}`,

        metaTag`${{ charset: "UTF-8" }}`,
        metaTag`${{ name: "viewport", content: "width=device-width, initial-scale=1.0" }}`,
    ]}`,

    // TODO: DOM芸
    // 岩淵勇樹物智のホームページへようこそ！
    bodyTag`${[
        btcDefaultLayoutTag`${{ title: "岩淵勇樹 | butchi.jp" }}${[
            mainTag`${[
                headerTag`${[
                    h1Tag`${{ class: "btc-site-title" }}${[
                        spanTag`${{ lang: "ja" }}${[
                            rubyTag`${[
                                "岩淵",
                                rpTag`${"("}`,
                                rtTag`${"いわぶち"}`,
                                rpTag`${")"}`,
                                "勇樹",
                                rpTag`${"("}`,
                                rtTag`${"ゆうき"}`,
                                rpTag`${")"}`,
                                "物智",
                                rpTag`${"("}`,
                                rtTag`${"ぶつち"}`,
                                rpTag`${")"}`,
                            ]}`,
                        ]}`,
                        "/",
                        spanTag`${{ lang: "en" }}${"IWABUCHI Yu(u)ki (butchi)"}`,
                    ]}`,
                ]}`,
                sectionTag`${{ class: "section-bibliography", id: "bibliography" }}${[
                    h3Tag`${{ class: "btc-section-title" }}${"略歴"}`,
                    divTag`${{ class: "inner-block" }}${[
                        ulTag`${[
                            liTag`${[
                                timeTag`${{ datetime: "1984" }}${"1984年"}`,
                                "福井県大野市生まれ",
                            ]}`,
                            liTag`${[
                                timeTag`${{ datetime: "2007" }}${"2007年"}`,
                                "金沢大学 工学部 情報システム工学科 卒業",
                            ]}`,
                            liTag`${[
                                timeTag`${{ datetime: "2009" }}${"2009年"}`,
                                "金沢大学大学院 自然科学研究科 電子情報工学専攻 博士前期課程修了",
                            ]}`,
                            liTag`${[
                                timeTag`${{ datetime: "2012" }}${"2012年"}`,
                                "金沢大学大学院 自然科学研究科 電子情報科学専攻 博士後期課程修了・博士（工学）",
                            ]}`,
                            liTag`${[
                                timeTag`${{ datetime: "2012-04" }}${"2012年4月～2020年"}`,
                                aTag`${{ href: "http://www.kayac.com/" }}${"面白法人カヤック"}`,
                            ]}`,
                        ]}`,
                        aTag`${{ href: "self/profile/" }}${"→ 略さない歴"}`,
                        brTag``,
                        aTag`${{ href: "self/creed/" }}${"→ 者是"}`,
                        brTag``,
                        aTag`${{ href: "self/people/" }}${"→ 関連人物"}`,
                        sectionTag`${{ id: "research-theme" }}${[
                            h4Tag`${{ class: "btc-heading" }}${"研究テーマ"}`,
                            pTag`${"数学的特性に基づくインターフェースや、美しい画像表現のためのハードウェア、効率的な処理を行う演算器など。"}`,
                            pTag`${"数学モデルの集積回路・インタラクティブシステムなどへの応用に関する研究に従事。"}`,
                        ]}`,
                    ]}`,
                ]}`,
                sectionTag`${{ class: "section-document", id: "document" }}${[
                    h3Tag`${{ class: "btc-section-title" }}${"諸々"}`,
                    divTag`${{ class: "inner-block" }}${[
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"作品"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "works/web/" }}${"Web"}`]}`,
                                liTag`${[aTag`${{ href: "works/movie/" }}${"映像"}`]}`,
                                liTag`${[aTag`${{ href: "works/design/" }}${"デザイン"}`]}`,
                                liTag`${[aTag`${{ href: "works/music/" }}${"音楽"}`]}`,
                                liTag`${[aTag`${{ href: "works/writing" }}${"詩・執筆"}`]}`,
                            ]}`,
                        ]}`,
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"研究"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "documents/butchi-number/" }}${"物智数"}`]}`,
                                liTag`${[aTag`${{ href: "documents/analytic-signal/" }}${"解析信号"}`]}`,
                                liTag`${[aTag`${{ href: "documents/fractal/" }}${"フラクタル"}`]}`,
                            ]}`,
                        ]}`,
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"執筆"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "documents/symbol/" }}${"記号辞典 ～コンピューターにおける記号の意味と使われ方～"}`]}`,
                            ]}`,
                        ]}`,
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"プログラム"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "documents/graphicalpad/" }}${"GraphiCalPad"}`]}`,
                                liTag`${[aTag`${{ href: "works/webclappad" }}${"WebClapPad"}`]}`,
                                liTag`${[aTag`${{ href: "works/nandemo-magic/" }}${"なんでも魔法。"}`]}`,
                                liTag`${[aTag`${{ href: "works/po3pokemon/" }}${"ポポポポケモン！"}`]}`,
                                liTag`${[aTag`${{ href: "https://butchi.github.io/secondly-happy/" }}${"秒刊ハッピー"}`]}`,
                            ]}`,
                        ]}`,
                    ]}`,
                ]}}`,
                sectionTag`${{ class: "section-publication", id: "publication" }}${[
                    h3Tag`${{ class: "btc-section-title" }}${"発表文献"}`,
                    divTag`${{ class: "inner-block" }}${[
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"国際発表"}`,
                        ]}`,
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"国内発表"}`,
                        ]}`,
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"学内発表・講義関連"}`,
                        ]}`,
                    ]}}`,
                ]}`,
                sectionTag`${{ class: "section-link", id: "link" }}${[
                    h3Tag`${{ class: "btc-section-title" }}${""}`,
                    divTag`${{ class: "inner-block" }}${[
                        sectionTag`${[
                            h4Tag`${{ class: "btc-heading" }}${"所属"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "https://pzkn.seesaa.net/" }}${"パズル懇話会"}`]}`,
                                liTag`${[aTag`${{ href: "https://www.yugen.org/" }}${"湧源クラブ"}`]}`,
                                liTag`${[aTag`${{ href: "https://mathcafe.net/" }}${"数学カフェ"}`]}`,
                                liTag`${[aTag`${{ href: "https://image.club/" }}${"Image Club"}`]}`,
                                liTag`${[aTag`${{ href: "https://wbawakate.jp/" }}${"全脳アーキテクチャ若手の会"}`]}`,
                            ]}`,
                        ]}`,
                        sectionTag`${[
                            h5Tag`${{ class: "btc-heading" }}${"過去の所属"}`,
                            ulTag`${[
                                liTag`${[aTag`${{ href: "https://www.kanazawa-u.ac.jp/" }}${"金沢大学"}`]}`,
                                liTag`${[aTag`${{ href: "https://www.merl.jp/" }}${"金沢大学 工学部 情報システム工学科 集積回路工学研究室"}`]}`,
                                liTag`${[aTag`${{ href: "https://fdict.el.kanazawa-u.ac.jp/" }}${"金沢大学 FD・ICT教育推進"}`]}`,
                                liTag`${[aTag`${{ href: "https://melomelo.main.jp/" }}${"金沢大学アカペラサークル “MeloMelo”"}`]}`,
                                liTag`${[aTag`${{ href: "https://www.geocities.jp/kinndai_art/" }}${"金沢大学美術部"}`]}`,
                            ]}`,
                        ]}`,
                        sectionTag`${[
                            h5Tag`${{ class: "btc-heading" }}${"関連リンク"}`,
                            ulTag`${[
                                liTag`${[iTag`${{ class: "mdi mdi-facebook-box" }}`, aTag`${{ href: "https://www.facebook.com/iwabuchi.yuki.butchi" }}${"岩淵 勇樹"}`]}`,
                                liTag`${[iTag`${{ class: "mdi mdi-twitter-box" }}`, aTag`${{ href: "https://twitter.com/butchi_y" }}${"butchi_y （趣味アカウント）"}`]}`,
                                liTag`${[iTag`${{ class: "mdi mdi-twitter-box" }}`, aTag`${{ href: "https://twitter.com/butchi_x" }}${"butchi_x（サブアカウント）"}`]}`,
                                liTag`${[iTag`${{ class: "material-icons" }}${"web"}`, aTag`${{ href: "https://qiita.com/butchi_y" }}${"Qiita (ID: butchi_y)"}`]}`,
                                liTag`${[iTag`${{ class: "material-icons" }}${"web"}`, aTag`${{ href: "https://www.pixiv.net/member.php?id=119" }}${"pixiv (id=119)"}`]}`,
                                liTag`${[iTag`${{ class: "material-icons" }}${"web"}`, aTag`${{ href: "https://geek-house-yokohama.webnode.jp/" }}${"ギークハウス横浜"}`]}`,
                                liTag`${[iTag`${{ class: "material-icons" }}${"web"}`, aTag`${{ href: "https://twitter.com/nichimath" }}${"日曜数学会"}`]}`,
                            ]}`,
                        ]}`,
                    ]}}`,
                ]}`,
            ]}`,
            footerTag`${[
                divTag`${{ class: "inner-block" }}${[
                    divTag`${{ class: "e-mail" }}${[
                        pTag`${{ class: "address" }}${[
                            iTag`${{ class: "material-icons" }}${"email"}`,
                            spanTag`${"butchiyu+"}`,
                            spanTag`${"mailer-1"}`,
                            spanTag`${"-jp-butchi"}`,
                            spanTag`${"@gmail.com"}`,
                        ]}`,
                    ]}`
                ]}`,
            ]}`,
        ]}`,
    ]}`,
]}`

console.log(htmlTxt)
