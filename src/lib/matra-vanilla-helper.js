import { unified } from "unified"
import remarkGfm from "remark-gfm"
import remarkParse from "remark-parse"
import { toHast } from "mdast-util-to-hast"
import { toHtml } from "hast-util-to-html"

export const $q = str => {
    const [cStr, idStr] = str.split("#")

    const cArr = cStr.split(".").slice(1)

    if (cArr.length === 0 && idStr == null) {
        return
    } else if (idStr == null) {
        return { class: cArr.join(" ") }
    } else if (cArr.length === 0) {
        return { id: idStr }
    } else {
        return { class: cArr.join(" "), id: idStr }
    }
}

export const $enc = str => encodeURIComponent(str)

export const objectTable = (_, [header, ...cellTbl]) => {
    return Object.fromEntries(cellTbl.map(cellArr => {
        const [slug, ...restArr] = cellArr

        const obj = {}

        const keyArr = header.slice(1)

        restArr.forEach((item, idx) => {
            const key = keyArr[idx]
            obj[key] = item
        })

        return [slug, obj]
    }))
}

export const objectArray = (_, header, rowArr) => {
    return rowArr.map(cellArr => {
        const obj = {}

        cellArr.forEach((cell, idx) => {
            const key = header[idx]
            obj[key] = cell
        })

        return obj
    })
}

export const md = (txtArr, ...attrArr) => {
    const rawStr = (attrArr.map((attr, i) => txtArr[i] + attr).join("") + txtArr.at(-1)) || txtArr.raw[0]

    const mdStr = rawStr?.replaceAll(/\n[\s\n]+/g, "\n").replaceAll(/[\s\n]+\n$/g, "\n")

    console.log(mdStr)

    const htmlStr = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(mdStr)

    const ret = toHtml(toHast(htmlStr))

    return ret
}

export const mdTbl = (txtArr, ...attrArr) => {
    const rawStr = (attrArr.map((attr, i) => txtArr[i] + attr).join("") + txtArr.at(-1)) || txtArr.raw[0]

    const mdTxt = rawStr?.replaceAll(/\n[\s\n]+/g, "\n").replaceAll(/[\s\n]+\n$/g, "\n")

    const mdast = unified()
        .use(remarkParse)
        .use(remarkGfm)
        .parse(mdTxt)

    const tblAst = mdast.children[0]

    const [headerAst, ...rowAstArr] = (tblAst?.type === "table") ? tblAst?.children : []

    const headerArr = headerAst.children.map(headerAst => headerAst.children[0]?.value)
    const rowArr = rowAstArr.map(rowAst => rowAst.children.map(cell => {
        if (cell.children.length > 1) {
            return cell.children.map(child => child.value).join("")
        } else {
            const child = cell.children[0]

            // 自動リンク対処
            if (child.type === "link") {
                return child.url
            }

            return child.value
        }
    }))

    const ret = rowArr.map(row => Object.fromEntries(row.map((cell, i) => [headerArr[i], cell])))

    return ret
}

export const ulElement = arr => {
    return ulTag`${arr.map(item => liTag`${item}`)}`
}

export const aElement = (...argArr) => {
    const attrObj = {}

    if (argArr.length > 1) {
        const [href, content] = argArr

        Object.assign(attrObj, { href, content })
    } else {
        const arg = argArr[0]

        if (arg instanceof Array) {
            const arr = arg

            const [href, content] = arr

            Object.assign(attrObj, { href, content })
        } else if (typeof arg === "object") {
            const obj = arg

            Object.assign(attrObj, obj)
        }
    }

    const { href, content } = attrObj

    if (href?.match(/^https?:/)) {
        const target = "_blank"

        return aTag`${{ href, target }}${content}`
    }

    return aTag`${{ href }}${content}`
}

export const comment = txt => `<!-- ${txt} -->`
