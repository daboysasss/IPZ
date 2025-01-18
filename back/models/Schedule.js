const mongoose = require('mongoose');

const ScheduleSchema = new mongoose.Schema({
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  status: { type: String, enum: ['scheduled', 'completed', 'cancelled'], default: 'scheduled' },
  course: { type: String, required: false }, // Курс, связанный с занятием (опционально)
});

module.exports = mongoose.model('Schedule', ScheduleSchema);
