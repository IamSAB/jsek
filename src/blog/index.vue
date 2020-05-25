<template>
  <main>
    <header class="text-center mt-6">
      <h1 class="text-6xl text-blue-900">{{ setting('blog.metatags.index.title') }}</h1>
      <p class="text-2xl mt-3 text-blue-700 font-bold">{{ setting('blog.metatags.index.description') }}</p>
      <component :is="setting('blog.components.returnLink')" v-if="tag || page > 1" />
      <svg class="mt-8 w-full h-16 fill-current text-gray-300" viewBox="0 0 200 20" preserveAspectRatio="none">
        <polygon points="0,20 200,0 200,20" />
      </svg>
    </header>
    <div class="bg-gray-300">
      <div v-if="loading" class="mx-auto mt-20">
        <factor-spinner />
      </div>
      <div v-else-if="blogPosts.length > 0" class="container mx-auto p-10">
        <div class="grid sm:grid-cols-2 xl:grid-cols-3 gap-20">
          <article v-for="post in blogPosts" :key="post._id">
            <div class="-ml-5 mr-5">
              <component :is="setting('blog.components.featuredImage')" :postId="post._id" class="shadow-lg rounded-lg transform -skew-y-3 skew-x-3" />
            </div>
            <div class="relative bg-gray-100 p-5 -mt-10 -mr-5 ml-5 rounded-md overflow-hidden shadow">
              <component class="text-md -mb-1" :is="setting('blog.components.date')" :postId="post._id" />
              <component class="text-4xl" :is="setting('blog.components.title')" :postId="post._id" />
              <component class="text-lg font-bold" :is="setting('blog.components.subtitle')" :postId="post._id" />
              <component class="text-lg font-bold" :is="setting('blog.components.meta')" :postId="post._id" />
              <component :is="setting('blog.components.excerpt')" :postId="post._id" />
              <component :is="setting('blog.components.author')" :postId="post._id" />
            </div>
          </article>
        </div>
      </div>
      <div v-else class="posts-not-found">
        <div>
          <h1>{{ setting("blog.notFound.title") }}</h1>
          <p class="sub-title">{{ setting("blog.notFound.subTitle") }}</p>
        </div>
      </div>
    </div>
    <footer>
      <svg class="mb-5 w-full h-16 fill-current text-gray-300" viewBox="0 0 200 20" preserveAspectRatio="none">
        <polygon points="0,0 200,0 200,20" />
      </svg>
      <component class="container mx-auto p-5" :is="setting('blog.components.pagination')" :post-type="postType" />
    </footer>
  </main>
</template>
<script lang="ts">
import { factorSpinner } from "@factor/ui"
import { setting, stored } from "@factor/api"
import { loadAndStoreBlogIndex } from "@factor/plugin-blog"
export default {
  components: { factorSpinner },
  data() {
    return {
      postType: "blog",
      loading: false,
    }
  },
  metaInfo() {
    const title = this.tag ? `Tag "${this.tag}"` : setting("blog.metatags.index.title")
    const description = this.tag
      ? `Articles related to tag: ${this.tag}`
      : setting("blog.metatags.index.description")
    return {
      title,
      description,
    }
  },
  serverPrefetch(this: any) {
    return this.getPosts()
  },
  computed: {
    tag(this: any) {
      return this.$route.params.tag || this.$route.query.tag || ""
    },
    index(this: any) {
      return stored(this.postType) || {}
    },
    blogPosts(this: any) {
      const { posts = [] } = this.index
      return posts
    },
    page(this: any) {
      return this.$route.query.page || 1
    },
  },
  watch: {
    $route: {
      handler: function (this: any) {
        this.getPosts()
      },
    },
  },
  mounted() {
    this.getPosts()
  },
  methods: {
    setting,
    async getPosts(this: any) {
      this.loading = true
      await loadAndStoreBlogIndex()
      this.loading = false
    },
  },
}
</script>