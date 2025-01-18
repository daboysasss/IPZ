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
          localStorage.setItem('token', data.token);
          alert('Login successful!');
      } catch (error) {
          console.error('Error:', error.message);
          alert('Login failed: ' + error.message);
      }
  });
});
