const Appointment = require('../models/Appointment');

// Crear citas
const createAppointment = async (req, res) => {
    const { date, reason } = req.body;

    if (!date || !reason) {
      return res.status(400).json({ error: 'Fecha y razón son requeridas' });
    }
  
    try {
      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate)) {
        return res.status(400).json({ error: 'Fecha no válida' });
      }
  
      const appointment = await Appointment.create({
        user: req.user.userId,
        date: appointmentDate,
        reason,
      });
  
      res.status(201).json(appointment);
    } catch (err) {
      console.error(err);
      res.status(400).json({ error: 'Error al crear la cita 📆❌' });
    }
  };

// Obtener citas
const getAppointments = async (req, res) => {
    try {
      const filter = req.user.role === 'admin' ? {} : { user: req.user.userId };
      const appointments = await Appointment.find(filter).populate('user', 'name');
      res.json(appointments);
    } catch (err) {
      res.status(500).json({ error: 'Error al obtener citas ❌' });
    }
  };

//Actualizar citas
const updateAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  const { status, date } = req.body;

  try {
    const appointment = await Appointment.findById(id);
    if (!appointment) return res.status(404).json({ error: 'Cita no encontrada' });

    const isOwner = appointment.user.toString() === req.user.userId;
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({ error: 'No tienes permisos para modificar esta cita' });
    }

    if (status) appointment.status = status;

    if (date && isAdmin) {
      const appointmentDate = new Date(date);
      if (isNaN(appointmentDate)) {
        return res.status(400).json({ error: 'Fecha no válida' });
      }
      appointment.date = appointmentDate;
    }

    await appointment.save();
    res.json({ message: 'Cita actualizada con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar la cita ❌' });
  }
};

module.exports = { createAppointment, getAppointments, updateAppointmentStatus };
