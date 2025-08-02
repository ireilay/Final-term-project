const studyView = document.getElementById('study-view');
const manageCardsView = document.getElementById('manage-cards-view');
const manageDecksView = document.getElementById('manage-decks-view');
const currentDeckNameStudy = document.getElementById('current-deck-name-study');
const flashcardElement = document.getElementById('flashcard');
const questionElement = document.getElementById('flashcard-question');
const answerElement = document.getElementById('flashcard-answer');
const flipCardBtn = document.getElementById('flip-card-btn');
const hardBtn = document.getElementById('hard-btn');
const goodBtn = document.getElementById('good-btn');
const easyBtn = document.getElementById('easy-btn');
const feedbackButtonsContainer = document.getElementById('feedback-buttons-container');
const sessionProgressElement = document.getElementById('session-progress');
const restartSessionBtn = document.getElementById('restart-session-btn');
const manageCardsLink = document.getElementById('manage-cards-link');
const currentDeckNameManageCards = document.getElementById('current-deck-name-manage-cards');
const frontOfCardInput = document.getElementById('front-of-card-input');
const backOfCardInput = document.getElementById('back-of-card-input');
const saveCardBtn = document.getElementById('save-card-btn');
const cancelCardBtn = document.getElementById('cancel-card-btn');
const currentCardsList = document.getElementById('current-cards-list');
const noCardsMessage = document.getElementById('no-cards-message');
const addNewCardBtn = document.getElementById('add-new-card-btn');
const backToStudyFromCardsBtn = document.getElementById('back-to-study-from-cards-btn');
const manageDecksLink = document.getElementById('manage-decks-link');
const newDeckNameInput = document.getElementById('new-deck-name-input');
const addDeckBtn = document.getElementById('add-deck-btn');
// Corrected IDs
const currentDecksList = document.getElementById('current-decks-list');
const noDecksMessage = document.getElementById('no-decks-message');

const backToStudyFromDecksBtn = document.getElementById('back-to-study-from-decks-btn');
const messageBox = document.getElementById('message-box');

function showMessage(message, duration = 3000) {
    messageBox.textContent = message;
    messageBox.classList.add('show');
    setTimeout(() => {
        messageBox.classList.remove('show');
    }, duration);
}

export {
    studyView,
    manageCardsView,
    manageDecksView,
    currentDeckNameStudy,
    flashcardElement,
    questionElement,
    answerElement,
    flipCardBtn,
    hardBtn,
    goodBtn,
    easyBtn,
    feedbackButtonsContainer,
    sessionProgressElement,
    restartSessionBtn,
    manageCardsLink,
    currentDeckNameManageCards,
    frontOfCardInput,
    backOfCardInput,
    saveCardBtn,
    cancelCardBtn,
    addNewCardBtn,
    backToStudyFromCardsBtn,
    manageDecksLink,
    newDeckNameInput,
    addDeckBtn,
    currentDecksList,
    noDecksMessage,
    backToStudyFromDecksBtn,
    showMessage
};