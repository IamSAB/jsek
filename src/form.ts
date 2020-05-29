import { requestPostSave } from "@factor/post/request"
import { FactorPostState } from "@factor/post/types"
import { renderMarkdown } from "@factor/api/markdown";

const capitalize = (string: string) => {
  return string[0].toUpperCase() + string.slice(1)
}

const renderers = {
  editor: (string: string) => {
    return renderMarkdown(string)
  },
  tags: (tags: Array<string>) => {
    return tags.map(tag => capitalize(tag)).join(" | ")
  },
  sortable: (value, field: any) => {
    const render = []
    value.forEach((values, i) => {
      render.push(`<p>${values.__title}<p>`)
      renderTable(field.settings[0], values)
    })
    return render.join("")
  }
}

const renderRow = (field, value) => {
  return `<td style="width:10rem; padding:1rem; vertical-align:top; border: 1px solid #CBD5E0;"><b>${field.label}</b><br><i style="font-size:.8rem; color:#A0AEC0;">${field.description}</i></td><td style="vertical-align:top; padding: 1rem; border: 1px solid #ddd;">${field.input in renderers ? renderers[field.input](value, field) : value}</td>`
}

const renderRows = (fields, values) => {
  const rows = []
  fields.forEach((field, i) => {
    rows.push(`<tr>${renderRow(field, values[field._id])}</tr>`)
  });
  return rows.join("")
}

export const renderTable = (fields: any, values: any) => {
  return `<table style="border-collapse:collapse; color:#1A202C;">${renderRows(fields, values)}</table>`
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