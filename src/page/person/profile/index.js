import "#root/src/lib/matra-vanilla.js"
import {
    $q,
    mdTbl,
    ulElement,
    aElement,
} from "#root/src/lib/matra-vanilla-helper.js"

import defaultLayout from "#root/src/layout/default-layout.js"

import headFunc from "#root/src/mixin/head.js"

import interestObj from "#root/src/asset/interest.js"

const ttlTxt = "生い立ち"

const rubyName = ([kanjiArr, yomiArr]) => {
    const elmArr = kanjiArr.map((kanji, idx) => {
        return [kanji, rpTag`(`, rtTag`${yomiArr[idx]}`, rpTag`)`].join("")
    })

    return rubyTag`${elmArr}`
}

const formatDate = dateStr =>
    dateStr
        .split(/[-T:]/g)
        .map((d, i) => parseInt(d) + "年月日時分秒"[i])
        .join("")

const esClub = ulElement(["調理クラブ", "相撲クラブ", "漫画クラブ他"])
const jhsClub = ulElement(["美術部"])
const hsClub = ulElement(["パソコン部", "放送部(2001年～)", "合唱部(2001年～)"])
const univClub = ulElement([
    "アカペラサークル“MeloMelo”",
    "美術部",
    "ICT教材作成支援室（金沢大学FD・ICT教育推進室）(2005年～)",
])

const linkKayac = aElement("https://www.kayac.com/", "面白法人カヤック")
const linkWbaWakate = aElement(
    "http://wbawakate.jp/",
    "全脳アーキテクチャ若手の会"
)

const secHistory = sectionTag`${[
    h3Tag`生い立ち`,
    ulTag`${mdTbl`
        |   slug    |    start-date    |  end-date  |                                 event-txt                                 | appendix-txt |
        | --------- | ---------------- | ---------- | ------------------------------------------------------------------------- | ------------ |
        | impact-1  | 1984-09-13T06:18 |            | 福井県大野市生まれ                                                        |              |
        | es        | 1991-04          | 1997-03    | 大野市有終西小学校                                                        | ${esClub}    |
        | jhs       | 1997-04          | 1997-03    | 大野市開成中学校                                                          | ${jhsClub}   |
        | hs        | 2000-04          | 2003-03    | 福井県立大野高等学校                                                      | ${hsClub}    |
        | univ      | 2003-04          | 2007-03    | 金沢大学 工学部 情報システム工学科                                        | ${univClub}  |
        | master    | 2007-04          | 2009-03    | 金沢大学大学院 自然科学研究科 電子情報工学専攻 博士前期課程               |              |
        | impact-2  | 2008-12-15       | 2008-12-15 | 人生最大の転機                                                            |              |
        | doctor    | 2009-04          | 2012-03    | 金沢大学大学院 自然科学研究科 電子情報科学専攻 博士後期課程・博士（工学） |              |
        | kayac     | 2012-04          | 2020-02    | ${linkKayac}                                                              |              |
        | wbawakate | 2015-10          |            | ${linkWbaWakate} 社会人支部                                               |              |
        | u-turn    | 2021-06          |            | 故郷の福井県大野市在住                                                    |              |
    `.map(
        ({
            "start-date": startDateTxt,
            "end-date": endDateTxt,
            "event-txt": evtTxt,
            "appendix-txt": appendixTxt,
        }) =>
            liTag`${[
                h4Tag`${[
                    timeTag`${{
                        datetime: startDateTxt,
                    }}${formatDate(startDateTxt)}`,
                    startDateTxt != endDateTxt ? " ～ " : "",
                    endDateTxt &&
                        timeTag`${{
                            datetime: endDateTxt,
                        }}${formatDate(endDateTxt)}`,
                ]}`,
                pTag`${evtTxt}`,
                appendixTxt,
            ]}`
    )}`,
]}`

const secAward = sectionTag`${[
    h3Tag`昔取った杵柄`,
    ulElement([
        "大野市開成中学校 漢字博士(2000年)(1997度入学生としては単独での認定)",
        "漢字検定2級(2000年ごろ)",
        "数学検定準1級(2002年)",
        "パソコン検定3級(2002年)",
        "金沢大学副学長表彰(2007年／ICT教材作成支援室学生クルーキャプテンとして)",
        `${aElement(
            "http://www.atmj.co.jp/contest/main.html",
            "ATMJコンテスト"
        )}で${aElement(
            "http://www.atmj.co.jp/contest/result.html",
            "アイデア賞"
        )}を受賞`,
        `${aElement(
            "http://www.zenhack.jp/",
            "ZenHack 2015 Summer"
        )}で禅ハック賞受賞（${aElement(
            "http://butchi.github.io/itadakimasu/",
            "受賞作品"
        )}）`,
    ]),
]}`

const secInterest = sectionTag`${[
    h3Tag`興味キーワード`,
    Object.entries(interestObj)
        .map(
            ([key, subObj]) =>
                `
                    ${h4Tag`${key}`}
                    ${divTag`${Object.values(subObj).map(
                        keyWordArr => divTag`${keyWordArr.join(", ")}`
                    )}`}
                    ${divTag`...`}
                `
        )
        .join(""),
]}`

export default htmlTag`${{ lang: "ja" }}${[
    headFunc({ title: ttlTxt }),

    bodyTag`${[
        defaultLayout`${{ title: ttlTxt }}${[
            mainTag`${$q(".mdl-layout__content")}${[
                h2Tag`${[
                    spanTag`${{ lang: "ja" }}${rubyName([
                        ["岩淵", "勇樹", "物智"],
                        ["いわぶち", "ゆうき", "ぶつち"],
                    ])}`,
                    "/",
                    spanTag`${{ lang: "en" }}IWABUCHI Yu(u)ki (butchi)`,
                ]}`,

                secHistory,
                secAward,
                secInterest,
            ]}`,
        ]}`,
    ]}`,
]}`
