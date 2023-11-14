"use strict"

const ExtractTextPlugin = require("extract-text-webpack-plugin")
const routeDataMapper = require("webpack-route-data-mapper")
const readConfig = require("read-config")
const readFile = require("read-file")
const path = require("path")

const lodash = require("lodash")
const moment = require("moment")
const markdownIt = require("markdown-it")({
    html: true,
})

// base config
const SRC = "./src"
const DEST = "./docs"
const HOST = process.env.HOST || "0.0.0.0"
const PORT = process.env.PORT || 3000

const constants = readConfig(`${SRC}/constants.yml`)
const { REPO_NAME, BASE_DIR } = constants

const production = process.env.NODE_ENV === "production"

// page/**/*.pug -> dist/**/*.html
const htmlTemplates = routeDataMapper({
    baseDir: `${SRC}/pug/page`,
    src: "**/[!_]*.pug",
    locals: Object.assign(
        {},
        constants,
        {
            require,
            lodash,
            moment,
            markdownIt,
            unescape: (body) => (
                // from [JavaScript：unescapeHTMLの妥当な実装: Architect Note](http://blog.tojiru.net/article/211339637.html)
                body
                    .replace("&amp;", /&/g)
                    .replace(/&lt;/g, "<")
                    .replace(/&gt;/g, ">")
                    .replace(/&amp;/g, "&")
                    .replace(/&quot;/g, "\"")
                    .replace(/&#39;/g, "'")
            ),
            meta: readConfig(`${SRC}/config/meta.yml`),
            bib: readConfig(`${SRC}/config/bib.yml`),
            interest: readConfig(`${SRC}/config/interest.yml`),
            people: readConfig(`${SRC}/config/people.json`),
            works: readConfig(`${SRC}/config/works.json`),
            dataPageSymbol: readConfig(`${SRC}/config/symbol.yml`),
        }
    ),
})

module.exports = {
    // エントリーファイル
    entry: {
        "js/script.js": `${SRC}/js/script.js`,
        "css/style.css": `${SRC}/scss/style.scss`,
    },
    // 出力するディレクトリ・ファイル名などの設定
    output: {
        path: path.resolve(__dirname, DEST + BASE_DIR),
        filename: "[name]",
        publicPath: "",
    },
    module: {
        // 各ファイル形式ごとのビルド設定
        rules: [
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /(node_modules)/,
                options: {
                    compact: true,
                    cacheDirectory: true,
                },
            },
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "pug-loader",
                        options: {
                            root: path.resolve(`${SRC}/pug/`),
                            pretty: true,
                        },
                    },
                ],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "[path][name].[ext]",
                },
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                importLoaders: 2,
                                url: false,
                            },
                        },
                        "postcss-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                includePaths: [`${SRC}/scss`],
                            },
                        },
                    ],
                }),
            },
            {
                test: /.ya?ml$/,
                loader: "js-yaml-loader",
            },
        ],
    },
    // webpack-dev-serverの設定
    devServer: {
        host: HOST,
        port: PORT,
        contentBase: DEST,
        openPage: path.relative("/", BASE_DIR),
    },
    // キャシュ有効化
    cache: true,
    // 拡張子省略時のpath解決
    resolve: {
        extensions: [
            ".js",
            ".json",
            "*",
        ],
        alias: {
            "@": path.join(__dirname, SRC, "js"),
        },
    },

    plugins: [
        // 複数のHTMLファイルを出力する
        ...htmlTemplates,
        // style.cssを出力
        new ExtractTextPlugin("[name]"),
    ],
}