const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: Date,
    reason: String,
    status: { type: String, enum: ['pendiente', 'confirmada', 'cancelada'], default: 'pendiente' }
});

appointmentSchema.virtual('resumen').get(function () {
    const fecha = this.date.toISOString().slice(0, 16).replace('T', ' ');
    return `${fecha}`;
});

appointmentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Appointment', appointmentSchema);