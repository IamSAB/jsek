<template>
  <div class="share">
    <factor-link
      class="social facebook"
      :path="`https://www.facebook.com/sharer/sharer.php?u=${link}`"
    >
      <factor-icon icon="fab fa-facebook-f fa-lg" />
    </factor-link>
    <factor-link class="social twitter" :path="`https://twitter.com/intent/tweet?text=${link}`">
      <factor-icon icon="fab fa-twitter fa-lg" />
    </factor-link>
    <factor-link
      class="social linkedin"
      :path="`https://www.linkedin.com/shareArticle?mini=true&url=${link}`"
    >
      <factor-icon icon="fab fa-linkedin-in fa-lg" />
    </factor-link>
    <factor-link
      class="social pinterest"
      :path="`https://pinterest.com/pin/create/button/?url=${link}`"
    >
      <factor-icon icon="fab fa-pinterest fa-lg" />
    </factor-link>
    <factor-link class="social whatsapp" :path="`whatsapp://?send=${link}`">
      <factor-icon icon="fab fa-whatsapp fa-lg" />
    </factor-link>
  </div>
</template>
<script lang="ts">
import { factorLink, factorIcon } from "@factor/ui";
import { stored } from "@factor/app/store";
import { postLink } from "@factor/api/permalink";

export default {
  components: { factorLink, factorIcon },
  props: {
    id: { type: String, default: "" }
  },
  computed: {
    link(this: any) {
      return this.id ? postLink(this.id, { root: true }) : window.location.href;
    },
    title(this: any) {
      return this.id ? stored(this.id).title || "" : document.title;
    }
  }
};
</script>
<style lang="postcss">
.share {
  .social {
    @apply text-gray-600 mx-5;
  }
  a.social {
    &.facebook:hover {
      color: #1877f2;
    }
    &.twitter:hover {
      color: #1da1f2;
    }
    &.linkedin:hover {
      color: #007bb5;
    }
    &.pinterest:hover {
      color: #bd081c;
    }
    &.whatsapp:hover {
      color: #25d366;
    }
  }
}
</style>
