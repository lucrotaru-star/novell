document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gamesContainer');

    // Загружаем список игр из JSON-файла
    fetch('./games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить список игр');
            }
            return response.json();
        })
        .then(games => {
            // Перебираем каждую игру из списка и создаем для нее плитку
            games.forEach(game => {
                const card = document.createElement('div');
                card.className = 'card-container';

                card.innerHTML = `
                    <div>
                        <div class="logo-area">
                            <div class="app-icon">${game.icon}</div>
                        </div>
                        <h1 class="title">${game.title}</h1>
                        <p class="subtitle">${game.subtitle}</p>
                        <div class="meta-info">
                            <span class="badge">${game.version}</span>
                            <span class="badge">${game.platform}</span>
                        </div>
                    </div>
                    <button class="download-button" data-file="${game.file_name}">
                        <span class="icon">📥</span>
                        <span class="text">Скачать (.exe)</span>
                    </button>
                `;

                // Навешиваем событие скачивания на кнопку именно этой плитки
                const downloadBtn = card.querySelector('.download-button');
                downloadBtn.addEventListener('click', (e) => {
                    const fileName = e.currentTarget.getAttribute('data-file');
                    const exePath = `./assets/${fileName}`;

                    const link = document.createElement('a');
                    link.href = exePath;
                    link.download = fileName;

                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                });

                // Добавляем готовую плитку на страницу
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            container.innerHTML = `<p style="color: #ff7b72; font-size: 18px;">Ошибка загрузки каталога игр.</p>`;
        });
});
