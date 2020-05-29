<template>
  <button :class="`relative ${btn} ${size} focus:outline-none`" :type="type">
    <div class="relative z-10 uppercase font-semibold">
      <slot></slot>
    </div>
    <svg class="absolute inset-0 h-full w-full" viewBox="0 0 7 7" preserveAspectRatio="none">
      <polygon vector-effect="non-scaling-stroke" points="2,0 6,1 7,5 5,7 1,6 0,3" />
    </svg>
  </button>
</template>

<script lang="ts">
export default {
  props: {
    btn: {
      type: String,
      default: () => "primary",
      validator: v => ["primary", "secondary", "outline"].includes(v)
    },
    type: {
      type: String,
      default: () => "button",
      validator: v => ["submit", "button"].includes(v)
    },
    size: {
      type: String,
      default: () => "base",
      validator: v => ["xs", "sm", "base", "xl", "lg"].includes(v)
    }
  }
};
</script>

<style lang="postcss">
.xs div {
  @apply text-xs px-4 py-3
}
.sm div {
  @apply text-sm px-5 py-4
}
.base div {
  @apply text-base px-6 py-5
}
.lg div {
  @apply text-lg px-8 py-6
}
.xl div {
  @apply text-xl px-10 py-8
}
.primary {
  color: white;
  polygon {
    fill: var(--color-primary);
  }
}
.primary:hover {
  polygon {
    fill: var(--color-primary-lighter);
  }
}
.primary:focus {
  polygon {
    fill: var(--color-primary-darker);
  }
}
.secondary {
  color: white;
  polygon {
    fill: var(--color-secondary);
  }
}
.secondary:hover {
  polygon {
    fill: var(--color-secondary-lighter)
  }
}
.secondary:focus {
  polygon {
    fill: var(--color-secondary-darker)
  }
}
.outline {
  svg {
    overflow: visible;
  }
  polygon {
    fill: none;
    stroke-width: 2px;
    stroke: var(--color-darkgray-lighter)
  }
}
.outline:hover {
  color: var(--color-lightgray-lighter);
  polygon {
    stroke: none;
    fill: var(--color-darkgray-lighter)
  }
}
.outline:focus {
  color: var(--color-lightgray-lighter);
  polygon {
    stroke: none;
    fill: var(--color-darkgray)
  }
}
</style>