const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer'); // Для отправки email
const jwt = require('jsonwebtoken');

// Подключение к базе данных MongoDB
mongoose
  .connect(process.env.MONGO_URI || 'mongodb+srv://noname52:oralcumshot@cluster0.zohi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Инициализация Express приложения
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors({
  origin: '*', // Разрешить все источники
  credentials: true,
}));

// Middleware для работы с JSON
app.use(express.json());

// Настройка сессий
const mongoStore = MongoStore.create({
  mongoUrl: process.env.MONGO_URI || 'mongodb+srv://noname52:oralcumshot@cluster0.zohi8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
});
app.use(
  session({
    secret: process.env.SECRET || 'aboba',
    resave: false,
    saveUninitialized: false,
    store: mongoStore,
    cookie: { secure: false }, // Установите true, если используете HTTPS
  })
);

// Статические файлы (CSS, JS, изображения)
app.use(express.static(path.join(__dirname, 'public')));

// Главная страница
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'log.html')); // Отдаём HTML файл
});

// Импорт маршрутов
const userRoutes = require('./routes/userRoutes');
const scheduleRoutes = require('./routes/scheduleRoutes');
const ratingRoutes = require('./routes/ratingRoutes');
const authRoutes = require('./routes/auth'); // Авторизационные маршруты

// Подключение маршрутов
app.use('/api/users', userRoutes);
app.use('/api/schedules', scheduleRoutes);
app.use('/api/ratings', ratingRoutes);
app.use('/api/auth', authRoutes); // Маршруты для авторизации

// --- Реализация маршрута для восстановления пароля ---
app.post('/api/auth/forgot-password', async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ message: 'Email is required' });
  }

  try {
    // Найти пользователя в базе данных
    const user = await mongoose.connection.collection('users').findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Настроить Nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use Gmail as email service
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      debug: true, // Enable debugging for the email sending process
      logger: true, // Enable logging for the email sending process
    });


    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reminder',
      text: `Hello, your password is: ${user.password}`,
    };

    // Отправить email
    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        return res.status(500).json({ message: 'Error sending password email', error: error.message });
      } else {
        console.log('Message sent:', info.response);
        return res.json({ message: 'Password email sent successfully' });
      }
    });
  } catch (error) {
    console.error('Error in forgot-password route:', error);
    res.status(500).json({ message: 'Error sending password email' });
  }
});
// Получение текущего пользователя
app.get('/api/user', (req, res) => {
  const token = req.headers['authorization']?.split(' ')[1];  // Извлекаем токен из заголовка

  if (!token) {
      return res.status(401).send('Token is missing');
  }

  jwt.verify(token, 'aboba', (err, decoded) => {
    if (err) {
        console.error('Token verification failed:', err.message);
        return res.status(401).json({ message: 'Invalid or expired token' });
    }

    // Проверка на наличие обязательных данных
    if (!decoded.name || !decoded.surname || !decoded.role) {
        return res.status(400).json({ message: 'Incomplete token data' });
    }

    // Возвращаем корректные данные пользователя
    res.json({
        firstName: decoded.name,
        lastName: decoded.surname,
        role: decoded.role,
    });
  });
});



// Обработка ошибок
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Запуск сервера
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
