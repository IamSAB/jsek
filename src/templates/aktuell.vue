<template>
  <main>
    <header id="stufe" class="mx-auto w-2/3 text-center mt-12 mb-4">
      <heading above="Jungschar Ebnat-Kappel" :title="post.title" :below="post.settings.synopsis" />
      <markdown :content="post.content" />
    </header>
    <svg-section
      id="featured"
      bg-before="var(--color-bg)"
      top-svg="invertedTriangle"
      :svg-absolute="true"
    >
      <photo :source="post.avatar" />
    </svg-section>
    <section id="aktuell">
      <div class="container mx-auto px-5 py-8 text-center">
        <heading above="Aktuell" title="Informationen" :heading="2" />
        <div class="flex flex-wrap items-center justify-center mt-6">
          <div
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
            v-for="info in settings.infos"
            :key="info.__key"
          >
            <markdown :content="info.content" />
          </div>
        </div>
      </div>
    </section>
    <svg-section
      id="links"
      bg="var(--color-lightgray-darker)"
      bg-before="var(--color-bg)"
      top-svg="obliqueTriangleLeft"
      bottom-svg-transform="rotate(180deg)"
    >
      <div class="text-center">
        <heading above="Kürzlich" title="Blog" :heading="2" />
        <p>Insgesamt {{ blogIndex.meta.total}} Artikel.</p>
        <factor-link :path="setting('blog.indexRoute')" btn="primary">Zum Blog</factor-link>
      </div>
      <div v-if="blogIndex">
        <div class="flex flex-wrap items-center justify-center mt-6">
          <div
            class="w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mt-6 p-3"
            v-for="post in blogIndex.posts"
            :key="post._id"
          >
            <div class="shadow-xs">
              <photo :source="post.avatar" />
              <div class="text-center p-2">
                <heading
                  :title="post.title"
                  :below="post.synopsis"
                  :heading="3"
                  class="my-2"
                  :divider="false"
                />
                <factor-link :path="postLink(post._id)" btn="default">Lesen</factor-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <factor-spinner v-else />
    </svg-section>
    <section>
      <heading above="Wichtiges" title="Überblick" :heading="2" />
      <div class="flex flex-wrap items-center justify-center mt-6">
        <div
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
          v-for="link in settings.links"
          :key="link.__key"
        >
          <markdown :content="link.content" />
          <factor-link text="Mehr" :path="link.link" />
        </div>
      </div>
    </section>
    <section id="bilder" class="container mx-auto px-5 py-8">
      <photo-grid :photos="post.images" />
    </section>
  </main>
</template>

<script lang="ts">
import svgSection from "../components/svg-section.vue";
import markdown from "components/markdown.vue";
import photo from "components/photo.vue";
import photoGrid from "components/photo-grid.vue";
import heading from "components/heading.vue";
import {
  setting,
  stored,
  titleTag,
  descriptionTag,
  shareImage,
  requestPostIndex,
  postLink
} from "@factor/api";
import {
  factorAvatar,
  factorLightbox,
  factorBtn,
  factorSpinner,
  factorLink
} from "@factor/ui";
import { PostStatus } from "@factor/post/types"

export default {
  components: {
    factorAvatar,
    factorLightbox,
    svgSection,
    photo,
    markdown,
    photoGrid,
    heading,
    factorBtn,
    factorSpinner,
    factorLink
  },
  data() {
    return {
      selectedImage: 0,
      galleryVisible: false,
      content: ""
    };
  },
  metaInfo(this: any) {
    return {
      title: titleTag(this.post._id),
      description: descriptionTag(this.post._id),
      image: shareImage(this.post._id)
    };
  },
  async mounted() {
    await requestPostIndex({
      postType: "blog",
      status: PostStatus.Published,
      sort: "-date",
      limit: 3
    });
  },
  computed: {
    blogIndex() {
      return stored("blog");
    },
    post() {
      return stored("permalink") || {};
    },
    settings(this: any) {
      return this.post.settings || {};
    }
  },
  methods: {
    setting,
    postLink
  },
  templateSettings() {
    return [
      {
        _id: "infos",
        input: "sortable",
        label: "Infos",
        description: "Infos zur Stufe",
        _default: [
          { __title: "Nomi 1" },
          { __title: "Nomi 2" },
          { __title: "Nomi 3" }
        ],
        settings: [
          {
            _id: "content",
            input: "textarea",
            label: "Info",
            description: "Kurze Info bzgl. Ausrüstung, Wetter & Kosten",
            _default: "Zusätzliche Infos zum Nachmittag ..."
          }
        ]
      },
      {
        _id: "links",
        input: "sortable",
        label: "Links",
        description: "",
        _default: [
          {
            __title: "Über uns",
            content: "Erfahre mehr über unsere Jungschar",
            link: "/ueber-uns"
          },
          {
            __title: "Elternbrief",
            content: "Alle Infos auf einen Blick",
            link: "/elternbrief"
          },
          {
            __title: "Teilnehmerinfo",
            content: "Melde deine Familie an",
            link: "/teilnehmerinfo"
          }
        ],
        settings: [
          {
            _id: "content",
            input: "textarea",
            label: "Teaser",
            description: "Beschreibung zum Link",
            _default: "Zusätzliche Infos zum Nachmittag ..."
          },
          {
            _id: "link",
            input: "text",
            label: "Link",
            placeholde: "/..."
          }
        ]
      }
    ];
  }
};
</script>
