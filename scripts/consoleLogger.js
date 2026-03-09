document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('formValid', function(event) {
        // Получаем данные формы из события
        const formData = event.detail;
        
        // Очищаем консоль для наглядности (опционально)
        console.clear();
        
        // Создаем разделитель для красоты
        console.log('%c ДАННЫЕ ФОРМЫ ОБРАТНОЙ СВЯЗИ', 'font-size: 16px; font-weight: bold; color: #485fc7;');
        console.log('═══════════════════════════════════════');
        
        // Построчный вывод данных с иконками
        console.log('%c ФИО:', 'font-weight: bold; color: #2c5530;', formData.fullname);
        console.log('%c Телефон:', 'font-weight: bold; color: #2c5530;', formData.phone);
        console.log('%c Email:', 'font-weight: bold; color: #2c5530;', formData.email);
        console.log('%c Тема:', 'font-weight: bold; color: #2c5530;', formData.subject);
        console.log('%c Сообщение:', 'font-weight: bold; color: #2c5530;', formData.message);
        console.log('%c Согласие:', 'font-weight: bold; color: #2c5530;', formData.agreement ? 'Да' : 'Нет');
        
        console.log('═══════════════════════════════════════');
        
        // Вывод временной метки
        const timestamp = new Date().toLocaleString('ru-RU');
        console.log(` Отправлено: ${timestamp}`);
        
        // Вывод в виде таблицы (альтернативный вариант)
        console.log('%c Табличное представление:', 'font-weight: bold; color: #485fc7;');
        console.table({
            'ФИО': formData.fullname,
            'Телефон': formData.phone,
            'Email': formData.email,
            'Тема': formData.subject,
            'Сообщение': formData.message,
            'Согласие': formData.agreement ? 'Да' : 'Нет'
        });
        
        // Дополнительная информация
        console.log('%c Спасибо за обращение! Мы свяжемся с вами в ближайшее время.', 'color: #27ae60; font-style: italic;');
    });
    
    console.log(' Логгер данных формы загружен и готов к работе');
});