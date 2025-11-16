// Store messages
let messages = [];

// Countdown to December 1st, 2025
function updateCountdown() {
    const targetDate = new Date('2025-12-01T00:00:00');
    const now = new Date();
    const difference = targetDate - now;

    if (difference <= 0) {
        document.getElementById('days').textContent = '0';
        document.getElementById('hours').textContent = '0';
        document.getElementById('minutes').textContent = '0';
        document.getElementById('seconds').textContent = '0';
        return;
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = days;
    document.getElementById('hours').textContent = hours;
    document.getElementById('minutes').textContent = minutes;
    document.getElementById('seconds').textContent = seconds;
}

// Add message
function addMessage() {
    const nameInput = document.getElementById('messageName');
    const textInput = document.getElementById('messageText');
    
    const name = nameInput.value.trim();
    const text = textInput.value.trim();
    
    if (!name || !text) {
        alert('Bitte fülle beide Felder aus!');
        return;
    }
    
    // Add message
    const message = {
        name: name,
        text: text,
        timestamp: new Date()
    };
    
    messages.push(message);
    
    // Clear inputs
    nameInput.value = '';
    textInput.value = '';
    nameInput.focus();
    
    // Update display
    displayMessages();
    
    // Show confirmation
    alert('Vielen Dank für deine Nachricht! Alvar freut sich sehr! 🎄');
}

// Display messages
function displayMessages() {
    const display = document.getElementById('messagesDisplay');
    
    if (messages.length === 0) {
        display.innerHTML = '<p class="no-messages">Noch keine Nachrichten. Sei der Erste, der Alvar schreibt!</p>';
        return;
    }
    
    display.innerHTML = messages.map((message, index) => `
        <div class="message-item">
            <div class="message-header">
                <span class="message-author">✉️ ${message.name}</span>
                <span class="message-time">${formatDate(message.timestamp)}</span>
            </div>
            <div class="message-content">${message.text}</div>
        </div>
    `).reverse().join('');
}

// Format date
function formatDate(date) {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('de-DE', options);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Start countdown
    updateCountdown();
    setInterval(updateCountdown, 1000);
    
    // Display initial messages
    displayMessages();
    
    // Add Enter key support for message form
    const nameInput = document.getElementById('messageName');
    const textInput = document.getElementById('messageText');
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            textInput.focus();
        }
    });
});
