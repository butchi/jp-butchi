// MatraMagica flavored MatraScript Grammar
// ==========================
//
// Accepts expressions like "p`Hello, world!`" and computes their value.

Package
  = _ block:Block _ { return block }


Block
  = TagBody
  / Tag
  / SetRule

Tag
  = _ tag:Slug _ {
    return { tag }
  }

TagBody
  = _ tag:Slug _ body:Body {
    return { tag, body }
  }
  / _ tag:Slug "[" setRuleArr:(SetRule+) "]" _ body:Body {
    return { tag, prop: Object.fromEntries(setRuleArr), body }
  }
  / _ tag:Slug "#" id:Slug _ body:Body {
    return { tag, prop: { id }, body }
  }
  / _ tag:Slug classList:("." Slug)+ _ body: Body {
    return { tag, prop: { class: classList }, body }
  }

Body
  = "{" @Expression "}"
  / "{" _ @String _ "}"
  / "`" @Template "`"

Expression
  = Array
  / Block

Array
  = arr:(Block _)+ {
    return arr.map(item => item[0])
  }

SetRule
  = _ key:Slug _ "=" _ val:String {
    return [key, val]
  }

Template
  = Slug

Slug
  = str:[^\'\"\(\)\[\]\{\}\=\|\#\.\`\n]+ {
    return str.join("").trim()
  }

String
  = "\"" str:[^\"]+ "\"" {
    return str.join("")
  }

_ "whitespace"
  = [ \t\n\r]*