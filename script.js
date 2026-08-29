document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('gamesContainer');

    fetch('./games.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Не удалось загрузить список проектов');
            }
            return response.json();
        })
        .then(projects => {
            projects.forEach(project => {
                const card = document.createElement('div');
                card.className = 'card-container';

                // Меняем только текст и иконку внутри кнопки, стиль не трогаем
                const isSite = project.type === 'site';
                const buttonText = isSite ? 'Открыть' : 'Скачать (.exe)';
                const buttonIcon = isSite ? '🔗' : '📥';

                card.innerHTML = `
                    <div>
                        <div class="logo-area">
                            <div class="app-icon">${project.icon}</div>
                        </div>
                        <h1 class="title">${project.title}</h1>
                        <p class="subtitle">${project.subtitle}</p>
                        <div class="meta-info">
                            <span class="badge">${project.version}</span>
                            <span class="badge">${project.platform}</span>
                        </div>
                    </div>
                    <button class="download-button">
                        <span class="icon">${buttonIcon}</span>
                        <span class="text">${buttonText}</span>
                    </button>
                `;

                // Настраиваем действие при клике
                const actionBtn = card.querySelector('.download-button');
                actionBtn.addEventListener('click', () => {
                    if (project.type === 'site') {
                        // Если сайт — открываем ссылку в новой вкладке
                        window.open(project.url, '_blank', 'noopener,noreferrer');
                    } else {
                        // Если программа — скачиваем файл из assets
                        const exePath = `./assets/${project.file_name}`;
                        const link = document.createElement('a');
                        link.href = exePath;
                        link.download = project.file_name;
                        document.body.appendChild(link);
                        link.click();
                        document.body.removeChild(link);
                    }
                });

                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Ошибка:', error);
            container.innerHTML = `<p style="color: #ff7b72; font-size: 18px;">Ошибка загрузки каталога.</p>`;
        });
});
