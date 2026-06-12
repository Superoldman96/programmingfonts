const data = require('./fonts.json')
const keys = new Set(Object.keys(data))
let ok = true

for (const [alias, font] of Object.entries(data)) {
  if (!font.group) continue
  if (!keys.has(font.group)) {
    console.error(`${alias}: group "${font.group}" does not match any font key`)
    ok = false
  } else if (data[font.group].group !== font.group) {
    console.error(`${alias}: group "${font.group}" is not a primary (its group field must equal its own key)`)
    ok = false
  }
}

if (!ok) process.exit(1)
