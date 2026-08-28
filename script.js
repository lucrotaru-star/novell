document.getElementById('downloadBtn').addEventListener('click', function() {
    // Используем строго латиницу для стабильного скачивания в любом браузере
    const exePath = './assets/Setup_Novell.exe'; 
    
    const link = document.createElement('a');
    link.href = exePath;
    
    // Имя, под которым файл гарантированно сохранится у пользователя
    link.download = 'Setup_Novell.exe'; 
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});
