<template>
  <main>
    <heading class="text-center mt-5" above="Über uns" :title="post.title" :below="post.synopsis" />
    <svg-section id="about" top-svg="rightTriangleRight" bg-before="var(--color-bg)" bg="var(--color-lightgray)">
      <div class="container mx-auto">
        <div class="markdown" v-formatted-text="renderMarkdown(post.content)" />
      </div>
    </svg-section>
    <section id="gruppen">
      <heading class="text-center mt-5" above="Gemeinsam etwas unternehmen" title="Gruppen" :heading="2"/>
      <div class="container">
        <div class="flex justify-center">
          <div class="w-1/3 px-3 text-center" v-for="group in settings.groups" :key="group.__key">
            <div class="font-bold uppercase tracking-wider text-gray-700 text-sm">{{group.__title}}</div>
            <h3 class="font-bold text-xl -mt-2">{{ group.title }}</h3>
            <photo :source="group.images" />
            <div class="markdown" v-formatted-text="renderMarkdown(group.content)" />
            <factor-link :path="group.permalink">Mehr</factor-link>
          </div>
        </div>
      </div>
    </section>
    <svg-section id="anlässe" top-svg="triangle" bg-before="var(--color-bg)" bg="var(--color-lightgray-darker)">
      <heading class="text-center mt-5" above="Was gibt's zu erleben?" title="Anlässe" :heading="2"/>
      <div class="container">
        <nav class="flex justify-center">
          <ul class="tags">
            <li v-for="tag in tags" :key="tag">
              <a @click="toggle(tag)" :class="{active: selected.includes(tag)}">{{ tag }}</a>
            </li>
          </ul>
        </nav>
        <div class="flex justify-center">
          <div class="w-1/2" v-for="activity in activities">
            {{ activity.__title }}
          </div>
        </div>
      </div>
    </svg-section>
    <section id="zusammenarbeit">
      <heading class="text-center mt-5" above="Gemeinsam stark!" title="Zusammenarbeit" :heading="2"/>
      <div class="container">

      </div>
    </section>
  </main>
</template>

<script lang="ts">
import { setting, stored } from "@factor/api";
import heading from "../components/heading.vue";
import svgSection from "../components/svg-section.vue";
import { renderMarkdown } from "@factor/api/markdown";
import { factorLink } from "@factor/ui"
import photo from "../components/photo.vue"

export default {
  components: {
    heading,
    svgSection,
    factorLink,
    photo
  },
  data () {
    return {
      selected: []
    }
  },
  computed: {
    post() {
      return stored("permalink") || {};
    },
    settings() {
      return this.post.settings || {};
    },
    activities() {
      const activities = this.settings.activities
      if (this.selected.length) {
        return activities.filter((activity: Record<string, any>) => {
          return activity.tags.filter(tag => this.selected.includes(tag)).length
        })
      }
      else {
        return activities
      }
    },
    tags() {
      const all = []
      this.settings.activities.map(activity => all.push(activity.tags))
      const tags = [...new Set([].concat(...all))]
      tags.sort((a, b) => a.localeCompare(b))
      return tags
    }
  },
  methods: { 
    setting, 
    renderMarkdown,
    toggle (this: any, tag: string) {
      const index = this.selected.indexOf(tag)
      if (index >= 0) {
        this.selected.splice(index, 1)
      }
      else {
        this.selected.push(tag)
      }
    }
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
  @apply flex flex-wrap
}
ul.tags {
  a {
    @apply border-solid border rounded-sm border-gray-800 m-1 px-2 py-1 cursor-pointer uppercase text-sm text-gray-700
  }
  a.active {
    @apply border-blue-700 text-white bg-blue-600
  }
}
</style>
