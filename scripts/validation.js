document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('feedbackForm');
    if (!form) return;

    form.addEventListener('submit', function(event) {
        event.preventDefault();

        clearErrors();

        let isValid = true;

        // 1. Проверка ФИО (не пустое, минимум 2 слова)
        const fullname = document.getElementById('fullname');
        const fullnameValue = fullname.value.trim();
        
        if (fullnameValue === '') {
            showError(fullname, 'Введите фамилию и имя');
            isValid = false;
        } else {
            const words = fullnameValue.split(' ').filter(word => word.length > 0);
            if (words.length < 2) {
                showError(fullname, 'Введите минимум 2 слова (фамилию и имя)');
                isValid = false;
            }
        }

        // 2. Проверка телефона (не пустой, минимум 10 цифр)
        const phone = document.getElementById('phone');
        const phoneValue = phone.value.trim();
        const phoneDigits = phoneValue.replace(/\D/g, '');
        
        if (phoneValue === '') {
            showError(phone, 'Введите номер телефона');
            isValid = false;
        } else if (phoneDigits.length < 10) {
            showError(phone, 'Введите минимум 10 цифр номера');
            isValid = false;
        }

        // 3. Проверка email (не пустой, содержит @ и .)
        const email = document.getElementById('email');
        const emailValue = email.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        
        if (emailValue === '') {
            showError(email, 'Введите email');
            isValid = false;
        } else if (!emailPattern.test(emailValue)) {
            showError(email, 'Введите корректный email (пример: name@domain.ru)');
            isValid = false;
        }

        // 4. Проверка темы (выбрана)
        const subject = document.getElementById('subject');
        const subjectValue = subject.value;
        
        if (!subjectValue) {
            showError(subject, 'Выберите тему обращения');
            isValid = false;
        }

        // 5. Проверка согласия (checkbox)
        const agreement = document.getElementById('agreement');
        const agreementHelp = document.getElementById('agreementHelp');
        
        if (!agreement.checked) {
            agreementHelp.textContent = 'Необходимо согласие на обработку данных';
            agreementHelp.classList.add('is-danger');
            isValid = false;
        }

        // Если все поля валидны
        if (isValid) {
            const formData = {
                fullname: fullnameValue,
                phone: phoneValue,
                email: emailValue,
                subject: subject.options[subject.selectedIndex].text,
                message: document.getElementById('message').value.trim() || '(не заполнено)',
                agreement: agreement.checked
            };
            
            const event = new CustomEvent('formValid', { detail: formData });
            document.dispatchEvent(event);
            
            const successMessage = document.getElementById('successMessage');
            if (successMessage) {
                successMessage.classList.remove('is-hidden');
                
                successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
                
                setTimeout(() => {
                    successMessage.classList.add('is-hidden');
                }, 5000);
            }

        }
    });

    // Функция показа ошибки
    function showError(input, message) {
        input.classList.add('is-danger');
        
        const help = document.createElement('p');
        help.classList.add('help', 'is-danger');
        help.textContent = message;
        
        const parent = input.closest('.field');
        if (parent) {
            parent.appendChild(help);
        } else {
            input.parentNode.parentNode.appendChild(help);
        }
    }

    // Функция очистки ошибок
    function clearErrors() {
        document.querySelectorAll('.input.is-danger, .textarea.is-danger, .select.is-danger').forEach(el => {
            el.classList.remove('is-danger');
        });
        
        document.querySelectorAll('.help.is-danger').forEach(el => el.remove());
        
        const agreementHelp = document.getElementById('agreementHelp');
        if (agreementHelp) {
            agreementHelp.textContent = '';
            agreementHelp.classList.remove('is-danger');
        }
    }

    // Сброс ошибки при вводе в поле
    document.querySelectorAll('.input, .textarea, select').forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('is-danger');
            
            const parent = this.closest('.field');
            if (parent) {
                const errors = parent.querySelectorAll('.help.is-danger');
                errors.forEach(el => el.remove());
            }
        });
        
        if (input.tagName === 'SELECT') {
            input.addEventListener('change', function() {
                this.classList.remove('is-danger');
                
                const parent = this.closest('.field');
                if (parent) {
                    const errors = parent.querySelectorAll('.help.is-danger');
                    errors.forEach(el => el.remove());
                }
            });
        }
    });

    const agreement = document.getElementById('agreement');
    if (agreement) {
        agreement.addEventListener('change', function() {
            const agreementHelp = document.getElementById('agreementHelp');
            if (agreementHelp) {
                agreementHelp.textContent = '';
                agreementHelp.classList.remove('is-danger');
            }
        });
    }
});