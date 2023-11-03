import "../../../lib/matra-vanilla.js"
import { comment } from "../../../lib/matra-vanilla-helper.js"

import defaultLayout from "../../../layout/default-layout.js"

import headFunc from "../../../mixin/head.js"

const ttlTxt = "生い立ち | butchi.jp"

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ ttlTxt }),

    comment("岩淵勇樹物智のホームページへようこそ！"),
    bodyTag`${[
        defaultLayout`${{ ttlTxt }}${[`<main class="mdl-layout__content">
            <h2 class="btc-page-title"><span lang="ja"></span>
                <ruby>岩淵
                    <rp>(</rp>
                    <rt>いわぶち</rt>
                    <rp>)</rp>勇樹
                    <rp>(</rp>
                    <rt>ゆうき</rt>
                    <rp>)</rp>
                </ruby> <span lang="en">(IWABUCHI Yu(u)ki)</span>
            </h2>
            <section class="sec-history">
                <h3 class="btc-section-title">生い立ち
                </h3>
                <div class="inner-block">
                    <ul class="list-history">
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="1984-09-13T06:18">1984年9月13日午前6時18分</time>
                            </h4>福井県大野市生まれ
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="1991">1991年</time>
                            </h4>大野市有終西小学校 入学
                            <ul>
                                <li>調理クラブ</li>
                                <li>相撲クラブ</li>
                                <li>漫画クラブ他</li>
                            </ul>
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="1997">1997年</time>
                            </h4>大野市開成中学校 入学
                            <ul>
                                <li>美術部</li>
                            </ul>
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2000">2000年</time>
                            </h4>福井県立大野高等学校 入学
                            <ul>
                                <li>パソコン部</li>
                                <li>放送部(2001年～)</li>
                                <li>合唱部(2001年～)</li>
                            </ul>
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2003">2003年</time>
                            </h4>金沢大学 工学部 情報システム工学科 入学
                            <ul>
                                <li>アカペラサークル"MeloMelo"</li>
                                <li>美術部</li>
                                <li>ICT教材作成支援室（金沢大学FD・ICT教育推進室）(2005年～)</li>
                            </ul>
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2007">2007年</time>
                            </h4>金沢大学大学院 自然科学研究科 電子情報工学専攻 博士前期課程 入学
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2008-12">2008年12月</time>
                            </h4>人生最大の転機
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2009">2009年</time>
                            </h4>金沢大学大学院 自然科学研究科 電子情報科学専攻 博士後期課程 入学
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2012">2012年</time>
                            </h4><a href="http://www.kayac.com/" target="_blank">面白法人カヤック</a>入社
                            <ul>
                                <li>閃光部（
                                    <time datetime="2012">2012年</time>〜
                                    <time datetime="2013">2013年</time>）
                                </li>
                                <li><a href="https://qiita.com/organizations/kayac" target="_blank">HTMLファイ部</a>（
                                    <time datetime="2014">2014年</time>〜）
                                </li>
                                <li><a href="https://www.kayac.com/news/2014/07/alljinji" target="_blank">人事部</a>（
                                    <time datetime="2014">2014年</time>〜）
                                </li>
                            </ul>
                        </li>
                        <li class="item-history">
                            <h4 class="btc-heading" data-heading-level="4">
                                <time datetime="2015-10">2015年</time>～
                            </h4><a href="http://wbawakate.jp/" target="_blank">全脳アーキテクチャ若手の会</a> 社会人支部
                        </li>
                    </ul>
                </div>
            </section>
            <section>
                <h3 class="btc-section-title">昔取った杵柄
                </h3>
                <div class="inner-block">
                    <ul>
                        <li>大野市開成中学校 漢字博士(2000年)(1997度入学生としては単独での認定)</li>
                        <li>漢字検定2級(2000年ごろ)</li>
                        <li>数学検定準1級(2002年)</li>
                        <li>パソコン検定3級(2002年)</li>
                        <li>金沢大学副学長表彰(2007年／ICT教材作成支援室学生クルーキャプテンとして)</li>
                        <li><a href="http://www.atmj.co.jp/contest/main.html" target="_blank">ATMJコンテスト</a>で<a
                                href="http://www.atmj.co.jp/contest/result.html" target="_blank">アイデア賞</a>を受賞</li>
                        <li><a href="http://www.zenhack.jp/" target="_blank">ZenHack 2015 Summer</a>で禅ハック賞受賞（<a
                                href="http://butchi.github.io/itadakimasu/" target="_blank">受賞作品</a>）</li>
                    </ul>
                </div>
            </section>
            <section class="sec-interest">
                <h3 class="btc-section-title">興味キーワード
                </h3>
                <div class="inner-block">
                    <section class="sec-interest-research">
                        <h4 class="btc-heading" data-heading-level="4">研究
                        </h4>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E7%94%BB%E5%83%8F%E5%87%A6%E7%90%86" target="_blank">画像処理</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E6%9B%B2%E7%B7%9A" target="_blank">曲線</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E3%83%99%E3%82%AF%E3%82%BF%E7%94%BB%E5%83%8F"
                                    target="_blank">ベクタ画像</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%82%A2%E3%83%B3%E3%83%81%E3%82%A8%E3%82%A4%E3%83%AA%E3%82%A2%E3%82%B7%E3%83%B3%E3%82%B0"
                                    target="_blank">アンチエイリアシング</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%82%B5%E3%83%B3%E3%83%97%E3%83%AA%E3%83%B3%E3%82%B0"
                                    target="_blank">サンプリング</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%95%E3%83%BC%E3%83%AA%E3%82%A8%E5%A4%89%E6%8F%9B"
                                    target="_blank">フーリエ変換</a>, <a class="elm-a" href="../../documents/analytic-signal/">解析信号</a>, <a
                                    class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%92%E3%83%AB%E3%83%99%E3%83%AB%E3%83%88%E5%A4%89%E6%8F%9B"
                                    target="_blank">ヒルベルト変換</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E6%95%B0%E5%BC%8F%E5%87%A6%E7%90%86" target="_blank">数式処理</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=Mathematica" target="_blank">Mathematica</a>,
                                <a class="elm-a google" href="https://www.google.com/#q=%E3%83%97%E3%83%AD%E3%83%83%E3%83%88"
                                    target="_blank">プロット</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=2%E9%80%B2%E6%95%B0" target="_blank">2進数</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E8%A8%98%E6%95%B0%E6%B3%95"
                                    target="_blank">記数法</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E6%BC%94%E7%AE%97%E5%99%A8" target="_blank">演算器</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=4%E6%AC%A1%E5%85%83"
                                    target="_blank">4次元</a>, <a class="elm-a" href="../../documents/fractal/">フラクタル</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E5%86%8D%E5%B8%B0%E6%9B%B2%E7%B7%9A"
                                    target="_blank">再帰曲線</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%89%E3%83%A9%E3%82%B4%E3%83%B3%E6%9B%B2%E7%B7%9A"
                                    target="_blank">ドラゴン曲線</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=%E9%BB%84%E9%87%91%E6%AF%94"
                                    target="_blank">黄金比</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%95%E3%82%A3%E3%83%9C%E3%83%8A%E3%83%83%E3%83%81%E6%95%B0"
                                    target="_blank">フィボナッチ数</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=%E5%93%B2%E5%AD%A6"
                                    target="_blank">哲学</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E5%BF%83%E7%90%86%E5%AD%A6" target="_blank">心理学</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E8%AA%8D%E7%9F%A5%E7%A7%91%E5%AD%A6"
                                    target="_blank">認知科学</a>, <a class="elm-a google" href="https://www.google.com/#q=%E9%A1%94"
                                    target="_blank">顔</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a" href="http://wbawakate.jp/" target="_blank">人工知能</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E8%A8%80%E8%AA%9E%E7%90%86%E8%A7%A3"
                                    target="_blank">言語理解</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%82%B0%E3%83%A9%E3%83%95%E7%90%86%E8%AB%96"
                                    target="_blank">グラフ理論</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E5%B7%A1%E5%9B%9E%E3%82%BB%E3%83%BC%E3%83%AB%E3%82%B9%E3%83%9E%E3%83%B3%E5%95%8F%E9%A1%8C"
                                    target="_blank">巡回セールスマン問題</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%82%B3%E3%83%A9%E3%83%83%E3%83%84%E5%95%8F%E9%A1%8C%EF%BC%883n%2B1%E5%95%8F%E9%A1%8C%EF%BC%89"
                                    target="_blank">コラッツ問題（3n+1問題）</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=JSON"
                                    target="_blank">JSON</a>, <a class="elm-a google" href="https://www.google.com/#q=XML"
                                    target="_blank">XML</a>, <a class="elm-a google" href="https://www.google.com/#q=MathML"
                                    target="_blank">MathML</a>, <a class="elm-a google" href="https://www.google.com/#q=SVG"
                                    target="_blank">SVG</a>,
                            </p>
                        </div>
                        <p>…</p>
                    </section>
                    <section class="sec-interest-art">
                        <h4 class="btc-heading" data-heading-level="4">アート
                        </h4>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%87%E3%82%B8%E3%82%BF%E3%83%AB%E3%82%A2%E3%83%BC%E3%83%88"
                                    target="_blank">デジタルアート</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%A1%E3%83%87%E3%82%A3%E3%82%A2%E3%82%A2%E3%83%BC%E3%83%88"
                                    target="_blank">メディアアート</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%88%E3%83%AA%E3%83%83%E3%82%AF%E3%82%A2%E3%83%BC%E3%83%88"
                                    target="_blank">トリックアート</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=Flash%20(ActionScript)"
                                    target="_blank">Flash (ActionScript)</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=Illustrator" target="_blank">Illustrator</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%86%E3%82%AF%E3%83%8E(Electronic)"
                                    target="_blank">テクノ(Electronic)</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%89%E3%83%A9%E3%83%A0%E3%83%B3%E3%83%99%E3%83%BC%E3%82%B9"
                                    target="_blank">ドラムンベース</a>, <a class="elm-a google" href="https://www.google.com/#q=IDM"
                                    target="_blank">IDM</a>, <a class="elm-a google" href="https://www.google.com/#q=Chiptune"
                                    target="_blank">Chiptune</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=Autechre"
                                    target="_blank">Autechre</a>, <a class="elm-a google" href="https://www.google.com/#q=Aphex%20Twin"
                                    target="_blank">Aphex Twin</a>, <a class="elm-a google" href="https://www.google.com/#q=Underworld"
                                    target="_blank">Underworld</a>, <a class="elm-a google" href="https://www.google.com/#q=%C2%B5-Ziq"
                                    target="_blank">µ-Ziq</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E9%9B%BB%E6%B0%97%E3%82%B0%E3%83%AB%E3%83%BC%E3%83%B4"
                                    target="_blank">電気グルーヴ</a>, <a class="elm-a google" href="https://www.google.com/#q=DE%20DE%20MOUSE"
                                    target="_blank">DE DE MOUSE</a>, <a class="elm-a google" href="https://www.google.com/#q=P-MODEL"
                                    target="_blank">P-MODEL</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=Final%20Fantasy"
                                    target="_blank">Final Fantasy</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E6%A4%8D%E6%9D%BE%E4%BC%B8%E5%A4%AB" target="_blank">植松伸夫</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E5%B4%8E%E5%85%83%E4%BB%81"
                                    target="_blank">崎元仁</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E9%87%8E%E6%9D%91%E5%93%B2%E4%B9%9F" target="_blank">野村哲也</a>, <a
                                    class="elm-a google" href="https://www.google.com/#q=%E5%90%89%E7%94%B0%E6%98%8E%E5%BD%A6"
                                    target="_blank">吉田明彦</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88" target="_blank">フォント</a>,
                            </p>
                        </div>
                        <p>…</p>
                    </section>
                    <section>
                        <h4 class="btc-heading" data-heading-level="4">その他趣味
                        </h4>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%82%A2%E3%82%A4%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%BC%E3%83%A0"
                                    target="_blank">アイスクリーム</a>, <a class="elm-a google"
                                    href="https://www.google.com/#q=%E7%94%98%E5%91%B3" target="_blank">甘味</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=%E3%81%8A%E7%AC%91%E3%81%84"
                                    target="_blank">お笑い</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google" href="https://www.google.com/#q=%E6%BC%A2%E5%AD%97"
                                    target="_blank">漢字</a>,
                            </p>
                        </div>
                        <div class="interest-category">
                            <p class="keyword"><a class="elm-a google"
                                    href="https://www.google.com/#q=%E3%83%A9%E3%82%A4%E3%83%95%E3%83%AD%E3%82%B0"
                                    target="_blank">ライフログ</a>, <a class="elm-a google" href="https://www.google.com/#q=SNS"
                                    target="_blank">SNS</a>,
                            </p>
                        </div>
                        <p>…</p>
                    </section>
                </div>
            </section>
        </main>`]}`,
    ]}`,
]}`
