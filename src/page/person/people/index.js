import "#root/src/lib/matra-vanilla.js"
import { comment } from "#root/src/lib/matra-vanilla-helper.js"

import defaultLayout from "#root/src/layout/default-layout.js"

import headFunc from "#root/src/mixin/head.js"

const ttlTxt = "関連人物"

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ title: ttlTxt }),

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        defaultLayout`${{ title: ttlTxt }}${[`<main>
            <article>
                <h1>岩淵勇樹の関連人物</h1>

                <section>
                    <h1>家族</h1>

                    <section>
                        <h1>直樹</h1>
                        <div>父</div>
                        <div>温厚でユーモアのある父。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>和子</h1>
                        <div>母</div>
                        <div>絵を描くのが上手（最近描いてないけど）な母。</div>

                        <picture>
                            <img src="/img/person/people/picture/female.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>加那子</h1>
                        <div>姉</div>
                        <div>元自衛隊員の三児の母。B'zの大ファン。</div>

                        <picture>
                            <img src="/img/person/people/picture/female.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>利夫</h1>
                        <div>祖父（故人）</div>
                        <div>相撲が強かった祖父。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>町子</h1>
                        <div>祖母（故人）</div>
                        <div>スナック「コンパル」を経営していた。背が高い。</div>

                        <picture>
                            <img src="/img/person/people/picture/female.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>烏龍</h1>
                        <div>ペット（故犬）</div>
                        <div>トイプードルのオス。エサをなかなか食べてくれない。</div>

                        <picture>
                            <img src="/img/person/people/picture/oolong.jpg" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>ロン</h1>
                        <div>ペット（故犬）</div>
                        <div>ゴールデンレトリバーのオス。人懐っこくて従順。</div>

                        <picture>
                            <img src="/img/person/people/picture/ron.jpg" alt="">
                        </picture>
                    </section>
                </section>
                <section>
                    <h1>親戚</h1>

                    <section>
                        <h1>新太郎</h1>
                        <div>祖父</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>茂子</h1>
                        <div>祖母</div>

                        <picture>
                            <img src="/img/person/people/picture/female.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>邦彦</h1>
                        <div>伯父（故人）</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>英樹</h1>
                        <div>伯父</div>
                        <div>父の双子の兄。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>勝代</h1>
                        <div>叔母</div>
                        <div>母の妹。</div>

                        <picture>
                            <img src="/img/person/people/picture/female.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>帆真</h1>
                        <div>義兄</div>
                        <div>姉の夫。自衛隊員。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>樹武</h1>
                        <div>甥</div>
                        <div>姉の第1子。車が大好き。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>龍志</h1>
                        <div>甥</div>
                        <div>姉の第2子。恐竜が大好き。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>和誠</h1>
                        <div>甥</div>
                        <div>姉の第3子。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>大和</h1>
                        <div>甥</div>
                        <div>姉の第4子。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>
                </section>
                <section>
                    <h1>親友</h1>

                    <section>
                        <h1>とも</h1>
                        <div>大学・サークル同輩</div>
                        <div> 同じ学科の友人で、アカペラサークルで何度もグループを組んだ仲。よく兄弟と間違われた同胞。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>脇本 健弘</h1>
                        <div>高校時代の先輩</div>
                        <div>高校時代のパソコン部の先輩。優秀な研究者。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>小野くん</h1>
                        <div>大学時代の後輩</div>
                        <div>プログラミングの趣向としてとても気が合う仲間。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>
                </section>
                <section>
                    <h1>尊敬する人</h1>

                    <section>
                        <h1>ドナルド・クヌース</h1>
                        <div>研究者</div>
                        <div>2進数の拡張をやったりTeXを開発したりと、個人的な嗜好にジャストミートな研究者。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>秋田 純一</h1>
                        <div>指導教員</div>
                        <div>大学・大学院で6年間お世話になった先生。研究者としての生き字引。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>宮下 芳明</h1>
                        <div>研究者</div>
                        <div>映像・音楽もプロ級で研究も独創的なマルチクリエイター研究者。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>
                </section>

                <section>
                    <h1>お気に入りのアーティスト</h1>

                    <section>
                        <h1>リチャード・D・ジェームス (Aphex Twin)</h1>
                        <div>ミュージシャン</div>
                        <div>ドラムンベースの巨匠。</div>

                        <picture>
                            <img src="https://graph.facebook.com/aphextwinafx/picture?width=512&amp;height=512"
                                alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>遠藤 大介 (DE DE MOUSE)</h1>
                        <div>ミュージシャン</div>
                        <div>アルバム『A journey to
                            freedom』がかなりツボ。</div>

                        <picture>
                            <img src="https://graph.facebook.com/DEDEMOUSE.FANPAGE/picture?width=512&amp;height=512"
                                alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>野村 哲也</h1>
                        <div>イラストレーター</div>
                        <div>ファイナルファンタジーVIIのキャラクターデザインなどを手がけており、画風がかなり好み。</div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>


                    <section>
                        <h1>中島 信也</h1>
                        <div>CMディレクター</div>
                        <div>有名なCMを数々手掛けている。
                            <a href="http://eat-project.jp/" target="_blank">eAT
                                KANAZAWA</a>の実行委員長。
                        </div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>

                    <section>
                        <h1>土佐 信道 (明和電機)</h1>
                        <div> <a href="http://www.maywadenki.com/otamatone/" target="_blank">オタマトーン</a>や<a
                                href="http://bbu.kayac.com/" target="_blank">YUREX</a>などを開発したマルチクリエイター。
                            <a href="http://eat-project.jp/" target="_blank">eAT KANAZAWA</a>の常連。
                        </div>

                        <picture>
                            <img src="/img/person/people/picture/male.png" alt="">
                        </picture>
                    </section>
                </section>
            </article>
        </main>`]}`,
    ]}`,
]}`
