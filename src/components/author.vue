<template>
  <div>
    <factor-avatar class="m-2 w-full" v-if="avatar" :user="author" />
    <span
      class="leading-none"
      itemscope
      itemtype="http://schema.org/Person"
      itemprop="author"
    >{{ author.displayName }}</span>
  </div>
</template>

<script lang="ts">
import { stored } from "@factor/api";
import { factorAvatar } from "@factor/ui";

export default {
  components: {
    factorAvatar
  },
  props: {
    id: {
      type: String,
      required: true
    },
    avatar: {
      type: Boolean,
      default: () => false
    }
  },
  computed: {
    author() {
      return stored(this.id);
    }
  }
};
</script>