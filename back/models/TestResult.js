const mongoose = require('mongoose');

// Определение схемы для результатов тестов
const testResultSchema = new mongoose.Schema({
  category: { type: String, required: true }, // Категория теста
  result: { type: Number, required: true },   // Процент правильных ответов
  student: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now },
});

// Модель для работы с коллекцией "testresults"
mongoose.model('TestResult', testResultSchema);
