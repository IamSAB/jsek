<template>
  <div class="flex items-center">
    <div class="mr-8">{{ count }} Artikel</div>
    <factor-btn :disabled="pageCurrent == 1" @click="page('previous')" size="small">
      <factor-icon icon="fas fa-arrow-left" />
    </factor-btn>
    <div class="mx-4">{{ pageCurrent }} von {{ pageCount }}</div>
    <factor-btn :disabled="pageCurrent == pageCount" @click="page('next')" size="small">
      <factor-icon icon="fas fa-arrow-right" />
    </factor-btn>
  </div>
</template>

<script lang="ts">
import { factorBtn, factorIcon } from "@factor/ui"
import { stored } from "@factor/api"
export default {
  components: { factorBtn, factorIcon },
  props: {
    postType: { type: String, default: "" },
  },
  computed: {
    index(this: any) {
      return stored(this.postType) || {}
    },
    blogMeta(this: any) {
      const { meta = [] } = this.index
      return meta
    },
    pageCount(this: any) {
      return this.blogMeta.pageCount || 1
    },
    count(this: any) {
      return this.blogMeta.totalForQuery || 1
    },
    pageCurrent(this: any) {
      return this.blogMeta.pageCurrent || 1
    },
  },
  methods: {
    page(this: any, direction: any) {
      let page
      if (direction == "next" && this.pageCurrent !== this.pageCount) {
        page = this.pageCurrent + 1
      } else if (this.pageCurrent > 1) {
        page = this.pageCurrent - 1
      }
      if (page) {
        this.$router.push({ query: { ...this.$route.query, page } })
      }
    },
  },
}
</script>