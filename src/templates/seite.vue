<template>
  <div>
    <site-header/>
    <widgets position="top"/>
    <h1>{{ post.title }}</h1>
    <markdown :content="post.content" />
    <widgets position="bottom"/>
  </div>
</template>

<script>
  import { setting, stored } from "@factor/api"
  import widgets from "widgets/widgets.vue"
  import markdown from "../components/markdown.vue"
  import header from "../site/header.vue"

  export default {
    components: {
      widgets,
      markdown,
      siteHeader: header
    },
    computed: {
      post() {
        return stored("permalink") || {}
      },
      settings() {
        return this.post.settings || {}
      }
    },
    methods: { setting }
  }
</script>
