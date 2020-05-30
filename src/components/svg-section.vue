<template>
  <section
    class="svg-section"
    :style="{'background-color': bg}"
  >
    <svg
      :class="{'svg-absolute-top': svgAbsolute }"
      v-if="topSvg"
      viewBox="0 0 100 10"
      :style="{height: svgHeight, width: '100%'}"
      preserveAspectRatio="none"
    >
      <component :style="{fill: bgBefore}" :is="topSvg" />
    </svg>
    <slot />
    <svg
      :class="{'svg-absolute-bottom': svgAbsolute }"
      v-if="bottomSvg || topSvg"
      viewBox="0 0 100 10"
      :style="{height: svgHeight, width: '100%'}"
      preserveAspectRatio="none"
    >
      <component
        :style="{fill: bgAfter ? bgAfter : bgBefore, transform: bottomSvgTransform, 'transform-origin': 'center' }"
        :is="bottomSvg ? bottomSvg : topSvg"
      />
    </svg>
  </section>
</template>

<script lang="ts">
const polygon = (points: string) => {
  return function(h) {
    return h("polygon", {attrs:{points, ...this.$attrs}})
  }
}
const path = (d: string) => {
  return function(h) {
    return h("path", {attrs:{d, ...this.$attrs}})
  }
}
const components = {
  triangle: {
    render: polygon("0,0 0,10 50,0 100,10 100,0")
  },
  arc: {
    render: path("M 0 0 A 50 10 0 0 0 100 0")
  },
  rightTriangleRight: {
    render: polygon("0,0 100,0 100,10")
  },
  rightTriangleLeft: {
    render: polygon("0,0 0,10 100,0")
  },
  obliqueTriangleRight: {
    render: polygon("0,0 0,10 70,0 100,10 100,0")
  },
  obliqueTriangleLeft: {
    render: polygon("0,0 0,10 30,0 100,10 100,0")
  }
};

const isSvg = v => {
  return Object.keys(components).includes(v);
};

export default {
  props: {
    bgBefore: {
      type: String,
      default: () => ""
    },
    bg: {
      type: String,
      default: () => ""
    },
    bgAfter: {
      type: String,
      default: () => ""
    },
    topSvg: {
      type: String,
      default: () => "",
      validate: isSvg
    },
    bottomSvg: {
      type: String,
      default: () => "",
      validate: isSvg
    },
    bottomSvgTransform: {
      type: String,
      default: () => "scale(1,-1)"
    },
    svgHeight: {
      type: String,
      default: () => "4rem"
    },
    svgAbsolute: {
      type: Boolean,
      default: () => false
    }
  },
  components
};
</script>

<style lang="postcss">
.svg-section {
  position: relative;
  .svg-absolute-top {
    position: absolute;
    top: 0;
    z-index: 10;
  }
  .svg-absolute-bottom {
    position: absolute;
    bottom: 0;
    z-index: 10;
  }
}
</style>