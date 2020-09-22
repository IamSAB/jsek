<template>
  <div>
    <svg-section v-for="widget in widgets" :key="widget._id" :style="settings">
      <heading
        :title="widget.title"
      />
      <component :is="widget.render" :widget="widget" :style="widget.widget"/>
    </svg-section>
  </div>
</template>

<script>
import heading from "./../../components/heading.vue"
import svgSection from "./../../components/svg-section.vue"

export default {
  name: "sections",
  components: {
      heading,
      svgSection
  },
  props: {
    widgets: { type: Array, required: true },
    settings: { type: Object, required: true }
  },
  layoutSettings() {
    return [
    {
      _id: "bgColorAbove",
      input: "text",
      label: "Background Color Above Position"
    },
    {
      _id: "bgColorBelow",
      input: "text",
      label: "Background Color Below Position"
    },
  ]
  },
  itemSettings() {
    return [
    {
      _id: "title",
      input: "text",
      label: "Title",
      description: "Title of the section",
    },
    {
      _id: "above",
      input: "text",
      label: "Suptitle",
      description: "Text above title",
    },
    {
      _id: "below",
      input: "text",
      label: "Subtitle",
      description: "Text below title",
    },
    {
      _id: "description",
      input: "editor",
      label: "Description",
      description: "Description of the section",
    }
  ]
  }
};
</script>