<template>
  <section id="form" class="text-center">
    <heading class="my-10" above="Fragen?" title="Kontakt" :heading="2"/>
    <div class="container">
      <email-form :fields="fields" :confirmation="confirmation" :notification="notification"></email-form>
    </div>
  </section>
</template>

<script lang="ts">
import emailForm from "components/form.vue";
import heading from "components/heading.vue";

export default {
  components: {
    emailForm,
    heading
  },
  props: {
    notify: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      fields: [
        {
          _id: "name",
          input: "text",
          label: "Name",
          description: "Voller Name oder Familienname",
          required: true
        },
        {
          _id: "email",
          input: "email",
          label: "Email",
          description:
            "Erhälst eine Bestätigung deiner Anfrage an diese Adresse.",
          required: true
        },
        {
          _id: "nachricht",
          input: "editor",
          label: "Nachricht",
          description: "Was liegt dir auf dem Herzen?",
          required: true
        }
      ],
      confirmation: {
        to: values => values.email,
        title: values => `Deine Anfrage via Formular auf ${document.title}`,
        subject: values =>
          `Bestätigung deiner Nachricht an Stufe ${document.title} als ${values.name}`
      }
    };
  },
  computed: {
    notification: () => ({
      to: () => this.email,
      title: values => `Anfrage via Formular auf ${document.title}`,
      subject: values =>
        `Anfrage an Stufe ${this.title} auf ${document.title} von ${values.name} / ${values.email}`
    })
  }
};
</script>