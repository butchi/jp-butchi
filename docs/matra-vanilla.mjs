import tagNameArr from "./tag-name-array.mjs"

const htmlElement = tagName => {
    return (txtArr, ...attrArr) => {
        const childArr = []
        const propObj = {
        }

        childArr.push(...txtArr)

        attrArr.map(attr => {
            if (typeof attr === "string") {
                const txt = attr

                childArr.push(txt)
            } else if (attr instanceof Array) {
                const arr = attr

                childArr.push(...arr)
            } else if (typeof attr === "object") {
                const obj = attr

                Object.assign(propObj, obj)
            }
        })

        const tagTxt = tagName
        const propTxt = Object.entries(propObj).map(([key, val]) => ` ${key}="${val}"`).join("")
        const contentTxt = childArr.filter(child => child !== "").join("\n")

        const htmlTxt = `<${tagTxt}${propTxt}>${contentTxt}</${tagTxt}>`

        return htmlTxt
    }
}

globalThis.htmlElement = htmlElement

tagNameArr.forEach(tagName => {
    globalThis[tagName + "Tag"] = htmlElement(tagName)
})