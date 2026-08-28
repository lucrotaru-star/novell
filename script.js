document.getElementById('downloadBtn').addEventListener('click', function() {
    // Укажите точное имя вашего exe файла, который будет лежать в папке assets
    const exePath = './assets/Установка_Новеллы.exe'; 
    
    // Создаем виртуальную ссылку для скачивания файла
    const link = document.createElement('a');
    link.href = exePath;
    
    // Имя файла, под которым он сохранится у пользователя
    link.download = 'Установка_Новеллы'; 
    
    // Добавляем в документ, имитируем клик и удаляем
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
