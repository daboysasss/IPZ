document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.querySelector('.register-form');

    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.querySelector('#register-name').value;
        const email = document.querySelector('#register-email').value;
        const password = document.querySelector('#register-password').value;
        const repeatPassword = document.querySelector('#repeat-password').value;
        const role = document.querySelector('#register-role').value;

        if (password !== repeatPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);
            alert('Registration successful! You can now log in.');
            window.location.href = 'log.html';
        } catch (error) {
            console.error('Error:', error.message);
            alert('Registration failed: ' + error.message);
        }
    });
});
