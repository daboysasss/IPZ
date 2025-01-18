document.addEventListener('DOMContentLoaded', () => {
    // Получаем форму по id
    const form = document.getElementById('remind-password-form');

    // Если форма найдена, добавляем обработчик
    if (form) {
        form.addEventListener('submit', async (event) => {
            event.preventDefault(); // Отменяем стандартную отправку формы

            const email = document.getElementById('email').value; // Получаем email

            try {
                const response = await fetch('http://localhost:5000/api/auth/forgot-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email }),
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || 'Failed to send email');
                }

                alert('An email with your password has been sent!');
                window.location.href = 'log.html'; // Перенаправление на страницу входа
            } catch (error) {
                console.error('Error:', error.message);
                alert('Error: ' + error.message); // Вывод ошибки, если она произошла
            }
        });
    } else {
        console.error('Form with ID "remind-password-form" not found.');
    }
});
