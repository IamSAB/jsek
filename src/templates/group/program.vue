<template>
  <svg-section
    id="program"
    bg="var(--color-lightgray-darker)"
    bg-before="var(--color-bg)"
    top-svg="triangle"
  >
    <div class="container mx-auto px-5 py-10 text-center">
      <heading above="Semester" :title="title" below="Programm" :heading="2" />
      <markdown :content="description" />
      <div id="nächstens" class="mt-6">
        <heading class="my-4" title="Nächstens" :heading="3" />
        <div class="border-2 border-gray-500 w-16 mt-1 mx-auto" />
        <div class="grid grid-cols-2 gap-8 mt-8">
          <div id="next" class="bg-blue-600 text-gray-100 rounded overflow-hidden p-8">
            <div
              class="uppercase font-extrabold tracking-wider text-2xl text-blue-900"
            >{{ program.next.start.format("DD MMM") }}</div>
            <div class="w-1/4 border-t-2 border-blue-700 my-2 mx-auto" />
            <h3 class="text-4xl">{{ program.next.__title }}</h3>
            <div
              class="text-gray-400 font-semibold"
            >{{ getDuration(program.next.start, program.next.end) }}</div>
            <div class="w-1/4 border-t-2 border-blue-700 my-2 mx-auto" />
            <div v-html="program.next.description" />
          </div>
          <div id="upcoming">
            <div class="flex" v-for="event in program.upcoming" :key="event.__key">
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
          <heading class="my-4" title="Vorüber" :heading="3" />
          <div class="border-2 border-gray-500 w-16 mt-1 mx-auto" />
          <div class="col-span-2 text-center mt-4">
            <div class="flex flex-wrap justify-center items-center">
              <div class="mx-2" v-for="event in program.past" :key="event.__key">
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
</template>
<script lang="ts">
import dayjs, { Dayjs } from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import "dayjs/locale/de-ch";
import svgSection from "components/svg-section.vue";
import heading from "components/heading.vue";
import markdown from "components/markdown.vue";

const DATE_FORMAT = "DD.MM.YY";
const TIME_FORMAT = "HH:mm";
const DATETIME_FORMAT = `${DATE_FORMAT} ${TIME_FORMAT}`;
const MONTH_YEAR_FORMAT = "MMM, YYYY";

dayjs.extend(customParseFormat);
dayjs.locale("de-ch");

export default {
  components: {
    svgSection,
    heading,
    markdown
  },
  props: {
    title: {
      type: String,
      default: () => ""
    },
    description: {
      type: String,
      default: () => ""
    },
    events: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    program() {
      const items = this.events.map(event => {
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
    }
  },
  methods: {
    getDuration(start: Dayjs, end: Dayjs) {
      if (end.diff(start, "hour") > 24) {
        return `${start.format(DATETIME_FORMAT)} - ${end.format(
          DATETIME_FORMAT
        )}`;
      } else {
        return `${start.format(DATETIME_FORMAT)} - ${end.format(TIME_FORMAT)}`;
      }
    }
  }
};
</script>