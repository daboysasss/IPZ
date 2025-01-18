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
    });
});
