<template>
  <div class="feature-boxes">
    <div v-for="(box, i) in settings.boxes" :key="i" class="box">
      <div class="box-heading">{{ box.heading }}</div>
      <div class="box-description">{{ box.description }}</div>
    </div>
  </div>
</template>

<script>
  import { setting, stored } from "@factor/api"

  export default {
    computed: {
      post() {
        return stored("permalink") || {}
      },
      settings() {
        return this.post.settings || {}
      }
    },
    methods: { setting },
    templateSettings() {
      return [
        {
          _id: "sections",
          input: "sortable",
          label: "Abschnitte",
          description: "Abschnitte mit spezifischen Inhalten",
          _default: [{ __title: "Abschnitt 1" }, { __title: "Abschnitt 2" }, { __title: "Abschnitt 3" }],
          settings: [
            {
              input: "text",
              label: "Titel",
              description: "Überschrift für den Abschnitt",
              _id: "title",
              _default: "Titel",
            },
            {
              input: "editor",
              label: "Inhalt",
              description: "Inhalt des Abschnittes",
              _id: "content",
              _default: "Lorem ipsum ...",
            }
          ],
        }
      ]
    },
  }
</script>
