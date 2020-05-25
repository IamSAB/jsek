<template>
  <img v-if="avatarUrl" :src="avatarUrl">
</template>
<script lang="ts">
import { stored } from "@factor/api"
export default {
  props: {
    postId: { type: String, default: "" },
  },
  computed: {
    post(this: any) {
      return stored(this.postId) || {}
    },
    avatar(this: any) {
      return stored(this.post.avatar) || {}
    },
    avatarUrl(this: any) {
      return this.avatar.url || ""
    },
    style(this: any) {
      const style = {
        backgroundImage: `url(${this.avatarUrl})`,
      }
      return style
    },
  },
}
</script>