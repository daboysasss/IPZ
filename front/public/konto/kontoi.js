document.addEventListener('DOMContentLoaded', async () => {
    // Получаем токен из localStorage
    const token = localStorage.getItem('token');
    if (!token) {
        alert('Please log in first!');
        window.location.href = 'login.html';  // Перекидываем на страницу логина, если токен не найден
        return;
    }

    try {
        // Делаем запрос на сервер для получения данных пользователя
        const response = await fetch('http://localhost:5000/api/user', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Передаем токен в заголовке
            },
        });

        if (!response.ok) {
            if (response.status === 401 || response.status === 403) {
                // Если токен недействителен или истек
                alert('Session expired. Please log in again.');
                localStorage.removeItem('token'); // Удаляем старый токен
                window.location.href = 'login.html'; // Перекидываем на страницу логина
                return;
            }
            throw new Error(`Server error: ${response.statusText}`);
        }

        const userData = await response.json();

        // Проверяем наличие необходимых полей в ответе
        if (!userData.firstName || !userData.lastName || !userData.role) {
            throw new Error('Incomplete user data received from server');
        }

        console.log(userData);  // Логируем данные для отладки

        // Обновляем элементы на странице с данными пользователя
        const userNameElement = document.getElementById('user-name');
        const userRoleElement = document.getElementById('user-role');

        if (userNameElement) {
            userNameElement.textContent = `${userData.firstName} ${userData.lastName}`;
        } else {
            console.warn('Element with ID "user-name" not found in DOM');
        }

        if (userRoleElement) {
            userRoleElement.textContent = userData.role.charAt(0).toUpperCase() + userData.role.slice(1);
        } else {
            console.warn('Element with ID "user-role" not found in DOM');
        }

    } catch (error) {
        console.error('Error fetching user data:', error);
        alert('An error occurred while fetching user data. Please try again later.');
    }
});
