document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value.trim();
        const password = document.querySelector('#password').value.trim();

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Ошибка входа');
            }

            const data = await response.json();
            localStorage.setItem('token', data.token);

            // Извлечение userId из токена
            const payload = JSON.parse(atob(data.token.split('.')[1])); // Декодируем токен
            localStorage.setItem('userId', payload.userId); // Сохраняем userId в localStorage

            console.log('Login successful, User ID:', payload.userId);

            // Перенаправление в зависимости от роли
            if (payload.role === 'student') {
                location.replace('kontos.html');
            } else if (payload.role === 'instructor') {
                location.replace('kontoi.html');
            } else {
                alert('Unknown role');
            }
        } catch (error) {
            console.error('Error:', error.message);
            alert('Login failed: ' + error.message);
        }
    });
});
