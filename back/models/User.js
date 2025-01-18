const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'instructor', 'admin'], required: false },
  createdAt: { type: Date, default: Date.now },
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Rating' }],
  schedule: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Schedule' }],
  // Новые поля
  category: { type: String, required: false }, // Категория: A/B/C
  course: { type: String, required: false }, // Курс: например, 0000-00-00/P/B
  coursePrice: { type: Number, required: false, default: 0 }, // Цена курса
  additionalPracticeFees: { type: Number, required: false, default: 0 }, // Дополнительные платежи за практику
  payments: { type: Number, required: false, default: 0 }, // Выплаты
  amountDue: { type: Number, required: false, default: 0 }, // Надо доплатить
  instructor: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: false }, // Инструктор (ссылка на другого пользователя)
});

module.exports = mongoose.model('User', UserSchema);
