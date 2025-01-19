document.addEventListener('DOMContentLoaded', () => {
    const categories = ['A', 'B', 'D'];

    categories.forEach(category => {
        // Получаем результат из localStorage для каждой категории
        const result = localStorage.getItem(`testResult_${category}`) || '0';
        // Находим элемент прогресса для каждой категории
        const progressCircle = document.querySelector(`.progress-circle[data-category="${category}"]`);

        if (progressCircle) {
            progressCircle.textContent = `${result}%`; // Обновляем текст прогресса
            progressCircle.style.color = parseInt(result) > 0 ? 'green' : 'red'; // Если результат больше 0, ставим зеленый цвет
        }

        // Реализация смены темы
        const themeToggle = document.getElementById('themeToggle');
        const body = document.body;

        // Устанавливаем начальную тему из localStorage
        const savedTheme = localStorage.getItem('theme') || 'light-theme';
        body.className = savedTheme;
        themeToggle.textContent = savedTheme === 'dark-theme' ? '🌙' : '☀️';

        // Слушатель для смены темы
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('dark-theme');
            body.classList.toggle('light-theme');

            themeToggle.textContent = body.classList.contains('dark-theme') ? '🌙' : '☀️';

            // Сохраняем текущую тему в localStorage
            const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
            localStorage.setItem('theme', currentTheme);
        });
    });
});
