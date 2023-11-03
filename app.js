import Koa from "koa"
import Router from "@koa/router"
import serve from "koa-static"

import indexHtmlTxt from "./src/page/index.js"

const app = new Koa()
const router = new Router()

router.get("/", ctx => {
  ctx.body = indexHtmlTxt
})

app.use(router.routes())
app.use(serve("./docs")); // 公開したいディレクトリを指定

app.listen(3000)