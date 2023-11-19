const { Event, validateEvent } = require('../models/Event');

exports.createEvent = async (req, res, next) => {
  try {
console.log("here")
    const { error } = validateEvent(req.body);
    if (error) {
      return res.status(400).json({ message: error.message });
    }
    const event = new Event(req.body);
    await event.save();

    res.status(201).json({
      model: event,
      message: "Événement créé avec succès",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
      message: "Erreur serveur",
    });
  }
};