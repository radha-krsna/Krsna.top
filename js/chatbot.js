document.addEventListener('DOMContentLoaded', () => {
    const chatbotToggler = document.getElementById('chatbot-toggler');
    const chatbot = document.getElementById('chatbot');
    const chatbotForm = document.getElementById('chatbot-form');
    const chatbotMessages = document.getElementById('chatbot-messages');

    chatbotToggler.addEventListener('click', () => {
        chatbot.classList.toggle('open');
    });

    chatbotForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const userInput = document.getElementById('chatbot-input').value;
        addMessage(userInput, 'user');
        // Simple static responses
        const botResponse = getBotResponse(userInput);
        addMessage(botResponse, 'bot');
        document.getElementById('chatbot-input').value = '';
    });

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', `${sender}-message`);
        messageElement.textContent = message;
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function getBotResponse(input) {
        const lowerInput = input.toLowerCase();
        if (lowerInput.includes('hello')) {
            return 'Hello there! How can I help you?';
        } else if (lowerInput.includes('help')) {
            return 'I can answer simple questions. Try asking about Praveen.';
        } else if (lowerInput.includes('praveen')) {
            return 'Praveen is a Business Development Executive and AI Enthusiast.';
        } else {
            return 'I am a simple bot. I did not understand that.';
        }
    }
});
