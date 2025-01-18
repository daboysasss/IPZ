const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  name: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  surname: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  role: {
    type: mongoose.SchemaTypes.String,
    enum: ['student', 'instructor', 'admin'],
    required: true,
  },
  createdAt: {
    type: mongoose.SchemaTypes.Date,
    default: Date.now,
  },
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating',
    },
  ],
  schedule: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Schedule',
    },
  ],
  category: {
    type: String, // Категория: A/B/C
    required: false,
  },
  course: {
    type: String, // Название курса или код курса
    required: false,
  },
  coursePrice: {
    type: mongoose.Schema.Types.Number, // Цена курса
    required: false,
    default: 0,
  },
  additionalPracticeFees: {
    type: mongoose.Schema.Types.Number, // Дополнительные платежи за практику
    required: false,
    default: 0,
  },
  payments: {
    type: mongoose.Schema.Types.Number, // Выплаты
    required: false,
    default: 0,
  },
  amountDue: {
    type: mongoose.Schema.Types.Number, // Надо доплатить
    required: false,
    default: 0,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Ссылка на инструктора
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
