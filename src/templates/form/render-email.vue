<template>
  <table style="border-collapse: collapse; width: 100%;">
    <tr
      v-for="field in fields"
      :key="field.__key"
    >
      <td style="width: 33%; padding: 1rem; vertical-align: top; border: 1px solid lightgray;">
        <b>{{ field.label }}</b>
        <div style="font-size: .8rem">
          <em>{{ field.description }}</em>
        </div>
      </td>
      <td style="padding: 1rem; vertical-align: top; border: 1px solid lightgray;">
        <span v-if="!getValue(field)">-</span>
        <component v-else-if="hasRenderer(field)" :is="field.input" :value="getValue(field)" :field="field" />
        <span v-else>{{  getValue(field) }}</span>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import { setting } from "@factor/api"

export default {
  components: setting("form.fields.render"),
  props: {
    values: {
      type: Object,
      required: true
    },
    fields: {
      type: Array,
      required: true
    }
  },
  methods: {
    hasRenderer(this: any, field: Record<string, any>) {
      return Object.keys(this.$options.components).includes(field.input);
    },
    getValue(this: any, field: Record<string, any>) {
      return this.values[field._id]
    }
  }
};
</script>