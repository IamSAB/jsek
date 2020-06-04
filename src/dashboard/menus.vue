<template>
  <dashboard-panel>
    <div v-for="menu in menus" :key="menu.label">
      <h2>{{ menu.label }}</h2>
      <vue-nestable group="menus" v-model="menu.items">
        <vue-nestable-handle slot-scope="{ item }" :item="item">{{ item.text }}</vue-nestable-handle>
      </vue-nestable>
    </div>
    <factor-btn @click="vis = !vis">Click Me</factor-btn>
    <factor-modal :vis.sync="vis">
      <factor-form @submit="add()">
        <factor-input-wrap
          v-model="linkType"
          input="factor-input-select"
          label="Link type"
          description="Choose a link type for the menu item"
          placeholder="Select Something"
          :list="linkTypes"
          required
        />
        <div v-if="linkType == 'url'">
          <factor-input-wrap
            v-model="url"
            input="factor-input-url"
            label
            description="Enter the url to your webpage"
            placeholder="http://..."
            :list="posts"
            required
          />
        </div>
        <div v-else-if="linkType == 'post'">
          <factor-input-wrap
            v-model="postType"
            input="factor-input-select"
            label="Post type"
            description="Select a post type"
            placeholder="Select Something"
            :list="postTypes"
            required
          />
          <div v-show="postType">
            <factor-input-wrap
              v-model="search"
              input="factor-input-text"
              label="Search"
              description="Search for posts and select them."
              placeholder="Search ..."
              required
            />
            <factor-input-wrap
              v-model="postId"
              input="factor-input-select"
              label="Post"
              description="Select a post"
              placeholder="Select Something"
              :list="posts"
              required
            />
          <p>{{ find(posts, {value: postId}).desc }}</p>
          </div>
        </div>
        <div v-else-if="linkType == 'content'">
          <factor-input-wrap
            v-model="contentRoute"
            input="factor-input-select"
            label="Content route"
            description="Select a content route"
            placeholder="Select Something"
            :list="contentRoutes"
            required
          />
          <p>{{ find(contentRoutes, {value: contentRoute}).desc }}</p>
        </div>
      </factor-form>
    </factor-modal>
  </dashboard-panel>
</template>

<script type="ts">
import { VueNestable, VueNestableHandle } from "vue-nestable";
import { postTypesConfig, getKnownRoutePaths, stored } from "@factor/api";
import { setting } from "@factor/api/settings";
import { requestPostIndex } from "@factor/post/request";
import { dashboardPanel, factorBtn, factorModal } from "@factor/ui";
import { randomToken } from "@factor/api/utils";
import { factorForm } from "@factor/ui";
import { factorInputWrap } from "@factor/ui";
import { startCase, find } from "lodash-es";

export default {
  components: {
    VueNestable,
    VueNestableHandle,
    dashboardPanel,
    factorModal,
    factorForm,
    factorInputWrap,
    factorBtn
  },
  data() {
    return {
      vis: false,
      menus: {},
      loading: false,
      linkType: "",
      linkTypes: [
        { name: "Url", value: "url", desc: "" },
        {
          name: "Content route",
          value: "content",
          desc: "An endpoint of the application, not related to a single post."
        },
        {
          name: "Post type",
          value: "post",
          desc: "Link to a post of a registered public type."
        }
      ],
      postType: "",
      contentRoute: "",
      postId: "",
      search: ""
    };
  },
  async mounted() {
    const menus = setting("menus");
    menus.forEach(menu => {
      this.menus[menu] = {
        label: menu,
        group: menu,
        items: []
      };
    });
    this.menus["draft"] = {
      label: "Draft",
      items: []
    };
  },
  watch: {
    postType(val, old) {
      if (!this.postIndex) {
        this.loadPostIndex();
      }
    }
  },
  computed: {
    postTypes() {
      const fakePost = new Proxy(
        {},
        {
          get: function(obj, prop) {
            return `:${prop}`;
          }
        }
      );
      return postTypesConfig().reduce((publicPostTypes, postType) => {
        if (postType.addSitemap) {
          publicPostTypes.push({
            label: postType.nameSingle,
            value: postType.postType,
            desc: `${postType.namePlural} with url '${postType.permalink(
              fakePost
            )}'`,
            icon: postType.icon
          });
        }
        return publicPostTypes;
      }, []);
    },
    contentRoutes() {
      return getKnownRoutePaths().map(route => {
        return {
          label: startCase(route.replace("/", "")),
          value: route,
          desc: `Content route with url '${route}'`
        };
      });
    },
    postIndex() {
      return stored(this.postType) || undefined;
    },
    posts() {
      if (this.postIndex) {
        return this.postIndex.posts.reduce((filtered, post) => {
          if (post.title.search(this.search) > -1) {
            filtered.push({
              label: post.title,
              value: post._id,
              desc: post.synopsis
            });
          }
          return filtered
        }, []);
      } else {
        return [];
      }
    }
  },
  methods: {
    find,
    add() {
      this.menus.draft.items.push({
        id: randomToken(8),
        text: randomToken(8)
      });
    },
    async loadPostIndex() {
      if (this.postType) {
        await requestPostIndex({
          postType: this.postType,
          search: this.search
        });
      }
    }
  }
};
</script>

<style>
.nestable {
  position: relative;
}
.nestable-rtl {
  direction: rtl;
}
.nestable .nestable-list {
  margin: 0;
  padding: 0 0 0 40px;
  list-style-type: none;
}
.nestable-rtl .nestable-list {
  padding: 0 40px 0 0;
}
.nestable > .nestable-list {
  padding: 0;
}
.nestable-item,
.nestable-item-copy {
  margin: 10px 0 0;
}
.nestable-item:first-child,
.nestable-item-copy:first-child {
  margin-top: 0;
}
.nestable-item .nestable-list,
.nestable-item-copy .nestable-list {
  margin-top: 10px;
}
.nestable-item {
  position: relative;
}
.nestable-item.is-dragging .nestable-list {
  pointer-events: none;
}
.nestable-item.is-dragging * {
  opacity: 0;
  filter: alpha(opacity=0);
}
.nestable-item.is-dragging:before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(106, 127, 233, 0.274);
  border: 1px dashed rgb(73, 100, 241);
  -webkit-border-radius: 5px;
  border-radius: 5px;
}
.nestable-drag-layer {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  pointer-events: none;
}
.nestable-rtl .nestable-drag-layer {
  left: auto;
  right: 0;
}
.nestable-drag-layer > .nestable-list {
  position: absolute;
  top: 0;
  left: 0;
  padding: 0;
  background-color: rgba(106, 127, 233, 0.274);
}
.nestable-rtl .nestable-drag-layer > .nestable-list {
  padding: 0;
}
.nestable [draggable="true"] {
  cursor: move;
}
.nestable-handle {
  display: inline;
}
</style>