const express = require('express');
const Schedule = require('../models/Schedule'); // Импорт модели расписания
const router = express.Router();

// Создание расписания
router.post('/', async (req, res) => {
  try {
    const { instructor, student, date, startTime, endTime, status } = req.body;
    const schedule = new Schedule({ instructor, student, date, startTime, endTime, status });
    await schedule.save();
    res.status(201).json(schedule);
  } catch (error) {
    res.status(500).json({ message: 'Error creating schedule', error });
  }
});

// Получение расписания
router.get('/', async (req, res) => {
  try {
    const schedules = await Schedule.find().populate('instructor student');
    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedules', error });
  }
});

// Запись ученика на занятие
router.post('/book', async (req, res) => {
  try {
    const { instructor, student, date, startTime, endTime } = req.body;

    // Проверка, свободен ли слот
    const conflictingSchedule = await Schedule.findOne({
      instructor,
      date,
      startTime: { $lt: endTime }, // Слот пересекается по времени
      endTime: { $gt: startTime },
      status: 'scheduled',
    });

    if (conflictingSchedule) {
      return res.status(400).json({ message: 'The selected time slot is already booked.' });
    }

    // Создание новой записи
    const newSchedule = new Schedule({
      instructor,
      student,
      date,
      startTime,
      endTime,
      status: 'scheduled',
    });

    await newSchedule.save();
    res.status(201).json({ message: 'Booking successful!', schedule: newSchedule });
  } catch (error) {
    res.status(500).json({ message: 'Error booking the schedule', error });
  }
});

// Получение доступных слотов инструктора
router.get('/available/:instructorId', async (req, res) => {
  try {
    const { instructorId } = req.params;
    const { date } = req.query; // Фильтрация по дате (если требуется)

    const query = { 
      instructor: instructorId, 
      status: 'scheduled',
    };

    if (date) {
      query.date = date; // Фильтр по конкретной дате
    }

    const availableSlots = await Schedule.find(query)
      .populate('instructor', 'name email') // Информация об инструкторе
      .select('date startTime endTime status'); // Только важные поля

    res.status(200).json(availableSlots);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching available slots', error });
  }
});

// Отмена записи
router.delete('/:scheduleId', async (req, res) => {
  try {
    const { scheduleId } = req.params;

    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    schedule.status = 'cancelled'; // Изменяем статус
    await schedule.save();

    res.status(200).json({ message: 'Schedule cancelled successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling schedule', error });
  }
});

// Получение записей пользователя
router.get('/user/:userId', async (req, res) => {
  try {
    const { userId } = req.params;

    const schedules = await Schedule.find({
      $or: [{ instructor: userId }, { student: userId }],
    })
      .populate('instructor student', 'name email')
      .select('date startTime endTime status');

    res.status(200).json(schedules);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user schedules', error });
  }
});

// Редактирование записи
router.put('/:scheduleId', async (req, res) => {
  try {
    const { scheduleId } = req.params;
    const updates = req.body; // Обновляемые поля

    const schedule = await Schedule.findByIdAndUpdate(scheduleId, updates, { new: true });

    if (!schedule) {
      return res.status(404).json({ message: 'Schedule not found' });
    }

    res.status(200).json({ message: 'Schedule updated successfully', schedule });
  } catch (error) {
    res.status(500).json({ message: 'Error updating schedule', error });
  }
});

module.exports = router;
