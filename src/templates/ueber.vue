<template>
  <main>
    <heading class="text-center mt-5" above="Über uns" :title="post.title" :below="post.synopsis" />
      
    <svg-section top-svg="rightTriangleLeft" :svg-absolute="true" bg-before="var(--color-bg)" bg-after="var(--color-lightgray)">
      <photo :source="post.images[0]" object="cover" class="vh-1/2" />
    </svg-section>
    <svg-section
      id="about"
      bottom-svg="rightTriangleRight"
      bg-before="var(--color-bg)"
      bg="var(--color-lightgray)"
    >
      <div class="container mx-auto">
        <div class="markdown" v-formatted-text="renderMarkdown(post.content)" />
      </div>
    </svg-section>
    <section id="gruppen">
      <heading class="text-center mt-5" above="Gemeinsam" title="Gruppen" :heading="2" />
      <div class="container mb-10">
        <div class="flex justify-center">
          <div class="w-1/3 px-3 text-center" v-for="group in settings.groups" :key="group.__key">
            <heading class="mt-2 mb-4" :above="group.__title" :title="group.title" :heading="3" :divider="false" />
            <photo :source="group.images" object="contain" class="h-32" />
            <div class="markdown mt-4" v-formatted-text="renderMarkdown(group.content)" />
            <factor-link :path="group.permalink">Mehr</factor-link>
          </div>
        </div>
      </div>
    </section>
    <activities :data="settings.activities" />
    <section id="zusammenarbeit">
      <heading class="text-center mt-10" above="Vernetzt" title="Zusammenarbeit" :heading="2" />
      <div class="container">
        <div class="md:col-count-2 lg:col-count-3 col-gap-lg col-rule col-rule-solid mt-4">
          <div
            class="mb-4 text-center mx-3 mb-5 pt-5 border-t border-solid border-gray-300 col-break-none"
            v-for="collaborator in settings.collaboration"
            :key="collaborator.__key"
          >
            <div></div>
            <photo :source="collaborator.logo" object="contain" class="h-32 mb-2" />
            <heading :above="collaborator.__title" :title="collaborator.title" :heading="3" />
            <div class="markdown" v-formatted-text="renderMarkdown(collaborator.content)" />
          </div>
        </div>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { setting, stored } from "@factor/api";
import heading from "../components/heading.vue";
import svgSection from "../components/svg-section.vue";
import { renderMarkdown } from "@factor/api/markdown";
import { factorLink } from "@factor/ui";
import photo from "../components/photo.vue";
import activities from "./about/activities.vue";

export default {
  components: {
    heading,
    svgSection,
    factorLink,
    photo,
    activities
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    post() {
      return stored("permalink") || {};
    },
    settings() {
      return this.post.settings || {};
    }
  },
  methods: {
    setting,
    renderMarkdown
  },
  templateSettings() {
    return [
      {
        _id: "collaboration",
        input: "sortable",
        label: "Zusammenarbeit",
        description: "",
        _default: [{ __title: "Organisation" }, { __title: "Verein" }],
        settings: [
          {
            _id: "title",
            input: "text",
            label: "Name",
            description: "Offizieller Name"
          },
          {
            _id: "content",
            input: "editor",
            label: "Anmerkung",
            description: "Inhalt des Abschnittes",
            _default: "Lorem ipsum ..."
          },
          {
            _id: "link",
            input: "text",
            label: "Webseite",
            description: "Link zur Webseite",
            placeholder: "https://www.domain.ch"
          },
          {
            _id: "logo",
            input: "image-upload",
            label: "Logo"
          }
        ]
      },
      {
        _id: "groups",
        input: "sortable",
        label: "Gruppen",
        description: "",
        _default: [{ __title: "Gruppe 1" }, { __title: "Gruppe 2" }],
        settings: [
          {
            _id: "title",
            input: "text",
            label: "Titel"
          },
          {
            _id: "age",
            input: "text",
            label: "Alter",
            description: "Alter / Klasse der Zielgruppe"
          },
          {
            _id: "content",
            input: "editor",
            label: "Anmerkung",
            description: "Kurze Beschreibung zur Gruppe",
            _default: "Lorem ipsum ..."
          },
          {
            _id: "permalink",
            input: "text",
            label: "Permalink",
            description: "Link zur Gruppe",
            placeholder: "/gruppe1"
          },
          {
            _id: "logo",
            input: "image-upload",
            label: "Logo"
          }
        ]
      },
      {
        _id: "activities",
        input: "sortable",
        label: "Anlässe",
        description: "",
        _default: [{ __title: "Anlass 1" }, { __title: "Anlass 1" }],
        settings: [
          {
            _id: "name",
            input: "text",
            label: "Name",
            description: "Name der Aktivität"
          },
          {
            _id: "content",
            input: "editor",
            label: "Anmerkung",
            description: "Kurze Beschreibung des Anlasses",
            _default: "Lorem ipsum ..."
          },
          {
            _id: "images",
            input: "image-upload",
            label: "Bilder",
            description:
              "Erstes Bild als Teaser. Alle Bilder in einer Gallerie mit Lightbox aufrufbar."
          },
          {
            _id: "tags",
            input: "tags",
            label: "Tags",
            description:
              "Entsprechend Stufe, Jahreszeit und Typ. Verwendung zum Filtern.",
            _default: ["ameisli", "zeltlager"]
          }
        ]
      }
    ];
  }
};
</script>

<style lang="postcss">
ul.tags {
  @apply flex flex-wrap;
}
ul.tags {
  a {
    @apply border-solid border rounded-sm border-gray-800 m-1 px-2 py-1 cursor-pointer uppercase text-sm text-gray-700;
  }
  a.active {
    @apply border-blue-700 text-white bg-blue-600;
  }
}
</style>
