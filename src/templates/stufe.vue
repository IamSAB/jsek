<template>
  <main>
    <header id="stufe" class="text-center">
      <heading above="Gruppe" :title="post.title" :below="post.settings.age" />
      <p class="text-xl font-bold">&laquo; {{ post.synopsis }} &raquo;</p>
    </header>
    <svg-section id="featured" bg-before="var(--color-bg)" top-svg="invertedTriangle" :svg-absolute="true">
      <div class="relative">
        <img class="vh-1/2 w-full object-cover" :src="getAttachement(post.avatar).url" />
        <div class="absolute inset-0 flex items-center justify-center h-full">
          <div v-html="post.settings.logo" />
        </div>
      </div>
    </svg-section>
    <section class="flex justify-center">
      <div class="w-2/3 text-center mb-16" v-formatted-text="renderMarkdown(post.content)" />
    </section>
    <program :title="post.settings.programTitle" :description="post.settings.programDescription" :events="settings.events" />
    <section id="bilder" class="container mx-auto px-5 py-8">
      <photo-grid :photos="post.images" />
    </section>
    <svg-section id="team" bg="var(--color-lightgray-darker)" bg-before="var(--color-bg)" top-svg="obliqueTriangleLeft" bottom-svg-transform="rotate(180deg)">
      <div class="container mx-auto px-5 py-8 text-center">
        <heading above="Leiter" title="Team" :heading="2"/>
        <div class="flex flex-wrap items-center justify-center mt-6">
          <div
            class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 mt-6"
            v-for="leader in settings.team"
            :key="leader.__key"
          >
            <factor-avatar
              class="mx-auto"
              style="width: 128px;"
              :url="leader.image ? getAttachement(leader.image[0]).url : ''"
            />
            <div class="text-gray-600 mt-3">{{ leader.__title }}</div>
            <h3 class="text-3xl -mt-2">{{ leader.jsname }}</h3>
            <div class="text-sm text-gray-500 mt-1">dabei seit {{ leader.since }}</div>
            <div class="flex flex-wrap justify-center">
              <div
                class="uppercase font-semibold text-xs tracking-wider mx-1"
                v-for="role in leader.roles"
                :key="role"
              >{{ role }}</div>
            </div>
          </div>
        </div>
      </div>
    </svg-section>
    <group-form :email="settings.email"/>
  </main>
</template>

<script lang="ts">
import svgSection from "../components/svg-section.vue";
import program from "./group/program.vue"
import groupForm from "./group/form.vue"
import photoGrid from "components/photo-grid.vue"
import heading from "components/heading.vue"
import {
  setting,
  stored,
  titleTag,
  descriptionTag,
  shareImage
} from "@factor/api";
import { renderMarkdown } from "@factor/api/markdown";
import { factorAvatar, factorLightbox } from "@factor/ui";

export default {
  components: {
    factorAvatar,
    factorLightbox,
    svgSection,
    program,
    groupForm,
    photoGrid,
    heading
  },
  data() {
    return {
      selectedImage: 0,
      galleryVisible: false,
      content: ""
    };
  },
  metaInfo() {
    return {
      title: titleTag(this.post._id),
      description: descriptionTag(this.post._id),
      image: shareImage(this.post._id)
    };
  },
  computed: {
    post() {
      return stored("permalink") || {};
    },
    settings(this: any) {
      return this.post.settings || {};
    },
  },
  methods: {
    setting,
    renderMarkdown,
    getAttachement(hash: string) {
      return stored(hash) || "";
    },
    openGallery(this: any, i: Number) {
      this.selectedImage = i;
      this.galleryVisible = true;
    }
  },
  templateSettings() {
    return [
      {
        _id: "programTitle",
        input: "text",
        label: "Semestertitel",
        description: "Thema / Titel des Semesters"
      },
      {
        _id: "age",
        input: "text",
        label: "Zielgruppe",
        description: "Alter oder Klasse der Teilnehmer"
      },
      {
        _id: "programDescription",
        input: "textarea",
        label: "Semesterprogramm",
        description: "Kurzbeschreibung des Programms des Semesters"
      },
      {
        _id: "flyer",
        input: "image-upload",
        label: "Semesterflyer",
        description: "Offizieler Flyer der Stufe für das Semester"
      },
      {
        _id: "email",
        input: "email",
        label: "Email",
        description: "Email für das Formular und für allgemeinen Kontakt"
      },
      {
        _id: "events",
        input: "sortable",
        label: "Nachmittage",
        description: "Anlässe der Stufe",
        _default: [
          { __title: "Nomi 1" },
          { __title: "Nomi 2" },
          { __title: "Nomi 3" }
        ],
        settings: [
          {
            input: "textarea",
            label: "Info",
            description: "Kurze Info bzgl. Ausrüstung, Wetter & Kosten",
            _id: "description",
            _default: "Zusätzliche Infos zum Nachmittag ..."
          },
          {
            input: "text",
            label: "Start",
            _id: "start",
            _default: "01.01.20 13:30"
          },
          {
            input: "text",
            label: "Ende",
            _id: "end",
            _default: "01.01.20 17:00"
          }
        ]
      },
      {
        _id: "team",
        input: "sortable",
        label: "Team",
        description: "Leiter der Stufe",
        _default: [
          { __title: "Leiter 1" },
          { __title: "Leiter 2" },
          { __title: "Leiter 3" }
        ],
        settings: [
          {
            input: "image-upload",
            label: "Bild",
            _id: "image"
          },
          {
            input: "text",
            label: "Jungscharname",
            _id: "jsname",
            _default: "Totto"
          },
          {
            input: "textarea",
            label: "Beschreibung",
            _id: "description",
            _default: "Ich bin so komisch, weil ..."
          },
          {
            input: "tags",
            label: "Funktionen",
            _id: "roles",
            _default: ["leiter"]
          },
          {
            input: "text",
            label: "Dabei seit",
            _id: "since",
            _default: "Aug, 2016"
          }
        ]
      },
      {
        _id: "logo",
        input: "textarea",
        label: "Logo",
        description: "SVG markup"
      }
    ];
  }
};
</script>

<style>
.vh-1\/3 {
  height: calc(100vh / 3);
}
.vh-1\/2 {
  height: calc(100vh / 2);
}
</style>
