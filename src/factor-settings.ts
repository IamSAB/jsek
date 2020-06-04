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

    /**
     * Global Theme Settings
     */
    site: {
        components: {
            header: (): Promise<any> => import("./header.vue"),
            footer: (): Promise<any> => import("./footer.vue"),
        },
        menus: {
            socials: [
                {
                    _item: "instagram",
                    title: "@jungscharek",
                    icon: "fab fa-instagram",
                    url: "https://www.instagram.com/jungscharek"
                },
                {
                    _item: "youtube",
                    title: "Jungschar Ebnat-Kappel",
                    icon: "fab fa-youtube",
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
        limit: 2,
        components: {
            blogIndex: (): Promise<any> => import("./blog/index.vue"),
            blogSingle: (): Promise<any> => import("./blog/single.vue"),
            featuredImage: (): Promise<any> => import("./blog/widget-featured-image.vue"),
            date: (): Promise<any> => import("./blog/widget-date.vue"),
            title: (): Promise<any> => import("./blog/widget-title.vue"),
            subtitle: (): Promise<any> => import("./blog/widget-subtitle.vue"),
            excerpt: (): Promise<any> => import("./blog/widget-excerpt.vue"),
            pagination: (): Promise<any> => import("./blog/widget-pagination.vue")
        }
    }
}
