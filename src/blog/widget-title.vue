<template>
  <h1 class="text-blue-900">
    <factor-link :path="postLink(post._id)">{{ post.title }}</factor-link>
  </h1>
</template>
<script lang="ts">
import { factorPostEdit } from "@factor/post"
import { stored, postLink } from "@factor/api"
import { factorLink  } from "@factor/ui"

export default {
  components: { factorPostEdit, factorLink },
  props: {
    postId: { type: String, default: "" },
  },
  computed: {
    post(this: any) {
      return stored(this.postId) || {}
    },
  },
  methods: { postLink },
}
</script>