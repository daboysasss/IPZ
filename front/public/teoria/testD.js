document.addEventListener('DOMContentLoaded', function () {
    const questions = document.querySelectorAll('.question');
    const submitBtn = document.querySelector('.submit-btn');
    let correctAnswers = 0;

    // Add click event listener for options
    questions.forEach(question => {
        const options = question.querySelectorAll('.option');
        const explanation = question.querySelector('.explanation'); // Get explanation block

        options.forEach(option => {
            option.addEventListener('click', function () {
                // Disable further clicks in this question
                options.forEach(opt => opt.style.pointerEvents = 'none');

                // Check if the selected option is correct or not
                const isCorrect = this.getAttribute('data-correct') === 'true';

                // Apply the correct or incorrect class immediately
                if (isCorrect) {
                    this.classList.add('correct');
                    correctAnswers++; // Increment the count of correct answers
                } else {
                    this.classList.add('incorrect');
                }

                // Highlight the correct answer in green if it wasn't selected
                options.forEach(opt => {
                    if (opt !== this && opt.getAttribute('data-correct') === 'true') {
                        opt.classList.add('correct');
                    }
                });

                // Show explanation after selecting an option
                explanation.style.display = 'block';
            });
        });
    });

    // Add click event for submit button
    submitBtn.addEventListener('click', function () {
        const totalQuestions = questions.length;
        const resultPercentage = Math.round((correctAnswers / totalQuestions) * 100);

        // Save result in localStorage for category D
        localStorage.setItem('testResult_D', resultPercentage);

        // Get the user ID or any other identifier (you need to handle user authentication separately)
        const userId = localStorage.getItem('userId'); // Assuming the user ID is saved in localStorage

        // Send result to the server (Example using fetch)
        if (userId) {
            const testResult = {
                userId: userId,
                resultPercentage: resultPercentage,
                testName: 'Test D', // Replace with your actual test name
            };

            // Send the result to your backend API (replace 'your_api_endpoint' with the actual endpoint)
            fetch('https://yourserver.com/api/saveTestResult', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(testResult),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert(`Twój wynik: ${resultPercentage}%. Zapisano wynik testu!`);
                } else {
                    alert('Wystąpił problem przy zapisywaniu wyniku.');
                }
            })
            .catch(error => {
                console.error('Error saving test result:', error);
                alert('Wystąpił problem przy zapisywaniu wyniku.');
            });
        } else {
            alert('Brak zalogowanego użytkownika.');
        }

        window.location.href = 'theory.html'; // Redirect to main page
    });

    // Day/Night Mode Functionality
    const themeToggle = document.createElement('button');
    themeToggle.id = 'themeToggle';
    themeToggle.textContent = '☀️';
    themeToggle.style.position = 'fixed';
    themeToggle.style.top = '20px';
    themeToggle.style.right = '20px';
    themeToggle.style.background = 'none';
    themeToggle.style.border = 'none';
    themeToggle.style.fontSize = '24px';
    themeToggle.style.cursor = 'pointer';
    themeToggle.style.transition = 'transform 0.3s';
    document.body.appendChild(themeToggle);

    const body = document.body;

    // Set initial theme based on localStorage
    const savedTheme = localStorage.getItem('theme') || 'light-theme';
    body.className = savedTheme;
    themeToggle.textContent = savedTheme === 'dark-theme' ? '🌙' : '☀️';

    // Add event listener for theme toggle
    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-theme');
        body.classList.toggle('light-theme');

        // Update button text
        themeToggle.textContent = body.classList.contains('dark-theme') ? '🌙' : '☀️';

        // Save current theme to localStorage
        const currentTheme = body.classList.contains('dark-theme') ? 'dark-theme' : 'light-theme';
        localStorage.setItem('theme', currentTheme);
    });
});
