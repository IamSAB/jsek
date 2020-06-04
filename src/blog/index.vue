<template>
  <main>
    <header class="text-center mt-6">
      <heading
        above="Berichte"
        :title="setting('blog.metatags.index.title')"
        :below="setting('blog.metatags.index.description')"
      />
    </header>
    <svg-section top-svg="triangle" bg-before="var(--color-bg)" bg="var(--color-lightgray)">
      <div v-if="wallPosts.length > 0" class="container">
        <vue-masonry-wall :items="wallPosts" :options="masonryOptions" @append="loadNextPage">
          <template v-slot:default="{item}">
            <article>
              <photo :source="item.avatar" />
              <div class="flex flex-col sm:flex-row">
                <heading
                  class="max-width-sm"
                  :above="standardDate(item.date)"
                  :title="item.title"
                  :below="item.synopsis"
                  :heading="2"
                />
                <component
                  class="flex-grow"
                  :is="setting('blog.components.excerpt')"
                  :postId="item._id"
                />
              </div>
            </article>
          </template>
        </vue-masonry-wall>
        <div v-if="loading" class="mt-24">
          <factor-spinner />
        </div>
      </div>
      <div v-else class="posts-not-found">
        <div>
          <h1>{{ setting("blog.notFound.title") }}</h1>
          <p class="sub-title">{{ setting("blog.notFound.subTitle") }}</p>
        </div>
      </div>
    </svg-section>
    <footer></footer>
  </main>
</template>
<script lang="ts">
import { factorSpinner } from "@factor/ui";
import { setting, stored, standardDate } from "@factor/api";
import VueMasonryWall from "vue-masonry-wall";
import { loadAndStoreBlogIndex } from "@factor/plugin-blog";
import svgSection from "components/svg-section.vue";
import heading from "components/heading.vue";
import photo from "components/photo.vue";
import { requestPostIndex } from "@factor/post/request"
import { PostStatus } from "@factor/post/types"


export default {
  components: { factorSpinner, svgSection, heading, photo, VueMasonryWall },
  data() {
    return {
      postType: "blog",
      wallPosts: [],
      category: "",
      tag: "",
      search: "",
      pages: 0,
      loading: false,
      masonryOptions: {
        width: 500,
        padding: {
          default: 12,
          1: 10,
          2: 8
        }
      }
    };
  },
  metaInfo() {
    const title = this.tag
      ? `Tag "${this.tag}"`
      : setting("blog.metatags.index.title");
    const description = this.tag
      ? `Artikel verwandt mit Tag: ${this.tag}`
      : setting("blog.metatags.index.description");
    return {
      title,
      description
    };
  },
  computed: {
    index(this: any) {
      return stored(this.postType) || {};
    }
  },
  mounted() {
    this.loadFirstPage();
  },
  methods: {
    setting,
    standardDate,
    async load(this: any, page) {
      this.loading = true;
      await this.loadAndStoreBlogIndex(page);
      const { posts = [] } = this.index
      this.wallPosts.push(...posts);
      this.loading = false;
    },
    async loadFirstPage (this: any) {
      const { params, query } = this.$route
      this.tag = params.tag ?? query.tag ?? ""
      this.category = params.category ?? query.category ?? ""
      this.search = params.search ?? query.search ?? ""
      const page = Number.parseInt(params.page ?? query.page ?? 1)
      await this.load(page)
      this.pages = 1
    },
    async loadNextPage(this: any) {
      if (this.loadedPages < this.index.meta.pageCount) {
        this.pages++
        this.load(this.pages)
      }
    },
    async loadAndStoreBlogIndex (this: any, page: number) {
      await requestPostIndex({
        postType: "blog",
        tag: this.tag,
        category: this.category,
        search: this.search,
        status: PostStatus.Published,
        sort: "-date",
        page,
        limit: setting("blog.limit"),
        sameSource: true,
      })
    }
  }
};
</script>