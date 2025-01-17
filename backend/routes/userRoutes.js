const express = require('express');
const User = require('../models/User'); // Импорт модели пользователя
const router = express.Router();

// Создание нового пользователя
router.post('/', async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    const user = new User({ email, name, password, role });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error });
  }
});

// Получение всех пользователей
router.get('/', async (req, res) => {
  try {
    const users = await User.find().populate('ratings schedule');
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error });
  }
});

module.exports = router;
