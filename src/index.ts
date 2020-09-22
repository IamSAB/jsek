import { addPageTemplate } from "@factor/api"
import { addLayout } from "widgets"

addPageTemplate({
  slug: "seite",
  component: (): Promise<any> => import("./templates/seite.vue"),
})

addLayout({
  name: "Sections",
  layout: "sections",
  component: (): Promise<any> => import("./widget/layouts/sections.vue"),
})

// addPageTemplate({
//   slug: "stufe",
//   component: (): Promise<any> => import("./templates/stufe.vue"),
// })

// addPageTemplate({
//   slug: "aktuell",
//   component: (): Promise<any> => import("./templates/aktuell.vue"),
// })

// addPageTemplate({
//   slug: "ueber",
//   component: (): Promise<any> => import("./templates/ueber.vue"),
// })

// addPageTemplate({
//   slug: "lager",
//   component: (): Promise<any> => import("./templates/lager.vue"),
// })

// addPageTemplate({
//   slug: "form",
//   component: (): Promise<any> => import("./templates/form.vue"),
// })