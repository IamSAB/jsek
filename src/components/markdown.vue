<template>
  <div class="markdown" v-formatted-text="rendered" />
</template>

<script lang="ts">
import { renderMarkdown } from "@factor/api/markdown";
export default {
  props: {
    content: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    rendered() {
      return renderMarkdown(this.content);
    }
  }
};
</script>
<style lang="postcss">
.markdown {
  h1 {
    @apply font-black text-2xl mt-4 mb-3;
  }
  h2 {
    @apply font-bold text-xl mt-3 mb-2;
  }
  h3 {
    @apply font-semibold text-lg mt-2 mb-1;
  }
  ul {
    @apply list-disc list-inside;
  }
}
</style>