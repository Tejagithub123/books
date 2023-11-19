const mongoose = require('mongoose');
const Joi = require('joi');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const Event = mongoose.model('Event', eventSchema);


function validateEvent(event) {
  const schema = Joi.object({
    title: Joi.string().required(),
    startDate: Joi.date().iso().required(),
    endDate: Joi.date().iso().min(Joi.ref('startDate')).required(),
  });

  return schema.validate(event);
}

module.exports = { Event, validateEvent };