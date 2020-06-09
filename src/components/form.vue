<template>
  <factor-form ref="form" class="custom-form" :class="formStatus" @submit="submit()">
    <div class="inputs" v-show="status < STATUS.SENDING">
      <factor-input-wrap
        v-for="(field, i) in fields"
        :key="i"
        v-model="values[field._id]"
        :data-test="`custom-form-${field._id}`"
        :input="`factor-input-${field.input}`"
        :list="field.list || []"
        :settings="field.settings || {}"
        :description="field.description"
        :input-classes="`${field.inputClasses}`"
        :required="!!field.required"
        :label="getLabel(field)"
        :label-classes="`${field.labelClasses}`"
        :placeholder="getPlaceholder(field)"
      />
    </div>
      <render-email
        ref="renderedEmail"
        :values="values"
        :fields="fields"
      />
    <factor-input-submit
    v-show="status < STATUS.SUBMITTED"
      btn="primary"
      :loading="status > STATUS.INVALID"
    >Einreichen</factor-input-submit>
  </factor-form>
</template>

<script lang="ts">
import {
  factorInputWrap,
  factorForm,
  factorInputSubmit,
  factorSpinner
} from "@factor/ui";
import { setting } from "@factor/api";
import { saveContactForm } from "@factor/plugin-contact-form";
import { randomToken } from "@factor/api/utils";
import { systemUrl } from "@factor/api";
import { sendEmailRequest } from "@factor/email";
import { saveForm, renderMail } from "../form";
import btn from "./btn.vue";

const renderEmail = setting("form.email.render");

export default {
  components: {
    factorInputWrap,
    factorForm,
    factorInputSubmit,
    factorSpinner,
    btn,
    renderEmail
  },
  props: {
    fields: {
      type: Array,
      default: () => setting("form.fields.default")
    },
    values: {
      type: Object,
      default: () => ({})
    },
    notification: {
      type: Object,
      default: () => ({})
    },
    confirmation: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      status: 0,
      STATUS: {
        UNCHECKED: 0,
        INVALID: 1,
        SAVING: 2,
        SENDING: 3,
        SUBMITTED: 4
      },
      formStatus: "unchecked"
    };
  },
  mounted() {
    this.$watch(
      "values",
      function(this: any) {
        const v = this.$refs.form.$el.checkValidity();
        this.formStatus = v ? "valid" : "invalid";
      },
      { deep: true, immediate: true }
    );
  },
  methods: {
    setting,
    evaluate(this: any, obj: Record<string, any>, v: Record<string, any>) {
      for (let key in obj) {
        console.log(key);
        if (obj[key] instanceof Function) {
          console.log(obj[key](v));
          obj[key] = obj[key](v);
        }
      }
      return obj;
    },
    async submit(this: any) {
      this.status = this.STATUS.SAVING;
      const post = await saveForm(this.fields, this.values);
      this.status = this.STATUS.SENDING;

      const values = {
          title: document.title,
          href: window.location.href,
          ...this.values,
          app: setting("app")
        }
        console.log(values)

        const text = this.$refs.renderedEmail.$el.outerHTML,
        meta = this.evaluate(setting("form.email.meta"), values);


      await sendEmailRequest("sendEmail", {
        ...this.evaluate(
          {
            ...setting("form.email.confirm"),
            ...this.confirmation
          },
          values
        ),
        ...meta,
        text
      });
      await sendEmailRequest("sendEmail", {
        ...this.evaluate(
          {
            ...setting("form.email.notify"),
            ...this.notification
          },
          values
        ),
        ...meta,
        text
      });
      this.status = this.STATUS.SUBMITTED;
    },
    getLabel(c: any): string {
      const label = [c.label];
      if (c.required && c.label) {
        label.push("*");
      }
      return label.join(" ");
    },
    getPlaceholder(c: any): string {
      const placeholder = [c.placeholder];
      if (c.required && c.placeholder && !c.label) {
        placeholder.push("*");
      }
      return placeholder.join(" ");
    }
  }
};
</script>

<style lang="postcss">
#app .editor-toolbar button.table {
  display: inline;
}
#app .CodeMirror {
  text-align: left;
}
#app input,
select,
textarea {
  @apply w-2/3 max-w-md;
}
#app input:focus,
select:focus {
  @apply shadow;
}
</style>