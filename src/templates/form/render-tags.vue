<template>
  <ul>
    <li v-for="tag in tags" :key="tag">{{ tag.name }} <em>[{{ tag.value }}]</em> </li>
  </ul>
</template>

<script lang="ts">

export default {
  props: {
    value: {
      type: Array,
      required: true
    },
    field: {
      type: Object,
      required: true
    }
  },
  computed: {
    tags () {
      return this.field.list.filter(o => this.value.includes(o.value))
    }
  }
};
</script>