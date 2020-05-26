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
          _id: "infos",
          input: "sortable",
          label: "Nachmittage",
          description: "Infos",
          _default: [{ __title: "Info 1" }, { __title: "Info 2" }, { __title: "Info 3" }],
          settings: [
            {
              input: "text",
              label: "Titel",
              _id: "title",
              _default: "Box",
            },
            {
              input: "textarea",
              label: "Beschreibung",
              _id: "description",
              _default: "Zusätzliche Infos zum Nachmittag ...",
            }
          ],
        }
      ]
    },
  }
</script>
