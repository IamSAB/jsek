<template>
  <factor-form
    ref="form"
    class="contact-form"
    data-test="contact-form"
    :class="formStatus"
    @submit="process()"
  >
    <div v-if="processed" class="confirm" data-test="confirm">
      <slot name="confirmation">
        Einreichung war erfolgreich.
        <br />Du hast eine Bestätigung deiner Anfrage erhalten.
        <br />Wir melden uns zurück.
      </slot>
    </div>
    <div v-else class="inputs">
      <factor-input-wrap
        v-for="(field, i) in fields"
        :key="i"
        v-model="values[field._id]"
        :data-test="`contact-form-${field._id}`"
        :input="`factor-input-${field.input}`"
        :description="field.description"
        :input-classes="`${field.inputClasses}`"
        :required="!!field.required"
        :label="getLabel(field)"
        :label-classes="`${field.labelClasses}`"
        :placeholder="getPlaceholder(field)"
      />
      <btn 
        btn="primary"
        size="lg"
        type="submit"
        >
        <span v-if="!processed">Senden</span>
        <span v-if="processing">
          <span v-if="saving">Speichern</span>
          <span v-if="sending">Versenden</span>
        </span>
      </btn>
    </div>
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
import { saveForm, renderTable } from "../form";
import btn from "./btn.vue"

export default {
  components: { factorInputWrap, factorForm, factorInputSubmit, factorSpinner },
  props: {
    fields: {
      type: Array,
      default: () => [
        {
          _id: "name",
          input: "text",
          label: "Vorname und Nachname",
          description: "Wie du angesprochen wirst",
          required: true
        },
        {
          _id: "email",
          input: "email",
          label: "Email",
          description:
            "Bestätigung deiner Einreichung wird an diese Adresse versendet.",
          required: true
        },
        {
          _id: "message",
          input: "editor",
          label: "Nachricht",
          description: "Was liegt dir auf dem Herzen?",
          required: true
        }
      ]
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
      saving: false,
      sending: false,
      processed: false,
      formStatus: "unchecked"
    };
  },
  computed: {
    processing() {
      return this.saving || this.sending || !this.processed;
    }
  },
  mounted() {
    console.log(this.$route);
    this.$watch(
      "values",
      function(this: any) {
        const v = this.$refs.form.$el.checkValidity();
        this.formStatus = v ? "valid" : "invalid";
      },
      { deep: true }
    );
  },
  methods: {
    setting,
    async save(this: any) {
      this.saving = true;
      const post = await saveForm(this.fields, this.values);
      this.saving = false;
      return post;
    },
    async mail(this: any, config: any) {
      await sendEmailRequest("sendEmail", {
        to: config.to(this.values),
        title: config.title(this.values),
        subject: config.subject(this.values),
        text: renderTable(this.fields, this.values),
        linkUrl: window.location.href,
        linkText: `Eingereichter Inhalt des Formulars auf ${document.title}`,
        textFooter: `Dieses Mail wurde aufgrund einer Formulareinreichung auf ${this.setting(
          "app.name"
        )} automatisch versendet`
      });
    },
    async process(this: any) {
      const post = await this.save();
      this.sending = true;
      await this.mail({
        to: values => values.email,
        title: values =>
          `Anfrage auf ${this.setting("app.name")} mit ${values.name} / ${
            values.email
          }`,
        subject: values => `Anfrage als  ${values.name} / ${values.email}`,
        ...this.confirmation
      });
      await this.mail({
        to: () => this.setting("app.email"),
        title: values => `Anfrage von ${values.name}`,
        subject: values => `Anfrage von ${values.name} / ${values.email}`,
        ...this.notification
      });
      this.sending = false;
      this.processed = true;
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