<template>
  <svg-section
    id="anlässe"
    top-svg="triangle"
    bg-before="var(--color-bg)"
    bg="var(--color-lightgray-darker)"
  >
    <heading class="text-center mt-5" above="Erleben" title="Anlässe" :heading="2" />
    <div class="px-16">
      <nav class="my-5">
        <ul class="tags flex flex-wrap">
          <li class="flex items-center mb-3 mr-4" v-for="(tags, group) in groupedTags" :key="group">
            <div class="uppercase font-bold mr-2">{{ group }}</div>
            <ul class="flex flex-wrap -mt-1">
              <li class="pt-1" v-for="(label, tag) in tags" :key="tag">
                <a @click="toggle(tag)" :class="{active: selected.includes(tag)}">{{ label }}</a>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      <div class="md:col-count-2 lg:col-count-3 col-gap-sm -mt-4 mb-10">
        <div
          class="bg-white shadow rounded-sm overflow-hidden mt-4 col-break-none"
          v-for="activity in filtered"
          :key="activity.__key"
        >
          <photoSwitcher class="h-48" :images="activity.images" />
          <div class="flex p-5">
            <div>
              <heading :above="activity.__title" :title="activity.name" :heading="3" />
              <div class="markdown" v-formatted-text="renderMarkdown(activity.content)" />
            </div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  </svg-section>
</template>
<script lang="ts">
import { renderMarkdown } from "@factor/api/markdown";
import heading from "components/heading.vue";
import svgSection from "~/components/svg-section.vue";
import photoSwitcher from "../../components/photo-switcher.vue";
import merge from "lodash-es/merge";

export default {
  components: {
    heading,
    svgSection,
    photoSwitcher
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    activities() {
      let groupedTags = {},
        parts = [],
        group,
        name;
      return this.data.map(activity => {
        activity.tags.forEach(tag => {
          parts = tag.split("_");
          if (parts.length > 1) {
            [group, name] = parts;
          } else {
            [name] = parts;
            group = "andere";
          }
          if (!(group in groupedTags)) {
            groupedTags[group] = {};
          }
          groupedTags[group][tag] = name.replace("-", " ");
        });
        activity.groupedTags = groupedTags;
        return activity;
      });
    },
    groupedTags() {
      let groupedTags = {};
      this.activities.forEach((activity: Record<string, any>) => {
        groupedTags = merge(groupedTags, activity.groupedTags);
      });

      const sortByKey = obj => {
        const o = {};
        Object.keys(obj)
          .sort()
          .forEach((key: string) => {
            o[key] = obj[key];
          });
        obj = o;
      };

      Object.values(groupedTags).forEach(group => {
        sortByKey(group);
      });
      sortByKey(groupedTags);
      return groupedTags;
    },
    filtered() {
      const filterCount = this.selected.length;
      if (filterCount) {
        return this.activities.filter((activity: Record<string, any>) => {
          return (
            Object.values(activity.tags).filter((tag: string) =>
              this.selected.includes(tag)
            ).length == filterCount
          );
        });
      } else {
        return this.activities;
      }
    }
  },
  methods: {
    renderMarkdown,
    toggle(this: any, tag: string) {
      const index = this.selected.indexOf(tag);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(tag);
      }
    }
  }
};
</script>