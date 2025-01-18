document.addEventListener('DOMContentLoaded', () => {
    const scheduleBody = document.getElementById('schedule-body');
    const addTaskButton = document.getElementById('add-task');
    const taskModal = document.getElementById('task-modal');
    const saveTaskButton = document.getElementById('save-task');
    const cancelTaskButton = document.getElementById('cancel-task');
    const taskDateInput = document.getElementById('task-date');
    const taskNameInput = document.getElementById('task-name');
    
    // Для списка инструкторов
    const showInstructorsButton = document.getElementById('show-instructors');
    const instructorsModal = document.getElementById('instructors-modal');
    const closeInstructorsModalButton = document.getElementById('close-instructors-modal');
    const instructorsList = document.getElementById('instructors-list');

    // Функция для загрузки расписания с сервера
    async function loadSchedule() {
        try {
            const response = await fetch('http://localhost:5000/api/schedule');
            const schedule = await response.json();
            
            schedule.forEach(task => {
                const targetCell = Array.from(scheduleBody.querySelectorAll('td')).find(
                    (cell) => cell.dataset.date === `Week ${task.week} - Day ${task.day}`
                );
                
                if (targetCell) {
                    targetCell.textContent = task.task;
                    targetCell.classList.remove('empty');
                    targetCell.classList.add('occupied');
                }
            });
        } catch (error) {
            console.error('Error loading schedule:', error);
        }
    }

    // Функция для сохранения задачи на сервере
    async function saveTaskToServer(date, taskName) {
        const [week, day] = date.split(' - ');
        const weekNumber = parseInt(week.replace('Week ', ''));
        const dayNumber = parseInt(day.replace('Day ', ''));
    
        const taskData = {
            week: weekNumber,
            day: dayNumber,
            hour: '09:00',
            task: taskName
        };
    
        try {
            const response = await fetch('http://localhost:5000/api/schedule', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(taskData)
            });
            
            const newTask = await response.json();
            console.log('Task added:', newTask);
        } catch (error) {
            console.error('Error saving task:', error);
        }
    }

    // Функция для получения списка инструкторов с сервера
    async function loadInstructors() {
        try {
            const response = await fetch('http://localhost:5000/api/instructors');
            const instructors = await response.json();

            // Очистка текущего списка
            instructorsList.innerHTML = '';

            // Отображение списка инструкторов
            instructors.forEach(instructor => {
                const listItem = document.createElement('li');
                listItem.textContent = instructor.name; // Предполагается, что объект содержит поле 'name'
                instructorsList.appendChild(listItem);
            });

            // Открытие модального окна
            instructorsModal.classList.remove('hidden');
        } catch (error) {
            console.error('Error loading instructors:', error);
        }
    }

    // Обработчик для кнопки "Инструктор"
    showInstructorsButton.addEventListener('click', () => {
        loadInstructors(); // Загружаем и показываем список инструкторов
    });

    // Закрытие модального окна
    closeInstructorsModalButton.addEventListener('click', () => {
        instructorsModal.classList.add('hidden');
    });

    // Генерация расписания
    function generateSchedule() {
        for (let week = 0; week < 4; week++) {
            const row = document.createElement('tr');
            const dateCell = document.createElement('td');
            dateCell.textContent = `Week ${week + 1}`;
            row.appendChild(dateCell);
    
            for (let day = 1; day <= 7; day++) {
                const cell = document.createElement('td');
                cell.classList.add('empty');
                cell.dataset.date = `Week ${week + 1} - Day ${day}`;
                cell.addEventListener('click', () => toggleCell(cell));
                row.appendChild(cell);
            }
    
            scheduleBody.appendChild(row);
        }
    }
  
    // Переключение состояния ячейки
    function toggleCell(cell) {
        const date = cell.dataset.date;
        if (cell.classList.contains('occupied')) {
            removeTaskFromServer(date);
            cell.textContent = '';
            cell.classList.remove('occupied');
            cell.classList.add('empty');
        } else {
            const taskName = prompt('Enter task name');
            if (taskName) {
                saveTaskToServer(date, taskName);
                cell.textContent = taskName;
                cell.classList.remove('empty');
                cell.classList.add('occupied');
            }
        }
    }

    // Открытие модального окна для добавления задачи
    addTaskButton.addEventListener('click', () => {
        taskModal.classList.remove('hidden');
    });

    // Закрытие модального окна для добавления задачи
    cancelTaskButton.addEventListener('click', () => {
        taskModal.classList.add('hidden');
        clearModalInputs();
    });

    // Сохранение задачи
    saveTaskButton.addEventListener('click', () => {
        const date = taskDateInput.value;
        const taskName = taskNameInput.value;

        if (date && taskName) {
            saveTaskToServer(date, taskName);
            taskModal.classList.add('hidden');
            clearModalInputs();
        } else {
            alert('Wypełnij wszystkie pola!');
        }
    });

    // Очистка данных модального окна
    function clearModalInputs() {
        taskDateInput.value = '';
        taskNameInput.value = '';
    }

    // Инициализация таблицы расписания
    generateSchedule();
    loadSchedule(); // Загружаем расписание с сервера
});
