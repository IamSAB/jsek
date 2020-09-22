/**
 * Factor Settings - How settings work in Factor...
 *
 * Your settings files are how you customize themes and plugins.
 * They allow you to set text and images, but also override components, routes and more.
 *
 */
export default {

  tailwind: {
    config: require("./tailwind.config.js"),
    directives: require("./tailwind.css"),
  },

  metatags: {
    defaultTitle: "Jungschar Ebnat-Kappel",
    titleTemplate: "%s - JSEK",
  },

  widget: {
    positions: [
      {
        name: "Navbar",
        position: "navbar",
        layout: "flexgrid"
      },
      {
        name: "Top",
        position: "top",
        layout: "sections"
      },
      {
        name: "Bottom",
        position: "bottom",
        layout: "sections"
      },
      {
        name: "Footer",
        position: "footer",
        layout: "flexgrid"
      }
    ],
    components: {}
  },

  /**
   * Global Theme Settings
   */
  site: {
    menus: {
      socials: [
        {
          _item: "instagram",
          title: "@jungscharek",
          icon: "fab fa-instagram fa-lg",
          url: "https://www.instagram.com/jungscharek"
        },
        {
          _item: "youtube",
          title: "",
          icon: "fab fa-youtube fa-lg",
          url: "https://www.youtube.com/channel/UCbItJ7xE1s0ZGjRMpiAR6nA"
        }
      ],
      navbarLeft: [
        {
          _item: "aktuell",
          path: "/",
          name: "Aktuell",
        },
        {
          _item: "blog",
          path: "/blog",
          name: "Blog",
        },
        {
          _item: "ueberuns",
          path: "/über-uns",
          name: "Über uns",
        },
      ],
      navbarRight: [
        {
          _item: "ameisli",
          path: "/ameisli",
          name: "Ameisli",
        },
        {
          _item: "jungschi",
          path: "/jungschi",
          name: "Jungschi",
        },
        {
          _item: "eagles",
          path: "/eagles",
          name: "Eagles",
        },
      ],
      footer: [
        {
          _item: "impressum",
          path: "/impressum",
          name: "Impressum",
        },
        {
          _item: "contact",
          path: "/contact",
          name: "Contact",
        },
      ]
    },
  },

  blog: {
    limit: 4,
    components: {
      blogIndex: (): Promise<any> => import("./blog/index.vue"),
      blogSingle: (): Promise<any> => import("./blog/single.vue"),
      pagination: (): Promise<any> => import("./blog/pagination.vue")
    }
  }
}