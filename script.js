// Login & Registration Logic
function handleLogin(event) {
    event.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        if (users[username] === password) {
            document.getElementById('login-page').style.display = 'none';
            document.getElementById('main-content').style.display = 'block';
            document.getElementById('error-message').style.display = 'none';
        } else {
            document.getElementById('error-message').textContent = 'Incorrect password';
            document.getElementById('error-message').style.display = 'block';
        }
    } else {
        document.getElementById('error-message').textContent = 'Username does not exist';
        document.getElementById('error-message').style.display = 'block';
    }
}

function handleRegister(event) {
    event.preventDefault();
    const username = document.getElementById('new-username').value.trim();
    const password = document.getElementById('new-password').value.trim();
    let users = JSON.parse(localStorage.getItem('users')) || {};

    if (users[username]) {
        document.getElementById('register-error-message').textContent = 'Username already exists';
        document.getElementById('register-error-message').style.display = 'block';
    } else {
        users[username] = password;
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful!');
        document.getElementById('registration-page').style.display = 'none';
        document.getElementById('login-page').style.display = 'block';
    }
}

// Show login page
function showLoginPage() {
    document.getElementById('registration-page').style.display = 'none';
    document.getElementById('login-page').style.display = 'block';
}

// Show registration page
function showRegistrationPage() {
    document.getElementById('login-page').style.display = 'none';
    document.getElementById('registration-page').style.display = 'block';
}

// Game Switching Functions
function startSnakeAndLadder() {
    document.getElementById('games').style.display = 'none';
    document.getElementById('snake-ladder-game').style.display = 'block';
    generateSnakeAndLadderBoard();
}

function startLudo() {
    document.getElementById('games').style.display = 'none';
    document.getElementById('ludo-game').style.display = 'block';
}

function startSubwaySurfer() {
    alert("Subway Surfer: Placeholder. More complex to integrate.");
}

// Snake and Ladder Game Logic
function generateSnakeAndLadderBoard() {
    const board = document.getElementById("board");
    board.innerHTML = ''; 
    let boardHTML = "<table>";
    for (let row = 0; row < 10; row++) {
        boardHTML += "<tr>";
        for (let col = 0; col < 10; col++) {
            boardHTML += `<td id="cell-${row * 10 + col + 1}" class="cell">${row * 10 + col + 1}</td>`;
        }
        boardHTML += "</tr>";
    }
    boardHTML += "</table>";
    board.innerHTML = boardHTML;
    const startButton = document.querySelector('#snake-ladder-game button');
    startButton.innerHTML = 'Roll Dice';
    startButton.onclick = rollDice;
}

function rollDice() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("message").innerHTML = `You rolled a ${diceRoll}`;
    movePlayer(diceRoll);
}

let playerPosition = 1;
const snakeAndLadderBoard = {
    3: 22, 5: 8, 11: 26, 20: 29,
    17: 4, 19: 7, 21: 9, 27: 1
};

function movePlayer(roll) {
    playerPosition += roll;
    if (playerPosition > 100) playerPosition = 100;
    if (snakeAndLadderBoard[playerPosition]) {
        playerPosition = snakeAndLadderBoard[playerPosition];
    }
    document.getElementById("message").innerHTML = `Player moved to position: ${playerPosition}`;
    updateBoard();
}

function updateBoard() {
    for (let i = 1; i <= 100; i++) {
        const cell = document.getElementById(`cell-${i}`);
        if (i === playerPosition) {
            cell.style.backgroundColor = "green";
        } else {
            cell.style.backgroundColor = "white";
        }
    }
}

// Exercise Timer Logic
let timerInterval;
let remainingTime = 0;
let isPaused = false;

function startExercise() {
    const startTime = document.getElementById('start-time').value;
    const stopTime = document.getElementById('stop-time').value;

    if (!startTime || !stopTime) {
        alert("Please enter both start and stop times.");
        return;
    }

    let startMinutes = parseInt(startTime.split(':')[0]) * 60 + parseInt(startTime.split(':')[1]);
    let stopMinutes = parseInt(stopTime.split(':')[0]) * 60 + parseInt(stopTime.split(':')[1]);

    if (isNaN(startMinutes) || isNaN(stopMinutes)) {
        alert("Invalid time format.");
        return;
    }

    remainingTime = stopMinutes - startMinutes;
    if (remainingTime <= 0) {
        alert("Stop time must be later than start time.");
        return;
    }

    document.getElementById("timer").style.display = "block";
    document.getElementById("time-display").innerText = formatTime(remainingTime);
    timerInterval = setInterval(updateTimer, 1000);
}

function updateTimer() {
    if (remainingTime <= 0) {
        clearInterval(timerInterval);
        alert("Exercise time is over!");
    } else {
        remainingTime--;
        document.getElementById("time-display").innerText = formatTime(remainingTime);
    }
}

function formatTime(seconds) {
    let minutes = Math.floor(seconds / 60);
    let secs = seconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function pauseExercise() {
    isPaused = true;
    clearInterval(timerInterval);
    document.getElementById("pause-button").style.display = "none";
    document.getElementById("resume-button").style.display = "block";
}

function resumeExercise() {
    isPaused = false;
    timerInterval = setInterval(updateTimer, 1000);
    document.getElementById("pause-button").style.display = "block";
    document.getElementById("resume-button").style.display = "none";
}

// Health Tracking and Reminder Logic
let reminderInterval; // To store the set interval
let reminderTimeInMinutes; // To store the time for the reminder
let reminderMessage = ""; // To store the action for the reminder

// Function to set a reminder
function setReminder() {
    // Get the reminder time and action
    reminderTimeInMinutes = parseInt(document.getElementById("reminder-time").value);
    if (isNaN(reminderTimeInMinutes) || reminderTimeInMinutes <= 0) {
        alert("Please enter a valid time.");
        return;
    }

    // Check if a reminder action is selected
    if (document.getElementById("drink-water").checked) {
        reminderMessage = "Time to drink water!";
    } else if (document.getElementById("take-medication").checked) {
        reminderMessage = "Time to take your medication!";
    } else if (document.getElementById("stretch").checked) {
        reminderMessage = "Time to stretch!";
    } else {
        alert("Please select an action for the reminder.");
        return;
    }

    // Clear any previous reminder interval
    clearInterval(reminderInterval);

    // Set the reminder interval
    reminderInterval = setInterval(function() {
        alert(reminderMessage);
    }, reminderTimeInMinutes * 60 * 1000); // Convert minutes to milliseconds

    // Show the success message
    document.getElementById("reminder-message").style.display = "block";
    document.getElementById("reminder-message").textContent = `Reminder set for every ${reminderTimeInMinutes} minutes to ${reminderMessage.toLowerCase()}.`;

    // Disable the input fields after setting the reminder
    document.getElementById("reminder-time").disabled = true;
    document.querySelector('button[onclick="setReminder()"]').disabled = true;
}

// Helper to toggle different sections of the app
function toggleGamesSection() {
    const gamesSection = document.getElementById("games");
    gamesSection.style.display = gamesSection.style.display === "none" ? "block" : "none";
}

function toggleExerciseSession() {
    const exerciseSession = document.getElementById("exercise-session");
    exerciseSession.style.display = exerciseSession.style.display === "none" ? "block" : "none";
}
function toggleMenstrualHealth() {
    const section = document.getElementById('menstrual-health');
    section.style.display = section.style.display === 'none' ? 'block' : 'none';
}

function toggleHealthTracking() {
    const healthTracking = document.getElementById("health-tracking");
    healthTracking.style.display = healthTracking.style.display === "none" ? "block" : "none";
}

// Function to start chatbot interaction
function startChatbot() {
    document.getElementById('chatbot-messages').innerHTML = ''; // Clear messages on chat start
    showChatInterface(); // Show the chat input and buttons
}

// Function to display chat input and message area
function showChatInterface() {
    document.getElementById('chatbot').style.display = 'block';
    const messageArea = document.getElementById('chatbot-messages');
    const chatInput = document.getElementById('chat-input');

    // Add initial message to chat
    const botMessage = document.createElement('div');
    botMessage.classList.add('bot-message');
    botMessage.textContent = "Hello! How can I assist you today?";
    messageArea.appendChild(botMessage);
    
    chatInput.focus(); // Focus on input field to start typing
}

// Function to send a message
function sendChatMessage() {
    const userMessage = document.getElementById('chat-input').value;
    if (userMessage.trim() === '') return; // Prevent sending empty messages

    // Display the user's message
    const userMessageElement = document.createElement('div');
    userMessageElement.classList.add('user-message');
    userMessageElement.textContent = userMessage;
    document.getElementById('chatbot-messages').appendChild(userMessageElement);

    // Clear the input field
    document.getElementById('chat-input').value = '';

    // Simulate a bot response after a short delay
    setTimeout(() => {
        const botResponse = generateBotResponse(userMessage); // You can later improve this logic
        const botMessageElement = document.createElement('div');
        botMessageElement.classList.add('bot-message');
        botMessageElement.textContent = botResponse;
        document.getElementById('chatbot-messages').appendChild(botMessageElement);

        // Scroll to the latest message
        document.getElementById('chatbot-messages').scrollTop = document.getElementById('chatbot-messages').scrollHeight;
    }, 1000);
}

// Function to generate bot responses based on user input (for now, it's a simple static response)
function generateBotResponse(userMessage) {
    // Simple keyword-based responses. You can enhance this with AI or more complex rules.
    const message = userMessage.toLowerCase();
    if (message.includes('hi') || message.includes('hello')) {
        return 'Hello! How can I assist you today?';
    } else if (message.includes('depression')) {
        return 'It sounds like you might be going through a tough time. Would you like some resources on managing depression?';
    } else if (message.includes('exercise')) {
        return 'Exercise is a great way to improve mental health. Would you like to see some exercises?';
    } else if (message.includes('games')) {
        return 'Playing games can be a great way to relax. Would you like me to suggest some games?';
    } else {
        return 'I\'m sorry, I didn\'t quite understand that. Can you please clarify?';
    }
}

// Game Button Logic to Show/Hide Game List
document.getElementById("gameButton").addEventListener("click", function() {
    const gameList = document.getElementById("gameList");
    // Toggle the visibility of the game list
    if (gameList.style.display === "none" || gameList.style.display === "") {
        gameList.style.display = "flex";
    } else {
        gameList.style.display = "none";
    }
});

// Additional Games Added to the Game List
const gameList = document.getElementById("gameList");
const games = [
    "Snake and Ladder",
    "Ludo",
    "Subway Surfer",
    "Tic Tac Toe",
    "Chess",
    "Checkers",
    "Memory Match",
    "Sudoku",
    "Word Search",
    "Pictionary"
];


// Add new game options to the game list
// games.forEach(game => {
//     const gameButton = document.createElement("button");
//     gameButton.textContent = game;
//     gameButton.onclick = function () {
//         alert(`${game} is starting...`);
//         // You can add logic to start each respective game here
//     };
//     gameList.appendChild(gameButton);
// });

// Game Switching Functions - Same as before

// Snake and Ladder Game Logic - Already implemented

// Ludo Game Logic
function startLudo() {
    document.getElementById('games').style.display = 'none';
    document.getElementById('ludo-game').style.display = 'block';
    generateLudoBoard();
}

function generateLudoBoard() {
    const board = document.getElementById("ludo-board");
    board.innerHTML = '';
    let boardHTML = "<table>";
    for (let row = 0; row < 15; row++) {
        boardHTML += "<tr>";
        for (let col = 0; col < 15; col++) {
            boardHTML += `<td class="ludo-cell">${row * 15 + col}</td>`;
        }
        boardHTML += "</tr>";
    }
    boardHTML += "</table>";
    board.innerHTML = boardHTML;
    const startButton = document.querySelector('#ludo-game button');
    startButton.innerHTML = 'Roll Dice';
    startButton.onclick = rollDiceLudo;
}

let ludoPlayerPosition = 0;
function rollDiceLudo() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("ludo-message").innerHTML = `You rolled a ${diceRoll}`;
    ludoPlayerPosition += diceRoll;
    if (ludoPlayerPosition > 100) ludoPlayerPosition = 100; // Limit to 100
    document.getElementById("ludo-message").innerHTML += ` Player moved to position: ${ludoPlayerPosition}`;
    updateLudoBoard();
}

function rollDiceLudo() {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    document.getElementById("ludo-message").innerHTML = `You rolled a ${diceRoll}`;
    // Add logic for player movement
}

// Subway Surfer - Placeholder
function startSubwaySurfer() {
    alert("Subway Surfer: Placeholder. More complex to integrate.");
}

// Tic Tac Toe Game Logic
function startTicTacToe() {
    document.getElementById('games').style.display = 'none';
    document.getElementById('tic-tac-toe').style.display = 'block';
    generateTicTacToeBoard();
}

function generateTicTacToeBoard() {
    const board = document.getElementById("tic-tac-toe-board");
    board.innerHTML = '';
    let boardHTML = "<table>";
    for (let row = 0; row < 3; row++) {
        boardHTML += "<tr>";
        for (let col = 0; col < 3; col++) {
            boardHTML += `<td id="tic-tac-cell-${row}-${col}" class="tic-tac-cell" onclick="makeMove(${row}, ${col})"></td>`;
        }
        boardHTML += "</tr>";
    }
    boardHTML += "</table>";
    board.innerHTML = boardHTML;
}

let currentPlayer = 'X';

function makeMove(row, col) {
    const cell = document.getElementById(`tic-tac-cell-${row}-${col}`);
    if (!cell.innerHTML) {
        cell.innerHTML = currentPlayer;
        if (checkWinner()) {
            alert(`${currentPlayer} wins!`);
            resetTicTacToe();
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function checkWinner() {
    // Check rows, columns, and diagonals for winner
    return false; // Placeholder logic
}

function resetTicTacToe() {
    currentPlayer = 'X';
    generateTicTacToeBoard();
}

// Chess Game Logic - Placeholder for now
function startChess() {
    alert("Chess: Placeholder. More complex to integrate.");
}

// Checkers Game Logic - Placeholder for now
function startCheckers() {
    alert("Checkers: Placeholder. More complex to integrate.");
}

// Memory Match Game Logic
function startMemoryMatch() {
    document.getElementById('games').style.display = 'none';
    document.getElementById('memory-match').style.display = 'block';
    generateMemoryMatchBoard();
}

function generateMemoryMatchBoard() {
    const board = document.getElementById("memory-match-board");
    const cards = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
    cards.sort(() => Math.random() - 0.5); // Shuffle cards
    board.innerHTML = '';
    let boardHTML = "<table>";
    for (let i = 0; i < 4; i++) {
        boardHTML += "<tr>";
        for (let j = 0; j < 4; j++) {
            const cardIndex = i * 4 + j;
            boardHTML += `<td class="memory-cell" onclick="flipCard(${cardIndex})">${cards[cardIndex]}</td>`;
        }
        boardHTML += "</tr>";
    }
    boardHTML += "</table>";
    board.innerHTML = boardHTML;
}

function flipCard(index) {
    // Logic for flipping and matching cards
}

// Sudoku Game Logic - Placeholder for now
function startSudoku() {
    alert("Sudoku: Placeholder. More complex to integrate.");
}

// Word Search Game Logic - Placeholder for now
function startWordSearch() {
    alert("Word Search: Placeholder. More complex to integrate.");
}

// Pictionary Game Logic - Placeholder for now
function startPictionary() {
    alert("Pictionary: Placeholder. More complex to integrate.");
}

// Helper functions for toggling sections, adding games to the game list, etc.
// Same as before
// Updated code with game logic for each game
games.forEach(game => {
    const gameButton = document.createElement("button");
    gameButton.textContent = game;
    
    gameButton.onclick = function () {
        alert(`${game} is starting...`);
        
        // Link the game with the corresponding function
        switch (game) {
            case "Snake and Ladder":
                startSnakeAndLadder();  // Call Snake and Ladder game logic
                break;
            case "Ludo":
                startLudo();           // Call Ludo game logic
                break;
            case "Subway Surfer":
                startSubwaySurfer();   // Call Subway Surfer (Placeholder)
                break;
            case "Tic Tac Toe":
                startTicTacToe();      // Call Tic Tac Toe game logic
                break;
            case "Chess":
                startChess();          // Call Chess game logic (Placeholder)
                break;
            case "Checkers":
                startCheckers();       // Call Checkers game logic (Placeholder)
                break;
            case "Memory Match":
                startMemoryMatch();    // Call Memory Match game logic
                break;
            case "Sudoku":
                startSudoku();         // Call Sudoku game logic (Placeholder)
                break;
            case "Word Search":
                startWordSearch();     // Call Word Search game logic (Placeholder)
                break;
            case "Pictionary":
                startPictionary();     // Call Pictionary game logic (Placeholder)
                break;
            default:
                alert("This game is not yet implemented.");
        }
    };
    
    gameList.appendChild(gameButton); // Add the button to the game list
});


// Show or hide the chatbot section
function toggleChatbot() {
    const chatbotSection = document.getElementById('chatbot');
    if (chatbotSection.style.display === 'none') {
        chatbotSection.style.display = 'block';
    } else {
        chatbotSection.style.display = 'none';
    }
}

// Function to send chat messages
function sendChatMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    if (message) {
        const messagesContainer = document.getElementById('chatbot-messages');
        const userMessage = document.createElement('div');
        userMessage.className = 'user-message';
        userMessage.textContent = message;
        messagesContainer.appendChild(userMessage);
        input.value = '';

        // Simulate bot response
        setTimeout(() => {
            const botMessage = document.createElement('div');
            botMessage.className = 'bot-message';
            botMessage.textContent = getBotResponse(message);
            messagesContainer.appendChild(botMessage);
            messagesContainer.scrollTop = messagesContainer.scrollHeight; // Scroll to the bottom
        }, 1000);
    }
}

// Function to get bot response based on user input
function getBotResponse(userMessage) {
    userMessage = userMessage.toLowerCase();

    // Define some basic responses
    if (userMessage.includes("hello") || userMessage.includes("hi")) {
        return "Hello! How can I assist you today?";
    } else if (userMessage.includes("how are you")) {
        return "I'm doing well, thank you! How about you?";
    } else if (userMessage.includes("help") || userMessage.includes("assist")) {
        return "Sure! You can ask me questions about the games here or general topics like stress, health, or entertainment.";
    } else if (userMessage.includes("stress") || userMessage.includes("anxiety")) {
        return "Stress and anxiety can be tough. Consider taking a break, practicing deep breathing exercises, or talking to someone you trust.";
    } else if (userMessage.includes("thank you") || userMessage.includes("thanks")) {
        return "You're very welcome! Let me know if you need anything else.";
    } else if (userMessage.includes("game") || userMessage.includes("play")) {
        return "We have several games here! You can play Snake and Ladder, Ludo, Tic Tac Toe, or Memory Match. Which one would you like to play?";
    } else if (userMessage.includes("snake and ladder")) {
        return "Ah, Snake and Ladder is a fun classic! Do you want me to start a new game?";
    } else if (userMessage.includes("ludo")) {
        return "Ludo is a great game for friends! Shall I set it up for you?";
    } else if (userMessage.includes("tic tac toe")) {
        return "Tic Tac Toe is a great game! Do you want to start a match?";
    } else if (userMessage.includes("memory match")) {
        return "Memory Match is a fun game to test your memory! Do you want to begin?";
    } else if (userMessage.includes("what is your name")) {
        return "I am a chatbot created to assist you. I don't have a personal name, but you can call me Bot!";
    } else if (userMessage.includes("bye") || userMessage.includes("goodbye")) {
        return "Goodbye! Feel free to come back anytime if you have more questions.";
    } else if (userMessage.includes("what time is it")) {
        const currentTime = new Date();
        const hours = currentTime.getHours();
        const minutes = currentTime.getMinutes();
        const formattedTime = `${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
        return `The current time is ${formattedTime}.`;
    } else if (userMessage.includes("weather")) {
        return "I currently don't have access to real-time weather information, but you can check it online!";
    } else if (userMessage.includes("news")) {
        return "I don't have live news access, but feel free to browse the web for the latest updates.";
    } else if (userMessage.includes("joke")) {
        return "Why don’t skeletons fight each other? They don’t have the guts!";
    } else if (userMessage.includes("quote") || userMessage.includes("inspire")) {
        return "Here's a quote for you: 'The only way to do great work is to love what you do.' – Steve Jobs";
    } else {
        return "Sorry, I didn't quite understand that. Could you please rephrase or ask something else?";
    }
}