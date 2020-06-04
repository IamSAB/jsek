<template>
  <ul class="flex flex-wrap">
    <template v-if="Array.isArray(tags)">
      <tag v-for="tag in tags" :key="tag" @click.native="click(tag)">{{ tag }}</tag>
    </template>
    <li v-else v-for="(val, group) in tags" :key="group">
      <ul class="flex flex-wrap">
        <tag v-for="(label, tag) in val" :key="tag" @click.native="click(tag)">{{ label }}</tag>
      </ul>
    </li>
  </ul>
</template>

<script lang="ts">
export default {
  components: {
    tag: {
      render: function(h) {
        return h(
          "li",
          {
            class:
              "mx-1 px-2 py-1 bg-gray-500 hover:bg-gray-400 cursor-pointer shadow rounded"
          },
          [
            h(
              "a",
              {
                class: "font-semibold text-gray-800 capitalize"
              },
              [this.$slots.default]
            )
          ]
        );
      }
    }
  },
  props: {
    tags: {
      type: [Array, Object],
      default: () => []
    },
    mode: {
      type: String,
      default: "select",
      validate: v => ["select", "toggle"].includes(v)
    }
  },
  data() {
    return {
      selected: []
    };
  },
  methods: {
    click(this: any, tag: string) {
      this[this.mode](tag);
      this.$emit("selected", this.selected);
    },
    select(this: any, tag: string) {
      this.selected = [tag];
    },
    toggle(this: any, tag: string) {
      const index = this.selected.indexOf(tag);
      if (index >= 0) {
        this.selected.splice(index, 1);
      } else {
        this.selected.push(tag);
      }
    }
  }
};
</script>