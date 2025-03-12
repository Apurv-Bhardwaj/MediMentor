// DOM Elements
const chatMessages = document.getElementById('chatMessages');
const userInput = document.getElementById('userInput');
const sendButton = document.getElementById('sendMessage');
const voiceButton = document.getElementById('voiceInput');
const typingIndicator = document.getElementById('typingIndicator');
const darkModeToggle = document.getElementById('darkModeToggle');
const menuButton = document.getElementById('menuButton');
const sidePanel = document.getElementById('sidePanel');
const closeSidePanel = document.getElementById('closeSidePanel');
const emergencyBtn = document.getElementById('emergencyBtn');

// State
let isDarkMode = false;
const emergencyKeywords = ['emergency', 'urgent', 'heart attack', 'stroke', 'bleeding', 'unconscious', 'severe', 'critical'];

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Check system preference for dark mode
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        toggleDarkMode();
    }
});

sendButton.addEventListener('click', handleSendMessage);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleSendMessage();
    }
});

darkModeToggle.addEventListener('click', toggleDarkMode);
menuButton.addEventListener('click', toggleSidePanel);
closeSidePanel.addEventListener('click', toggleSidePanel);
voiceButton.addEventListener('click', toggleVoiceInput);

// Functions
function handleSendMessage() {
    const message = userInput.value.trim();
    if (message) {
        addMessage(message, 'user');
        userInput.value = '';
        checkForEmergency(message);
        simulateBotResponse(message);
    }
}

function addMessage(message, sender) {
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message', `${sender}-message`);
    
    const messageContent = document.createElement('div');
    messageContent.classList.add('message-content');
    messageContent.textContent = message;
    
    messageDiv.appendChild(messageContent);
    chatMessages.appendChild(messageDiv);
    
    // Scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function simulateBotResponse(userMessage) {
    showTypingIndicator();
    
    // Simulate API response time
    setTimeout(() => {
        hideTypingIndicator();
        const responses = {
            default: "I understand your concern. While I can provide general health information, please consult a healthcare professional for medical advice.",
            emergency: "This seems like an emergency situation. Please call emergency services immediately (911 in the US).",
            greeting: "Hello! How can I assist you with your health concerns today?"
        };

        let response = responses.default;
        
        if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
            response = responses.greeting;
        } else if (emergencyKeywords.some(keyword => userMessage.toLowerCase().includes(keyword))) {
            response = responses.emergency;
        }

        addMessage(response, 'bot');
    }, 1500);
}

function showTypingIndicator() {
    typingIndicator.classList.remove('hidden');
}

function hideTypingIndicator() {
    typingIndicator.classList.add('hidden');
}

function toggleDarkMode() {
    isDarkMode = !isDarkMode;
    document.body.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
    darkModeToggle.innerHTML = isDarkMode ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
}

function toggleSidePanel() {
    sidePanel.classList.toggle('active');
}

function toggleVoiceInput() {
    // Voice input functionality placeholder
    alert('Voice input feature coming soon!');
}

function checkForEmergency(message) {
    const isEmergency = emergencyKeywords.some(keyword => message.toLowerCase().includes(keyword));
    if (isEmergency) {
        emergencyBtn.classList.remove('hidden');
    }
}

// Handle clicks outside side panel
document.addEventListener('click', (e) => {
    if (sidePanel.classList.contains('active') && 
        !sidePanel.contains(e.target) && 
        e.target !== menuButton) {
        toggleSidePanel();
    }
});

// Emergency button click handler
emergencyBtn.addEventListener('click', () => {
    addMessage("Connecting to emergency services... Please call 911 if this is a real emergency.", 'bot');
}); 
