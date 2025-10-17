// Функция для загрузки данных из JSON
async function loadData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error('Не удалось загрузить data.json');
        }
        return await response.json();
    } catch (error) {
        console.error('Ошибка загрузки данных:', error);
        return null;
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const data = await loadData();
    if (!data) return; // Если данные не загружены, прерываем выполнение

    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    const loginContainer = document.getElementById('login-container');
    const profileContainer = document.getElementById('profile-container');
    const welcomeHeader = document.getElementById('welcome-header');
    const songsList = document.getElementById('songs-list');
    const logoutBtn = document.getElementById('logout-btn');

    // Логика входа
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const inputUsername = usernameInput.value.trim().toLowerCase();
        // В задании указано "9е", поэтому проверяем и "9e" и "9е"
        const correctUsername = data.user.username.trim().toLowerCase() + (data.user.username.includes('9е') ? '' : '9е'); 
        const inputPassword = passwordInput.value.trim();
        const correctPassword = data.user.password.trim();

        // Проверка данных
        const isUsernameCorrect = inputUsername === data.user.username.toLowerCase() + '9е' || 
                                  inputUsername === 'айсулу9е'; // Для удобства, если введут без пробела
                                  
        if (isUsernameCorrect && inputPassword === correctPassword) {
            // Успешный вход: показываем личный кабинет
            loginContainer.classList.add('hidden');
            profileContainer.classList.remove('hidden');
            
            // Получаем имя для приветствия (первая буква заглавная)
            const userNameDisplay = data.user.username.charAt(0).toUpperCase() + data.user.username.slice(1);
            welcomeHeader.textContent = `Добро пожаловать, ${userNameDisplay}!`;
            
            renderSongs(data.songs);
        } else {
            // Ошибка входа
            errorMessage.textContent = 'Неправильное имя пользователя или пароль!';
            setTimeout(() => errorMessage.textContent = '', 3000); // Очищаем сообщение через 3 секунды
        }
    });

    // Функция для отображения списка песен
    function renderSongs(songs) {
        songsList.innerHTML = ''; // Очищаем список
        songs.forEach(song => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="song-info">
                    <div class="song-title">${song.title}</div>
                    <div class="song-artist">Исполнитель: ${song.artist}</div>
                </div>
                <button class="play-btn">Проигрывать</button>
            `;
            
            // Добавляем обработчик для кнопки "Проигрывать"
            const playButton = listItem.querySelector('.play-btn');
            playButton.addEventListener('click', () => {
                alert(`Начинается воспроизведение: ${song.artist} - ${song.title}`);
                // Здесь можно добавить реальную логику проигрывания
            });

            songsList.appendChild(listItem);
        });
    }

    // Логика кнопки "Выход"
    logoutBtn.addEventListener('click', () => {
        profileContainer.classList.add('hidden');
        loginContainer.classList.remove('hidden');
        // Очистка полей и сообщения об ошибке
        usernameInput.value = '';
        passwordInput.value = '';
        errorMessage.textContent = '';
        alert('Вы вышли из системы.');
    });
});