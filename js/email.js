// Inicialização do EmailJS
(function() {
    // Inicializa o EmailJS com seu User ID público
    emailjs.init("b5LQtobd6Vp7a-Vem");
})();

// Função para mostrar notificações
function showNotification(message, type = 'info') {
    // Remove notificações existentes
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Cria o elemento da notificação
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Adiciona a notificação ao corpo do documento
    document.body.appendChild(notification);
    
    // Remove a notificação após 5 segundos
    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Função para enviar o email
function sendEmail(e) {
    e.preventDefault();
    
    // Mostra o indicador de carregamento
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Enviando...';
    submitBtn.disabled = true;

    // Obtém os dados do formulário
    const formData = {
        from_name: document.getElementById('name').value,
        from_email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        subject: document.getElementById('subject').value,
        message: document.getElementById('message').value
    };

    console.log("Enviando dados:", formData); // Adicione esta linha para depuração

    // Envia o email usando o EmailJS
    emailjs.send('service_045ar3i', 'template_nrzcdmi', formData)
        .then(function(response) {
            console.log('SUCESSO:', response);
            showNotification('Mensagem enviada com sucesso!', 'success');
            document.getElementById('contact-form').reset();
        }, function(error) {
            console.error('ERRO:', error);
            showNotification('Erro ao enviar a mensagem. Tente novamente mais tarde.', 'error');
        })
        .finally(() => {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        });
}

// Adiciona o evento de submit ao formulário quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', sendEmail);
    } else {
        console.error("Formulário não encontrado! Verifique se o ID está correto.");
    }
});