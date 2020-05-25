<template>
  <div class="antialiased text-gray-900">
    <header-primary />
    <router-view />
    <footer-primary />
  </div>
</template>

<script lang="ts">
import { setting } from "@factor/api/settings"
export default {
  components: {
    "header-primary": setting(`site.components.header`),
    "footer-primary": setting(`site.components.footer`),
  },
  metaInfo() {
    return {
      title: setting("metatags.defaultTitle"),
      titleTemplate: setting("metatags.titleTemplate"),
    }
  },
}
</script>

<style lang="less">

</style>