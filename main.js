import './style.css';
import Bot1 from './bots/Bot1.js';
import Bot2 from './bots/Bot2.js';
import Bot3 from './bots/Bot3.js';

// Initialisation des bots
const bots = [new Bot1(), new Bot2(), new Bot3()];

// Charger les messages sauvegardés au démarrage
document.addEventListener('DOMContentLoaded', loadMessages);

// Configuration de l'interface utilisateur
document.querySelector('#app').innerHTML = `
  <div class="chat-container">
    <h1><img src="homme-daffaire.png" alt="Icon" style="width: 30px; height: 30px; margin-right: 10px;">Chatbot 18.0</h1>
    <p>Bots disponibles : Bot <b>Crypto</b>, Bot <b>F1</b>, Bot <b>Random</b></p>
    <div id="chatBox" class="chat-box">
      <div id="messages"></div>
    </div>
    <div class="message-input-container">
      <input type="text" id="messageInput" placeholder="Type a message...">
      <button id="sendButton">Send</button>
    </div>
  </div>
`;

// Gestion des événements pour l'envoi de messages
document.getElementById('sendButton').addEventListener('click', sendMessage);
document.getElementById('messageInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Gestion de l'événement pour le bouton "Clear Chat"
document.getElementById('clearChatButton').addEventListener('click', clearChat);

async function sendMessage() {
    const input = document.getElementById('messageInput');
    const message = input.value.trim().toLowerCase(); // Convertir le message en minuscules
    console.log('Message:', message);
    if (message === '') return; // Ne rien faire si le message est vide
    input.value = '';

    const responses = await Promise.all(bots.map(bot => bot.respond(message)));
    console.log('Responses:', responses);
    displayMessages(message, responses.filter(response => response));
    saveMessages(); // Sauvegarder les messages après l'envoi
}

function displayMessages(message, responses) {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML += `<div class="user-message">${message}</div>`;
    responses.forEach(response => {
        messagesContainer.innerHTML += `<div class="bot-message">${response}</div>`;
    });
    const chatBox = document.getElementById('chatBox');
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll automatique vers le bas
}

function clearChat() {
    const messagesContainer = document.getElementById('messages');
    messagesContainer.innerHTML = '';
    localStorage.removeItem('chatMessages'); // Supprimer les messages du local storage
}

function saveMessages() {
    const messagesContainer = document.getElementById('messages');
    localStorage.setItem('chatMessages', messagesContainer.innerHTML);
}

function loadMessages() {
    const savedMessages = localStorage.getItem('chatMessages');
    if (savedMessages) {
        const messagesContainer = document.getElementById('messages');
        messagesContainer.innerHTML = savedMessages;
        const chatBox = document.getElementById('chatBox');
        chatBox.scrollTop = chatBox.scrollHeight; // Scroll automatique vers le bas
    }
}
