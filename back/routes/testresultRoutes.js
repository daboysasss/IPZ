const express = require('express');
const router = express.Router();
const TestResult = require('../models/TestResult'); // Importujemy model TestResult
const User = require('../models/User'); // Importujemy model User

// 1. Pobierz wszystkie wyniki testów
router.get('/', async (req, res) => {
  try {
    const testResults = await TestResult.find()
      .populate('user', 'name surname') // Uzupełniamy informacje o użytkowniku
      .exec();
    res.status(200).json(testResults);
  } catch (err) {
    res.status(500).json({ message: 'Błąd podczas pobierania wyników testów', error: err });
  }
});

// 2. Pobierz wyniki testów konkretnego użytkownika po jego ID
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;
  try {
    const testResults = await TestResult.find({ user: userId })
      .populate('user', 'name surname') // Uzupełniamy informacje o użytkowniku
      .exec();
    
    if (testResults.length === 0) {
      return res.status(404).json({ message: 'Nie znaleziono wyników' });
    }

    res.status(200).json(testResults);
  } catch (err) {
    res.status(500).json({ message: 'Błąd podczas pobierania wyników testów', error: err });
  }
});

// 3. Dodaj nowy wynik testu
router.post('/', async (req, res) => {
  const { category, result, userId } = req.body;

  if (!category || result === undefined || !userId) {
    return res.status(400).json({ message: 'Все поля (category, result, userId) обязательны' });
  }

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'Пользователь не найден' });
    }

    const existingResult = await TestResult.findOne({ user: userId, category });
    if (existingResult) {
      return res.status(400).json({ message: 'Результат для этой категории уже существует' });
    }

    const testResult = new TestResult({
      category,
      result,
      user: userId,
    });

    await testResult.save();
    res.status(201).json({ message: 'Результат теста успешно добавлен', testResult });
  } catch (err) {
    console.error('Ошибка сохранения результата теста:', err.message);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
});


// 4. Pobierz wynik testu z szczegółami o użytkowniku
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const testResult = await TestResult.findById(id)
      .populate('user', 'name surname') // Uzupełniamy informacje o użytkowniku
      .exec();

    if (!testResult) {
      return res.status(404).json({ message: 'Nie znaleziono wyniku testu' });
    }

    res.status(200).json(testResult);
  } catch (err) {
    res.status(500).json({ message: 'Błąd podczas pobierania wyniku testu', error: err });
  }
});
// 5. Pobierz wyniki testów użytkownika po kategorii
router.get('/user/:userId/category/:category', async (req, res) => {
    const { userId, category } = req.params;
    try {
      const testResult = await TestResult.findOne({ user: userId, category })
        .populate('user', 'name surname') // Убираем личную информацию пользователя (по желанию)
        .exec();
  
      if (!testResult) {
        return res.status(404).json({ message: 'Nie znaleziono wyników dla tej kategorii' });
      }
  
      res.status(200).json(testResult); // Возвращаем результат
    } catch (err) {
      res.status(500).json({ message: 'Błąd podczas pobierania wyników testów', error: err });
    }
});
module.exports = router;
