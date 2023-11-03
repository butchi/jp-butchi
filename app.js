import Koa from "koa"
import Router from "@koa/router"
import serve from "koa-static"

import rootHtmlTxt from "./src/page/index.js"
import personHtmlTxt from "./src/page/person/index.js"
import personProfileHtmlTxt from "./src/page/person/profile/index.js"
import personCreedHtmlTxt from "./src/page/person/creed/index.js"
import personPeopleHtmlTxt from "./src/page/person/people/index.js"

const app = new Koa()
const router = new Router()

router.get("/", ctx => {
  ctx.body = rootHtmlTxt
})

router.get("/person/", ctx => {
  ctx.body = personHtmlTxt
})

router.get("/person/profile/", ctx => {
  ctx.body = personProfileHtmlTxt
})

router.get("/person/creed/", ctx => {
  ctx.body = personCreedHtmlTxt
})

router.get("/person/people/", ctx => {
  ctx.body = personPeopleHtmlTxt
})

app.use(router.routes())
app.use(serve("./docs")); // 公開したいディレクトリを指定

app.listen(3000)