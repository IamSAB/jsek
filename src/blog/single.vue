<template>
  <main>
      <article v-if="!isEmpty(post)">
        <header class="flex flex-col items-center relative">
          <div class="-mb-1 uppercase text-gray-600 text-xl font-bold mt-10 tracking-wider">{{ standardDate(post.date) }}</div>
          <h1 class="text-6xl font-bold text-blue-900">
              <factor-link :path="postLink(post._id)">{{ post.title }}</factor-link>
          </h1>
          <div class="-mt-1 text-2xl font-semibold text-blue-800">{{ post.synopsis }}</div>
          <div class="mt-4 mb-2" v-for="authorId in post.author" :key="authorId">
            <factor-avatar :user="getAuthor(authorId)" />
            <span
              class="name"
              itemprop="author"
              itemscope
              itemtype="http://schema.org/Person"
            >{{ getAuthor(authorId).displayName }}</span>
          </div>
          <factor-post-edit :post-id="post._id" class="-mb-8 z-10" />
          <svg class="w-full h-16 fill-current text-white" viewBox="0 0 200 20" preserveAspectRatio="none">
            <polygon points="0,0 100,20 200,0" />
          </svg>
        </header>
        <div>
          <div class="-my-16">
            <img class="object-cover w-full vh-4/5" :src="avatarUrl">
          </div>
          <svg class="w-full h-16 fill-current text-gray-300" viewBox="0 0 200 20" preserveAspectRatio="none">
            <polygon points="0,20 100,0 200,20" />
          </svg>
        </div>
        <div class="bg-gray-300">
          <div class="container mx-auto px-5">
            <div v-if="tags.length > 0" class="w-1/2 mx-auto">
              <div class="flex flex-wrap justify-center">
                <factor-link
                  v-for="(tag, ti) in tags"
                  :key="ti"
                  class="mx-1 my-1 px-2 py-1 bg-blue-800 text-white hover:bg-blue-700 uppercase rounded-md font-semibold tracking-wider text-sm"
                  :path="setting('blog.indexRoute')"
                  :query="{ tag }"
                >{{ tag }}</factor-link>
              </div>
            </div>
            <div class="py-10" v-formatted-text="rendered" />
          </div>
        </div>
        <footer>
          <svg class="w-full h-16 fill-current text-gray-300" viewBox="0 0 200 20" preserveAspectRatio="none">
            <polygon points="0,0 200,0 0,20" />
          </svg>
          <div class="flex flex-col items-center my-5">
            <widgetSocial />
          </div>
        </footer>
      </article>
    <factor-error-404 v-else />
  </main>
</template>

<script lang="ts">
import widgetSocial from "@factor/plugin-blog/widget-social.vue"
import { factorError404, factorLink, factorAvatar  } from "@factor/ui"
import { factorHighlightCode } from "@factor/plugin-highlight-code"
import {
  isEmpty,
  setting,
  stored,
  titleTag,
  descriptionTag,
  shareImage,
  standardDate,
  postLink
} from "@factor/api"
import { renderMarkdown } from "@factor/api/markdown"
import { factorPostEdit } from "@factor/post"

export default {
  components: { factorError404, factorPostEdit, factorLink, widgetSocial, factorAvatar },
  data() {
    return {}
  },
  metaInfo() {
    return {
      title: titleTag(this.post._id),
      description: descriptionTag(this.post._id),
      image: shareImage(this.post._id),
    }
  },
  computed: {
    post() {
      return stored("post") || {}
    },
    avatar(this: any) {
      return stored(this.post.avatar) || {}
    },
    avatarUrl(this: any) {
      return this.avatar.url || ""
    },
    tags(this: any) {
      return this.post.tag || []
    },
    variables(this: any) {
      const vars: Record<string, string> = {}
      this.post.images.forEach((imageId: string) => {
        const img = stored(imageId) || {}
        vars[imageId] = img.url || ""
      })
      return vars
    },
    rendered(this: any) {
      return renderMarkdown(this.post.content, {
        variables: true,
      })
    },
  },
  methods: { 
    isEmpty, 
    setting, 
    standardDate, 
    postLink,
    getAuthor(_id: string) {
      return stored(_id) || {}
    },
},
}
</script>

<style>
.vh-4\/5 {
  height: calc(100vh*4/5);
}
</style>