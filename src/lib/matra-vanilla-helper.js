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

    if (href.match(/^https?:/)) {
        const target = "_blank"

        return aTag`${{ href, target }}${content}`
    }

    return aTag`${{ href }}${content}`
}

export const comment = txt => `<!-- ${txt} -->`