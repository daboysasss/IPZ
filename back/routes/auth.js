const { Router } = require('express');
const { body, validationResult } = require('express-validator');
const User = require('../models/User'); // Подключение модели пользователя
const { hashPassword, comparePassword } = require('../utils/helpers'); // Утилиты для работы с паролями
const jwt = require('jsonwebtoken');
const { secret } = require('../config'); // Секрет для JWT

const router = Router();

// Middleware для проверки токена
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, secret, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid token' });
    }
    req.userId = decoded.userId;
    next();
  });
};

// Регистрация пользователя
router.post(
  '/register',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('name').notEmpty().withMessage('Name is required'),
    body('surname').notEmpty().withMessage('Surname is required'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
    body('role').isIn(['student', 'instructor', 'admin']).withMessage('Invalid role'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, name, surname, role } = req.body;
    const userDB = await User.findOne({ email });
    if (userDB) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const password = hashPassword(req.body.password);
    try {
      const newUser = await User.create({ email, name, surname, password, role });
      res.status(201).json(newUser);
    } catch (error) {
      console.error('Error creating user:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

// Логин пользователя
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('Email is invalid'),
    body('password').notEmpty().withMessage('Password is required'),
    body('password').isLength({ min: 3 }).withMessage('Password must be at least 3 characters long'),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    const userDB = await User.findOne({ email });
    if (!userDB) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    const isValid = comparePassword(password, userDB.password);
    if (isValid) {
      // Генерация токена с нужными данными
      const token = jwt.sign(
        {
          userId: userDB._id,
          name: userDB.name,
          surname: userDB.surname,
          role: userDB.role
        },
        secret, 
        { expiresIn: '24h' }
      );
      return res.json({ token, role: userDB.role });
    } else {
      return res.status(401).json({ message: 'Invalid password' });
    }
  }
);


// Логаут пользователя
router.post('/logout', verifyToken, (req, res) => {
  // В данном случае логаут происходит на клиенте, сервер ничего не хранит
  res.status(200).json({ message: 'Logout successful' });
});

// Проверка авторизации
router.get('/checkAuth', verifyToken, (req, res) => {
  res.status(200).json({ authenticated: true });
});

// Получение текущего пользователя
router.get('/currentUser', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
