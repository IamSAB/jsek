<template>
  <p class="text-color-blue-700">{{ post.synopsis }}</p>
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
  },
}
</script>