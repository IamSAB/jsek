<template>
  <main>
    <article v-if="!isEmpty(post)">
      <header class="text-center">
        <heading above="Bericht" :title="post.title" :below="post.synopsis" />
        <div class="my-4">
          <tags class="justify-center" :tags="post.tag" @selected="viewTag" />
        </div>
      </header>
      <svg-section
        top-svg="triangle"
        bg-before="var(--color-bg)"
        bg-after="var(--color-lightgray)"
        :svg-absolute="true"
      >
        <photo class="vh-2/3" :source="post.avatar" />
      </svg-section>
      <section class="bg-gray-200">
        <div class="container py-10">
          <markdown :content="post.content" />
        </div>
      </section>
      <svg-section
        top-svg="obliqueTriangleRight"
        bg-before="var(--color-lightgray)"
        bg="var(--color-lightgray-darker)"
        bg-after="var(--color-bg)"
      >
        <photo-grid class="my-10 text-gray-600" :images="post.images" />
      </svg-section>
      <footer class="flex flex-col items-center my-10 text-lg">
        <div class="font-semibold uppercase text-gray-600">Geschrieben von</div>
        <div class="flex items-center">
          <author
            class="flex items-center h-24"
            v-for="id in post.author"
            :id="id"
            :key="id"
            :avatar="true"
          />
          <div>
            <span class="mx-5 uppercase font-semibold text-gray-600">am</span>
            <datetime :datetime="post.date" />
          </div>
        </div>
        <share class="mt-10" :id="post._id" />
      </footer>
    </article>
    <factor-error-404 v-else />
  </main>
</template>

<script lang="ts">
import widgetSocial from "@factor/plugin-blog/widget-social.vue";
import { factorError404, factorLink } from "@factor/ui";
import {
  isEmpty,
  setting,
  stored,
  titleTag,
  descriptionTag,
  shareImage,
  standardDate,
  postLink
} from "@factor/api";
import { renderMarkdown } from "@factor/api/markdown";
import { factorPostEdit } from "@factor/post";
import svgSection from "components/svg-section.vue";
import heading from "components/heading.vue";
import photo from "components/photo.vue";
import markdown from "components/markdown.vue";
import author from "components/author.vue";
import datetime from "components/datetime.vue";
import share from "components/share.vue";
import tags from "components/tags.vue";
import photoGrid from "components/photo-grid.vue";

export default {
  components: {
    factorError404,
    factorPostEdit,
    factorLink,
    widgetSocial,
    svgSection,
    markdown,
    author,
    datetime,
    heading,
    photo,
    share,
    tags,
    photoGrid
  },
  data() {
    return {};
  },
  metaInfo() {
    return {
      title: titleTag(this.post._id),
      description: descriptionTag(this.post._id),
      image: shareImage(this.post._id)
    };
  },
  computed: {
    post() {
      return stored("post") || {};
    },
    variables(this: any) {
      const vars: Record<string, string> = {};
      this.post.images.forEach((imageId: string) => {
        const img = stored(imageId) || {};
        vars[imageId] = img.url || "";
      });
      return vars;
    },
    rendered(this: any) {
      return renderMarkdown(this.post.content, {
        variables: true
      });
    }
  },
  methods: {
    isEmpty,
    setting,
    standardDate,
    postLink
  }
};
</script>