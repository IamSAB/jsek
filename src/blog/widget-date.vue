<template>
    <div class="text-color-gray-700 uppercase tracking-wider font-semibold">
        {{ standardDate(post.date) }}
    </div>
</template>

<script lang="ts">
import { factorAvatar } from "@factor/ui"
import { isEmpty, standardDate, stored } from "@factor/api"
export default {
  props: {
    postId: { type: String, default: "" },
  },
  computed: {
    post(this: any) {
      return stored(this.postId) || {}
    },
  },
  methods: {
    standardDate,
  },
}
</script>