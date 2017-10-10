const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  name: String,
  attendees: [String]
}, { timestamps: true });

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
