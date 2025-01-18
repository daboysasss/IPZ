document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('.login-form');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.querySelector('#email').value;
        const password = document.querySelector('#password').value;

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await response.json();
            console.log('Login successful:', data);
            console.log('User role:', data.role);  // Логируем роль

            localStorage.setItem('token', data.token);

            // Перенаправление в зависимости от роли
            if (data.role === 'student') {
                console.log('Redirecting to student account...');
                location.replace('kontos.html');  // Студенческий аккаунт
            } else if (data.role === 'instructor') {
                console.log('Redirecting to instructor account...');
                location.replace('kontoi.html');  // Инструкторский аккаунт
            } else {
                alert('Unknown role');
            }

            alert('Login successful!');
        } catch (error) {
            console.error('Error:', error.message);
            alert('Login failed: ' + error.message);
        }
    });
});
