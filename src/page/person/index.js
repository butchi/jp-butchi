import "../../lib/matra-vanilla.js"
import { comment } from "../../lib/matra-vanilla-helper.js"

import defaultLayout from "../../layout/default-layout.js"

import headFunc from "../../mixin/head.js"

const ttlTxt = "About | butchi.jp"

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ ttlTxt }),

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        defaultLayout`${{ ttlTxt }}${[`<main>
            <section>
                <h1>岩淵 勇樹</h1>
                <ul>
                    <li><a href="profile/">生い立ち</a></li>
                    <li><a href="creed/">者是</a></li>
                    <li><a href="people/">関連人物</a></li>
                </ul>
            </section>
        </main>`]}`,
    ]}`,
]}`
