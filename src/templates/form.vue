<template>
  <div>
    <heading class="my-10 text-center" above="Formular" :title="post.title" :below="post.synopsis" />
    <markdown :content="post.content" />
    <custom-form
      class="container"
      :fields="fields"
      :notification="notification"
      :confirmation="confirmation"
    />
  </div>
</template>

<script lang="ts">
import { setting, stored } from "@factor/api";
import { templateSettings, interpolate, computed } from "./form/template";
import customForm from "components/form.vue";
import heading from "components/heading.vue";
import markdown from "components/markdown.vue";

export default {
  components: {
    customForm,
    heading,
    markdown
  },
  computed,
  methods: {
    setting,
    interpolate
  },
  templateSettings
};
</script>
