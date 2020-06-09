import { dotSetting } from "@factor/api/utils";
import { camelCase } from "lodash-es";
import { stored } from "@factor/api";

// component

export const interpolate = (text, values) => {
  return text.replace(/\${\s*(\w+)\s*}/g, (match, key) => {
    let value = dotSetting({ key, settings: values });
    if (!value) {
      value = match;
      console.log(
        `Field '${key}' not found. Available fields: ${Object.keys(values)
          .map(v => `'${v}'`)
          .join(",")}`
      );
    }
    return value;
  });
}

export const computed = {
  post() {
    return stored("permalink") || {};
  },
  settings() {
    return this.post.settings
  },
  fields() {
    let fields = this.settings.fields;
    const completeField = field => {
      field = {
        _id: camelCase(field.__title),
        label: field.__title,
        required: true,
        ...field
      };
      if (["tags", "select", "checkbox"].includes(field.input)) {
        field.list = field.list.map(option => {
          return {
            name: option.__title,
            ...option
          };
        });
      }
      return field;
    };
    fields = fields.map(field => {
      field = completeField(field);
      if (field.input == "sortable") {
        field.settings = field.settings.map(field => {
          return completeField(field);
        });
      }
      return field;
    });
    return fields;
  },
  notification() {
    const { notify, notifyTitle } = this.settings;
    const title = v => {
      return this.interpolate(notifyTitle, v);
    };
    return {
      to: v => {
        return this.interpolate(notify, v);
      },
      title: title,
      subject: title
    };
  },
  confirmation() {
    const { confirm, confirmTitle } = this.settings;
    const title = v => {
      return this.interpolate(confirmTitle, v);
    };
    return {
      to: v => {
        return this.interpolate(confirm, v);
      },
      title: title,
      subject: title
    };
  },
}

// template settings

const inputTypes = [
  "email",
  "date",
  "tags",
  "editor",
  "text",
  "phone",
  "checkbox",
  "birthday",
  "image-upload",
  "select",
  "textarea",
  "sortable"
];

const drop = (value, array) => {
  return array.filter(el => {
    return el != value;
  });
};

const inputTypesSettings = drop("sortable", inputTypes);

const field = inputTypes => [
  {
    _id: "input",
    input: "select",
    label: "Input type",
    description: "Choose from several input types. For some inputs you must provide options or settings, which can be set with the configuration of the same type below.",
    _default: "text",
    list: inputTypes
  },
  {
    _id: "description",
    input: "textarea",
    label: "Description",
    description: "Field description which is shown below the input title."
  },
  {
    _id: "placeholder",
    _show: v => ["select", "text", "email"].includes(v.input),
    input: "textarea",
    label: "Placeholder",
    description: "Rendered occasionally, dependent on the input type."
  },
  {
    _id: "_default",
    input: "text",
    label: "Default",
    description: "Provide a default field value or leave empty"
  },
  {
    _id: "list",
    _show: v => ["tags", "select", "checkbox"].includes(v.input),
    input: "sortable",
    label: "List",
    description: "Provide options for the 'tags', 'select' and 'checkbox' input types.",
    settings: [
      {
        _id: "value",
        input: "text",
        label: "Value",
        description: "Provide a value for your option"
      },
      {
        _id: "placeholder",
        _show: v => v.input == "select",
        input: "textarea",
        label: "Placeholder",
        description: "Rendered as first option of select which is disabled.",
      },
      {
        _id: "desc",
        _show: v => v.input == "checkbox",
        input: "textarea",
        label: "Description",
        description: "Used a checkbox description",
      }
    ]
  }]

const fields = {
  _id: "fields",
  input: "sortable",
  label: "Fields",
  description: "Add your custom form input fields",
  _default: [
    { __title: "Name", input: "text", description: "Name and Surname" },
    { __title: "Email", input: "email", description: "Email for contact and form submission confirmation", placeholder: "yourmail@domain.com" },
    { __title: "Message", input: "editor", description: "What is on your mind?" }
  ],
  settings: [
    ...field(inputTypes),
    {
      _id: "settings",
      _show: v => v.input == "sortable",
      input: "sortable",
      label: "Settings",
      description: "Provide input fields for the sortable input",
      settings: [
        ...field(inputTypesSettings),
      ]
    }
  ]
}

const form = [
  {
    _id: "notify",
    input: "text",
    label: "Notify a manager",
    description: "Sends a mail to notify about a new form submission. Either an email or an form field using ${field}",
    _default: "${app.email}"
  },
  {
    _id: "notifyTitle",
    input: "textarea",
    label: "Notification Title",
    description: "Use field values inside ${...}",
    _default: "Neue Anfrage von ${name} / ${email} auf ${app.title}"
  },
  {
    _id: "confirm",
    input: "text",
    label: "Confirm the submission",
    description: "Send a mail to the person who submitted the form. Either an email or a form file using ${field}",
    _default: "${email}"
  },
  {
    _id: "confirmTitle",
    input: "textarea",
    label: "Confirmation title",
    description: "Use field values inside ${...}",
    _default: "Bestätigung der Anfrage auf ${app.title} als ${name} / ${email}"
  },
]

export const templateSettings = [
  ...form,
  fields
]