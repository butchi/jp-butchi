import "../../../lib/matra-vanilla.js"
import { comment } from "../../../lib/matra-vanilla-helper.js"

import defaultLayout from "../../../layout/default-layout.js"

import headFunc from "../../../mixin/head.js"

const ttlTxt = "者是 | butchi.jp"

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ ttlTxt }),

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        defaultLayout`${{ ttlTxt }}${[`<main>
            <article>
                <h1>者是</h1>

                <header>
                    <h1>者是とは</h1>

                    <p>
                        会社の経営方針を表すものとして「社是」というものがありますが、それを私自身にあてはめたものが「者是」です。
                        つまり、私の生きる方針です。
                    </p>
                </header>

                <section>
                    <h1>者是</h1>

                    <ul>
                        <li>謙虚たれ。</li>
                        <li>
                            「ありがとうございました。」を欠かさない。
                            コンビニでもバスでも、サービスを受けた時。
                        </li>
                        <li>
                            無限遠先の利益を最大化するように努力する。</li>
                        <li>
                            「生きる」とは、そのものの痕跡を遺し、それを再生する（現実世界に読み込む）ことである。
                            人の心に残っていれば、そのものは生きている。
                            文書やコンピューターにでも、自分の分身を埋め込むことができた上で再生できれば、そのものは生きている。
                        </li>
                        <li>出された食事は必ず全て食べる。それが最優先のマナー。エコでもある。</li>
                        <li>「立派な人間になりなさい。」祖父が私に遺してくれた言葉。</li>
                        <li>人を全否定することは絶対にしない。全ての人は自分にとって最善の行動をしているはずだから。</li>
                        <li>よく学ぶ。しかし勉強はしない。努力する。しかし苦労はしない。</li>
                        <li>どんなに小さくても嘘をつかない。ついていいのは馬鹿デカい嘘とエイプリルフールだけ。</li>
                        <li>鬼にならずに仏になれ。</li>
                        <li>真面目にふざけろ。</li>
                        <li>冒険第一、安全第二。</li>
                        <li>人類揃って皆昇天。</li>
                        <li>欲しがりません勝つまでは。</li>
                    </ul>
                </section>
            </article>
        </main>`]}`,
    ]}`,
]}`
