import { addFilter } from "@factor/api"
const path = require("path")

addFilter({
  key: "srcAlias",
  hook: "webpack-aliases",
  callback: (aliases, {cwd}) => {
    console.log(__dirname)
    aliases["~"] = path.resolve(__dirname, "./")
    aliases.components = path.resolve(__dirname, "./components")
    return aliases
  }
})
