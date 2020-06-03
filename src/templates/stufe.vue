<template>
  <main>
    <header id="stufe" class="text-center">
      <div class="uppercase font-semibold tracking-wider text-lg text-gray-700 mt-2">Stufe</div>
      <h1 class="text-5xl -mt-1">{{ post.title }}</h1>
      <div class="font-semibold text-gray-600 mt-1">{{ post.settings.age }}</div>
      <div class="border-2 border-gray-500 w-16 mx-auto my-4" />
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
    <svg-section id="events" bg="var(--color-lightgray-darker)" bg-before="var(--color-bg)" top-svg="triangle">
      <div class="container mx-auto px-5 py-10 text-center">
        <div class="uppercase font-semibold tracking-wider text-sm text-gray-600">Semesterprogramm</div>
        <h2 class="text-4xl -mt-1">{{ post.settings.programTitle }}</h2>
        <div v-if="post.settings.programDescription" v-html="post.settings.programDescription" />
        <div id="nächstens" class="mt-6">
          <h3 class="text-2xl">Nächstens</h3>
          <div class="border-2 border-gray-500 w-16 mt-1 mx-auto" />
          <div class="grid grid-cols-2 gap-8 mt-8">
            <div id="next" class="bg-blue-600 text-gray-100 rounded overflow-hidden p-8">
              <div
                class="uppercase font-extrabold tracking-wider text-2xl text-blue-900"
              >{{ events.next.start.format("DD MMM") }}</div>
              <div class="w-1/4 border-t-2 border-blue-700 my-2 mx-auto" />
              <h3 class="text-4xl">{{ events.next.__title }}</h3>
              <div
                class="text-gray-400 font-semibold"
              >{{ getDuration(events.next.start, events.next.end) }}</div>
              <div class="w-1/4 border-t-2 border-blue-700 my-2 mx-auto" />
              <div v-html="events.next.description" />
            </div>
            <div id="upcoming">
              <div class="flex" v-for="event in events.upcoming" :key="event.__key">
                <div
                  class="flex-none flex flex-col items-center justify-center bg-gray-600 h-16 w-16 text-gray-100 uppercase rounded-sm overflow-hidden"
                >
                  <div class="text-xl font-extrabold tracking-widest">{{ event.start.format("DD") }}</div>
                  <div class="text-md tracking-wider -mt-1">{{ event.start.format("MMM") }}</div>
                </div>
                <div class="ml-4 text-left">
                  <div class="w-12 border-t-2 border-gray-500" />
                  <h4 class="text-lg text-gray-800 font-bold mt-1">{{ event.__title }}</h4>
                  <div
                    class="text-sm text-gray-600 font-semibold -mt-1"
                  >{{ getDuration(event.start, event.end) }}</div>
                  <div v-html="event.description" />
                </div>
              </div>
            </div>
          </div>
          <div class="mt-6">
            <h3 class="text-2xl">Vorüber</h3>
            <div class="border-2 border-gray-500 w-16 mt-1 mx-auto" />
            <div class="col-span-2 text-center mt-4">
              <div class="flex flex-wrap justify-center items-center">
                <div class="mx-2" v-for="event in events.past" :key="event.__key">
                  <div
                    class="uppercase font-semibold text-sm tracking-wider text-gray-600"
                  >{{ event.start.format("DD.MM.YY") }}</div>
                  <h4 class="text-lg text-gray-800 font-bold -mt-1">{{ event.__title }}</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </svg-section>
    <section id="bilder" class="container mx-auto px-5 py-8">
      <div v-if="images.length > 0" class="flex flex-wrap justify-center">
        <div
          class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5 p-3"
          v-for="(image, i) in images"
          :key="i"
        >
          <div class="rounded-lg overflow-hidden">
            <img
              class="object-cover w-full h-64 cursor-pointer"
              @click="openGallery(i)"
              :src="image.url"
            />
          </div>
        </div>
        <factor-lightbox :visible.sync="galleryVisible" :images="images" :selected="selectedImage" />
      </div>
      <p v-else class="text-lg font-semibold text-center">Keine Bilder vorhanden.</p>
    </section>
    <svg-section id="team" bg="var(--color-lightgray-darker)" bg-before="var(--color-bg)" top-svg="obliqueTriangleLeft" bottom-svg-transform="rotate(180deg)">
      <div class="container mx-auto px-5 py-8 text-center">
        <h2 class="text-4xl">Team</h2>
        <div class="border-2 border-gray-500 w-16 mt-1 mx-auto" />
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
    <section id="form">
      <div class="container mx-auto px-5 py-8 text-center my-16">
        <form-stufe
          :fields="form.fields"
          :confirmation="form.confirmation"
          :notification="form.notification"
        ></form-stufe>
      </div>
    </section>
  </main>
</template>

<script lang="ts">
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de-ch";
import formStufe from "../components/form.vue";
import svgSection from "../components/svg-section.vue";
import { factorPostEdit } from "@factor/post";
import {
  setting,
  stored,
  titleTag,
  descriptionTag,
  shareImage
} from "@factor/api";
import { renderMarkdown } from "@factor/api/markdown";
import { factorAvatar, factorLightbox } from "@factor/ui";

dayjs.extend(customParseFormat);
dayjs.locale("de-ch");

const DATE_FORMAT = "DD.MM.YY";
const TIME_FORMAT = "HH:mm";
const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
const MONTH_YEAR_FORMAT = "MMM, YYYY";

export default {
  components: {
    factorPostEdit,
    factorAvatar,
    factorLightbox,
    formStufe,
    svgSection
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
    form() {
      return {
        fields: [
          {
            _id: "name",
            input: "text",
            label: "Name",
            description: "Voller Name oder Familienname",
            required: true
          },
          {
            _id: "email",
            input: "email",
            label: "Email",
            description:
              "Erhälst eine Bestätigung deiner Anfrage an diese Adresse.",
            required: true
          },
          {
            _id: "nachricht",
            input: "editor",
            label: "Nachricht",
            description: "Was liegt dir auf dem Herzen?",
            required: true
          }
        ],
        confirmation: {
          to: values => values.email,
          title: values => `Deine Anfrage via Formular auf ${document.title}`,
          subject: values =>
            `Bestätigung deiner Nachricht an Stufe ${this.post.title} als ${values.name}`
        },
        notification: {
          to: () => this.settings.email,
          title: values => `Anfrage via Formular auf ${document.title}`,
          subject: values =>
            `Anfrage an Stufe ${this.title} auf ${document.title} von ${values.name} / ${values.email}`
        }
      };
    },
    images() {
      const images = [];
      this.post.images.map(hash => {
        images.push(this.getAttachement(hash));
      });
      return images;
    },
    events() {
      const items = this.post.settings.events.map(event => {
        const cloned = { ...event };
        cloned.start = dayjs(event.start, DATETIME_FORMAT);
        cloned.end = dayjs(event.end, DATETIME_FORMAT);
        return cloned;
      });
      items.sort((a, b) => {
        return a.start.diff(b.start) > 0;
      });
      let events = {
        upcoming: [],
        next: undefined,
        past: []
      };
      const now = dayjs();
      let setNextEvent = false;
      items.forEach(item => {
        if (item.start.diff(now) > 0) {
          if (setNextEvent === true) {
            events.upcoming.push(item);
          } else {
            events.next = item;
            setNextEvent = true;
          }
        } else {
          events.past.push(item);
        }
      });

      return events;
    },
    url() {
      return window.location.href;
    },
    title() {
      return document.title;
    }
  },
  methods: {
    setting,
    renderMarkdown,
    getAttachement(hash: string) {
      return stored(hash) || "";
    },
    getDuration(start: Dayjs, end: Dayjs) {
      if (end.diff(start, "hour") > 24) {
        return `${start.format(DATETIME_FORMAT)} - ${end.format(
          DATETIME_FORMAT
        )}`;
      } else {
        return `${start.format(DATETIME_FORMAT)} - ${end.format(TIME_FORMAT)}`;
      }
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
            description: `Format -> ${DATETIME_FORMAT}`,
            _default: "01.01.20 13:30"
          },
          {
            input: "text",
            label: "Ende",
            _id: "end",
            description: `Format -> ${DATETIME_FORMAT}`,
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
            description: `Format -> ${MONTH_YEAR_FORMAT}`,
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
