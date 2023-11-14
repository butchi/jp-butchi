import "#root/src/lib/matra-vanilla.js"
import { comment } from "#root/src/lib/matra-vanilla-helper.js"

import defaultLayout from "#root/src/layout/default-layout.js"

import headFunc from "#root/src/mixin/head.js"

const ttlTxt = "About"

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ title: ttlTxt }),

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        defaultLayout`${{ title: ttlTxt }}${[`<main>
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
