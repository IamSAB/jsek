import { requestPostSave } from "@factor/post/request"
import { FactorPostState } from "@factor/post/types"
import { renderMarkdown } from "@factor/api/markdown";
import Vue from "vue"

const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

const renderField = (value, field, h) => {
  if (field.input in renderers) {
    value = renderers[field.input](value, field, h)
  }
  console.log(value)

  return value
}

const renderers = {
  editor: (string: string) => {
    return renderMarkdown(string)
  },
  tags: (tags: Array<string>) => {
    return tags.map(tag => capitalize(tag)).join(" | ")
  },
  sortable: (items, field, h) => {
    let value
    return h("div", items.map(values=> {
      return h("div", [
        h("b", values.__title),
        h("div", { style: { 'font-size': '0.8em', 'margin': '0.2em 0' } }, field.settings.map(setting => {
          value = setting._id in values ? values[setting._id] : "-";
          return h("div", [
            h("b", setting.label),
            h("br"),
            h("span", value)
          ])
        }))
      ])
    }))
  }
}

export const renderTable = (values, fields, h) => {
  const tdStyle = {
    width: "10rem",
    padding: "1rem",
    "vertical-align": "top",
    border: "1px solid #CBD5E0"
  }
  let value
  return h("table", {
    style: {
      'border-collapse': 'collapse',
      color: '#1A202C'
    }
  }, fields.map((field, i) => {
    value = values[field._id]
    return h("tr", [
      h("td", { style: tdStyle }, [
        h("b", field.label),
        h("br"),
        h("em", {
          style: {
            "font-size": ".8rem",
            color: "#A0AEC0"
          }
        }, field.description)
      ]),
      h("td", { style: tdStyle }, renderField(value, field, h))
    ])
  }))
}

export const renderMail = (values, fields, h) => {
  return renderTable(values, fields, h)
}

export const saveForm = async (fields, values): Promise<FactorPostState> => {
  const post = {
    settings: {
      fields,
      values
    }
  }
  return await requestPostSave({ post, postType: "contact-form" })
}