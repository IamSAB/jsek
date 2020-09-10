<template>
  <div>
    <heading class="my-10 text-center" above="Formular" :title="post.title" :below="post.synopsis" />
    <markdown :content="post.content" />
    <custom-form
      class="container"
      :fields="settings.fields"
      :notifyTo="settings.notifyTo"
      :title="settings.title"
    />
  </div>
</template>

<script lang="ts">
import { stored } from "@factor/api";
import { templateSettings } from "form/template.ts";
import customForm from "form/form.vue";
import heading from "components/heading.vue";
import markdown from "components/markdown.vue";

export default {
  components: {
    customForm,
    heading,
    markdown
  },
  computed: {
    post() {
      return stored("permalink") || {};
    },
    settings() {
      return this.post.settings || {};
    }
  },
  templateSettings() {
    return templateSettings;
  }
};
</script>
