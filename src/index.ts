/**
 * This is your app main file
 *
 * Use it to do anything you want in your Factor app
 */

import { addPageTemplate } from "@factor/api"

addPageTemplate({
  slug: "stufe",
  component: (): Promise<any> => import("./stufe.vue"),
})

addPageTemplate({
  slug: "aktuell",
  component: (): Promise<any> => import("./aktuell.vue"),
})