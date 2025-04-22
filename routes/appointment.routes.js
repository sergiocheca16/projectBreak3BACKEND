const express = require('express');
const auth = require('../middlewares/auth');
const { createAppointment, getAppointments, updateAppointmentStatus } = require('../controllers/appointment.controller');

const router = express.Router();

router.post('/', auth, createAppointment);
router.get('/', auth, getAppointments);
router.put('/:id', auth, updateAppointmentStatus);

module.exports = router;

