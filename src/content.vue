<template>
  <div class="antialiased text-gray-900">
    <jsek-header />
    <router-view />
    <jsek-footer />
  </div>
</template>

<script lang="ts">
import { setting } from "@factor/api/settings"
export default {
  components: {
    jsekHeader: setting(`site.components.header`),
    jsekFooter: setting(`site.components.footer`),
  },
  metaInfo() {
    return {
      title: setting("metatags.defaultTitle"),
      titleTemplate: setting("metatags.titleTemplate"),
    }
  },
}
</script>