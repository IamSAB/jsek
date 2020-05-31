<template>
  <div>
    <div
      v-if="above"
      :class="`uppercase font-bold tracking-wider text-gray-700 ${textSize.above}`"
    >{{ above }}</div>
    <heading :class="`-mt-4 font-black ${textSize.heading}`" :h="heading">{{title}}</heading>
    <div v-if="below" :class="`font-semibold text-gray-600 ${textSize.below}`">{{ below }}</div>
    <div v-if="divider" class="border-solid border-2 border-gray-500 w-16 mx-auto my-2" />
  </div>
</template>

<script lang="ts">
const sizes = [
  "xs",
  "sm",
  "base",
  "lg",
  "xl",
  "2xl",
  "3xl",
  "4xl",
  "5xl",
  "6xl"
];
export default {
  components: {
    heading: {
      props: {
        h: {
          type: Number,
          required: true
        },
        size: {
          type: String,
          default: () => ""
        }
      },
      render: function(h) {
        return h(`h${this.$props.h}`, this.$slots.default);
      }
    }
  },
  props: {
    above: {
      type: String,
      default: () => ""
    },
    title: {
      type: String,
      required: true
    },
    heading: {
      type: Number,
      default: () => 1
    },
    below: {
      type: String,
      default: () => ""
    },
    divider: {
      type: Boolean,
      default: () => true
    },
    synopsis: {
      type: String,
      default: () => ""
    }
  },
  computed: {
    textSize() {
      const size = sizes.length - this.heading - 1;
      return {
        above: `text-${sizes[size - 3]}`,
        heading: `text-${sizes[size]}`,
        below: `text-${sizes[size - 4]}`
      };
    }
  }
};
</script>