<template>
  <main>
    <header class="text-center my-8">
      <heading
        above="Berichte"
        :title="setting('blog.metatags.index.title')"
        :below="setting('blog.metatags.index.description')"
      />
    </header>
    <svg-section top-svg="triangle" bg-before="var(--color-bg)" bg="var(--color-lightgray)">
      <div v-if="tag" class="text-center">
        <p class="text-lg text-gray-500 font-bold mb-2">
          Alle Berichte mit dem Tag "{{ startCase(tag) }}"
        </p>
        <factor-link :path="setting('blog.indexRoute')">
          <span class="uppercase font-semibold text-sm tracking-wide">Zurücksetzen</span>
        </factor-link>
      </div>
      <div v-if="blogPosts.length > 0" class="container mt-16">
        <article v-for="(item, i) in blogPosts" :key="item._id" class="my-12 shadow-xs">
          <photo :source="item.avatar" />
          <div class="my-2"></div>
          <div class="flex flex-col sm:flex-row items-center">
            <div :class="`sm:w-2/5 flex-none p-5 ${i%2 ? 'sm:order-last': ''}`">
              <heading
                class="text-center"
                :above="standardDate(item.date)"
                :title="item.title"
                :below="item.synopsis"
                :heading="2"
                :divider="false"
              />
              <tags @selected="filterByTag" :tags="item.tag" class="justify-center mt-2" />
            </div>
            <div :class="`p-5 ${i%2 ? 'text-right': ''}`">
              <div class="mb-2">{{ excerpt(item.content) }}</div>
              <factor-link class="read-link" :path="postLink(item._id)">
                Mehr lesen
                <factor-icon icon="fas fa-arrow-right" />
              </factor-link>
            </div>
          </div>
        </article>
        <div v-if="loading" class="mt-24">
          <factor-spinner />
        </div>
      </div>
      <div v-else class="text-center">
        <h1 class="text-xl my-5">{{ setting("blog.notFound.title") }}</h1>
        <p>{{ setting("blog.notFound.subTitle") }}</p>
      </div>
    </svg-section>
    <footer class="container my-12">
      <pagination post-type="blog" />
    </footer>
  </main>
</template>
<script lang="ts">
import { factorSpinner, factorLink, factorIcon } from "@factor/ui";
import { setting, stored, standardDate, postLink } from "@factor/api";
import { excerpt } from "@factor/api/excerpt";
import photo from "components/photo.vue";
import heading from "components/heading.vue";
import svgSection from "components/svg-section.vue";
import tags from "components/tags.vue";
import {startCase} from "lodash-es"

export default {
  components: {
    factorSpinner,
    factorLink,
    factorIcon,
    photo,
    heading,
    svgSection,
    pagination: setting("blog.components.pagination"),
    tags
  },
  data() {
    return {
      postType: "blog",
      loading: false,
      notFoundTitle: setting("blog.notFound.title"),
      notFoundSubTitle: setting("blog.notFound.subTitle"),
      indexLayoutComponents: setting("blog.layout.index")
    };
  },
  metaInfo(this: any) {
    const title = this.tag
      ? `Tag "${this.tag}"`
      : setting("blog.metatags.index.title");
    const description = this.tag
      ? `Tag: ${this.tag}`
      : setting("blog.metatags.index.description");
    return {
      title,
      description
    };
  },
  computed: {
    tag(this: any) {
      return this.$route.params.tag || this.$route.query.tag || "";
    },
    page(this: any) {
      return this.$route.query.page || 1;
    },
    index(this: any) {
      return stored(this.postType) || {};
    },
    blogPosts(this: any) {
      const { posts = [] } = this.index;
      return posts;
    }
  },
  methods: {
    setting,
    standardDate,
    excerpt,
    postLink,
    startCase,
    filterByTag(selected: string[]) {
      const tag = selected[0]
      this.$router.push({ query: { ...this.$route.query, tag } })
    }
  }
};
</script>