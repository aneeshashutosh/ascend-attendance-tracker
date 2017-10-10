const mongoose = require('mongoose');

const attendeeSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  name: String,
  events: [String],
  is_national_member: Boolean,
  is_eboard: Boolean
}, { timestamps: true });

const Attendee = mongoose.model('Attendee', attendeeSchema);

module.exports = Attendee;
