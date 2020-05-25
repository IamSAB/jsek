<template>
  <div>
    <div class="my-4">{{ excerpt(post.content) }}</div>
    <factor-link class="read-link" :path="postLink(post._id)">
      Mehr lesen
      <factor-icon icon="fas fa-arrow-right" />
    </factor-link>
  </div>
</template>
<script lang="ts">
import { factorLink, factorIcon } from "@factor/ui"
import { postLink, stored } from "@factor/api"
import { excerpt } from "@factor/api/excerpt"
export default {
  components: { factorLink, factorIcon },
  props: {
    postId: { type: String, default: "" },
  },
  computed: {
    post(this: any) {
      return stored(this.postId) || {}
    },
  },
  methods: {
    excerpt,
    postLink,
  },
}
</script>