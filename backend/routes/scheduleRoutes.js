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

module.exports = router;
