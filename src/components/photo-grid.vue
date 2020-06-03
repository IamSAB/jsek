<template>
  <div>
    <div v-if="count" class="flex flex-wrap justify-center">
      <div
        class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5"
        v-for="(photo, i) in photos"
        :key="photo"
      >
          <photo class="object-cover w-full h-64 cursor-pointer" @click.native="view(i)" :source="photo" />
      </div>
      <factor-lightbox :visible.sync="lightbox" :images="photos" :selected="selected" />
    </div>
    <p v-else class="text-lg font-semibold text-center">Keine Bilder vorhanden.</p>
  </div>
</template>
<script lang="ts">
import { factorLightbox } from "@factor/ui";
import photo from "components/photo.vue";

export default {
  components: {
    factorLightbox,
    photo
  },
  data() {
    return {
      selected: 0,
      lightbox: false
    };
  },
  props: {
    photos: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    count () {
      return this.photos.length
    }
  },
  methods: {
    view(this: any, i: number) {
      this.selected = i;
      this.lightbox = true;
    }
  }
};
</script>