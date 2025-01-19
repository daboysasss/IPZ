document.addEventListener('DOMContentLoaded', () => {
    const services = document.querySelectorAll('.service');

    services.forEach((service, index) => {
        const toggleButton = service.querySelector('.toggle-button');

        // Создаем скрытый контейнер для деталей услуги
        const detailsContainer = document.createElement('div');
        detailsContainer.classList.add('service-details');
        detailsContainer.style.display = 'none'; // Скрываем по умолчанию

        // Данные для категорий (добавляем данные для каждого индекса)
        if (index === 0) { // Категория B | BE
            detailsContainer.innerHTML = `
                <div style="border: 3px solid #FF8000; border-radius: 21px; margin-top: 10px; padding: 10px; background: #fff;">
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. B - bez teorii: <span style="color: orange;">3350 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. B - stacjonarny: <span style="color: orange;">3650 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. B - indywidualny: <span style="color: orange;">4400 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. BE - standardowy: <span style="color: orange;">1980 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. BE - indywidualny: <span style="color: orange;">2480 PLN</span></a></li>
                    </ul>
                </div>
            `;
        } else if (index === 1) { // Категория A | A2 | A1 | AM
            detailsContainer.innerHTML = `
                <div style="border: 3px solid #FF8000; border-radius: 21px; margin-top: 10px; padding: 10px; background: #fff;">
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A - bez teorii: <span style="color: orange;">3290 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A - indywidualny: <span style="color: orange;">3990 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A2 - bez teorii: <span style="color: orange;">3290 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A2 - indywidualny: <span style="color: orange;">3990 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A2 po A1: <span style="color: orange;">2090 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A1 - bez teorii: <span style="color: orange;">3290 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. A1 - indywidualny: <span style="color: orange;">3990 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. AM - bez teorii: <span style="color: orange;">2790 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. AM - indywidualny: <span style="color: orange;">3490 PLN</span></a></li>
                    </ul>
                </div>
            `;
        } else if (index === 2) { // Категория D | DE
            detailsContainer.innerHTML = `
                <div style="border: 3px solid #FF8000; border-radius: 21px; margin-top: 10px; padding: 10px; background: #fff;">
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. D po B - bez teorii: <span style="color: orange;">8080 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. D po B - standardowy: <span style="color: orange;">8280 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs kat. D po B - indywidualny: <span style="color: orange;">9280 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs łączony D: <span style="color: orange;">7980 PLN</span></a></li>
                    </ul>
                </div>
            `;
        } else if (index === 3) { // Категория Premium
            detailsContainer.innerHTML = `
                <div style="border: 3px solid #FF8000; border-radius: 21px; margin-top: 10px; padding: 10px; background: #fff;">
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Kurs Premium: <span style="color: orange;">4000 PLN</span></a></li>
                    </ul>
                </div>
            `;
        } else if (index === 4) { // Инструктор
            detailsContainer.innerHTML = `
                <div style="border: 3px solid #FF8000; border-radius: 21px; margin-top: 10px; padding: 10px; background: #fff;">
                    <ul style="list-style-type: disc; padding-left: 20px;">
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. A - kurs online: <span style="color: orange;">4200 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. B - kurs online: <span style="color: orange;">4200 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. D - kurs online: <span style="color: orange;">3100 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. A - kurs stacjonarny: <span style="color: orange;">5100 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. B - kurs stacjonarny: <span style="color: orange;">5100 PLN</span></a></li>
                        <li><a href="https://forms.gle/WjQmXrmKEJwcvp9dA" target="_blank">Instruktor nauki jazdy kat. D - kurs stacjonarny: <span style="color: orange;">3900 PLN</span></a></li>
                    </ul>
                </div>
            `;
        }

        service.after(detailsContainer); // Добавляем контейнер после сегмента услуги

        toggleButton.addEventListener('click', () => {
            const isVisible = detailsContainer.style.display === 'block';
            detailsContainer.style.display = isVisible ? 'none' : 'block';

            // Меняем иконку на стрелке (вправо или вниз)
            const svgPath = toggleButton.querySelector('path');
            if (isVisible) {
                svgPath.setAttribute('d', 'M9 18l6-6-6-6'); // Вправо
            } else {
                svgPath.setAttribute('d', 'M6 9l6 6 6-6'); // Вниз
            }
        });
    });

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
