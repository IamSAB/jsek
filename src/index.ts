import { addPageTemplate } from "@factor/api"

addPageTemplate({
  slug: "seite",
  component: (): Promise<any> => import("./templates/seite.vue"),
})

addPageTemplate({
  slug: "stufe",
  component: (): Promise<any> => import("./templates/stufe.vue"),
})

addPageTemplate({
  slug: "aktuell",
  component: (): Promise<any> => import("./templates/aktuell.vue"),
})

addPageTemplate({
  slug: "ueber",
  component: (): Promise<any> => import("./templates/ueber.vue"),
})

addPageTemplate({
  slug: "lager",
  component: (): Promise<any> => import("./templates/lager.vue"),
})

addPageTemplate({
  slug: "fotos",
  component: (): Promise<any> => import("./templates/fotos.vue"),
})