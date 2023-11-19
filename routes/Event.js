
const express = require('express');
const router = express.Router();
const eventController = require('../controller/Event');

router.post('/', eventController.createEvent);

module.exports = router;
