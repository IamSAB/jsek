<template>
  <div class="antialiased">
    <router-view/>
    <site-footer/>
  </div>
</template>

<script lang="ts">
import { setting } from "@factor/api/settings"
import footer from "./site/footer.vue"

export default {
  components: {
    siteFooter: footer
  },
  metaInfo() {
    return {
      title: setting("metatags.defaultTitle"),
      titleTemplate: setting("metatags.titleTemplate"),
    }
  },
}
</script>