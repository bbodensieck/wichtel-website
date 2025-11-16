// Store participants
let participants = [];
let assignments = [];

// Add participant
function addParticipant() {
    const nameInput = document.getElementById('participantName');
    const emailInput = document.getElementById('participantEmail');
    
    const name = nameInput.value.trim();
    const email = emailInput.value.trim();
    
    if (!name) {
        alert('Bitte gib einen Namen ein!');
        return;
    }
    
    // Check if participant already exists
    if (participants.some(p => p.name.toLowerCase() === name.toLowerCase())) {
        alert('Dieser Teilnehmer existiert bereits!');
        return;
    }
    
    // Add participant
    participants.push({ name, email });
    
    // Clear inputs
    nameInput.value = '';
    emailInput.value = '';
    nameInput.focus();
    
    // Update display
    updateParticipantsList();
    updateDrawButton();
}

// Remove participant
function removeParticipant(index) {
    if (confirm(`Möchtest du ${participants[index].name} wirklich entfernen?`)) {
        participants.splice(index, 1);
        updateParticipantsList();
        updateDrawButton();
    }
}

// Update participants list display
function updateParticipantsList() {
    const list = document.getElementById('participantsList');
    const count = document.getElementById('participantCount');
    
    count.textContent = participants.length;
    
    if (participants.length === 0) {
        list.innerHTML = '<li style="text-align: center; color: #999; padding: 20px;">Noch keine Teilnehmer hinzugefügt</li>';
        return;
    }
    
    list.innerHTML = participants.map((participant, index) => `
        <li class="participant-item">
            <div class="participant-info">
                <span class="participant-name">🎅 ${participant.name}</span>
                ${participant.email ? `<span class="participant-email">${participant.email}</span>` : ''}
            </div>
            <button onclick="removeParticipant(${index})" class="btn-remove">Entfernen</button>
        </li>
    `).join('');
}

// Update draw button state
function updateDrawButton() {
    const drawButton = document.getElementById('drawButton');
    drawButton.disabled = participants.length < 3;
}

// Fisher-Yates shuffle algorithm
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Draw Wichtel (Secret Santa)
function drawWichtel() {
    if (participants.length < 3) {
        alert('Du benötigst mindestens 3 Teilnehmer für eine Auslosung!');
        return;
    }
    
    // Create a valid assignment where no one gifts to themselves
    let receivers;
    let isValid = false;
    let attempts = 0;
    const maxAttempts = 100;
    
    while (!isValid && attempts < maxAttempts) {
        receivers = shuffleArray(participants);
        
        // Check if anyone got themselves
        isValid = participants.every((giver, index) => 
            giver.name !== receivers[index].name
        );
        
        attempts++;
    }
    
    if (!isValid) {
        alert('Fehler beim Auslosen. Bitte versuche es erneut.');
        return;
    }
    
    // Create assignments
    assignments = participants.map((giver, index) => ({
        giver: giver.name,
        giverEmail: giver.email,
        receiver: receivers[index].name,
        receiverEmail: receivers[index].email
    }));
    
    // Show results
    displayResults();
}

// Display results
function displayResults() {
    const resultsSection = document.getElementById('resultsSection');
    const resultsList = document.getElementById('resultsList');
    
    resultsList.innerHTML = assignments.map(assignment => `
        <div class="result-item">
            <div class="result-giver">🎁 ${assignment.giver}</div>
            <div class="result-receiver">beschenkt → ${assignment.receiver}</div>
        </div>
    `).join('');
    
    resultsSection.style.display = 'block';
    resultsSection.scrollIntoView({ behavior: 'smooth' });
}

// Reset draw
function resetDraw() {
    if (confirm('Möchtest du wirklich eine neue Auslosung starten? Die aktuelle Zuteilung geht verloren.')) {
        assignments = [];
        document.getElementById('resultsSection').style.display = 'none';
    }
}

// Allow Enter key to add participant
document.addEventListener('DOMContentLoaded', function() {
    const nameInput = document.getElementById('participantName');
    const emailInput = document.getElementById('participantEmail');
    
    nameInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addParticipant();
        }
    });
    
    emailInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addParticipant();
        }
    });
    
    // Initial update
    updateParticipantsList();
    updateDrawButton();
});
