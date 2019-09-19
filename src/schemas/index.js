const mongoose = require('mongoose');
const Schema = mongoose.Schema;

export const system_forms = new Schema({
  form: { type: String, index: true },
  label: String,
  layout: Array,
  secure: Boolean,
});

export const system_form_fields = new Schema({
  form: { type: String, index: true },
  prop: String,
  label: String,
  type: String,
  index: Object,
  input: Object,
  datagrid: Object,
  sequence: Number,
  search: Boolean,
});

export default {
  system_forms,
  system_form_fields,
};
