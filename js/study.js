import { decks, currentDeckId, currentReviewQueue, completedCardsCount, totalCardsInSession, currentCardInReviewIndex, isFlipped } from './data.js';
import { questionElement, answerElement, sessionProgressElement, flashcardElement, feedbackButtonsContainer, restartSessionBtn, currentDeckNameStudy, showMessage } from './elements.js';

function getCurrentDeck() {
    return decks.find(deck => deck.id === currentDeckId);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function startReviewSession() {
    const currentDeck = getCurrentDeck();
    if (!currentDeck || currentDeck.cards.length === 0) {
        currentReviewQueue.length = 0;
        totalCardsInSession = 0;
        completedCardsCount = 0;
        displayCurrentReviewCard();
        feedbackButtonsContainer.classList.add('hidden');
        restartSessionBtn.classList.add('hidden');
        return;
    }

    currentReviewQueue.length = 0;
    currentReviewQueue.push(...currentDeck.cards);
    shuffleArray(currentReviewQueue);
    currentCardInReviewIndex = 0;
    completedCardsCount = 0;
    totalCardsInSession = currentDeck.cards.length;

    feedbackButtonsContainer.classList.remove('hidden');
    restartSessionBtn.classList.add('hidden');
    displayCurrentReviewCard();
}

function displayCurrentReviewCard() {
    const currentDeck = getCurrentDeck();
    currentDeckNameStudy.textContent = currentDeck ? currentDeck.name : 'No Deck Selected';

    if (currentReviewQueue.length === 0) {
        questionElement.textContent = 'Session Complete!';
        answerElement.textContent = 'You\'ve reviewed all cards in this session.';
        sessionProgressElement.textContent = `${completedCardsCount} / ${totalCardsInSession} cards reviewed.`;
        flashcardElement.classList.remove('flipped');
        isFlipped = false;
        feedbackButtonsContainer.classList.add('hidden');
        restartSessionBtn.classList.remove('hidden');
        return;
    }

    const currentCard = currentReviewQueue[currentCardInReviewIndex];
    questionElement.textContent = currentCard.question;
    answerElement.textContent = currentCard.answer;
    sessionProgressElement.textContent = `${completedCardsCount} / ${totalCardsInSession} cards reviewed.`;

    if (isFlipped) {
        flashcardElement.classList.remove('flipped');
        isFlipped = false;
    }
}

function flipCard() {
    const currentDeck = getCurrentDeck();
    if (!currentDeck || currentReviewQueue.length === 0) return;
    flashcardElement.classList.toggle('flipped');
    isFlipped = !isFlipped;
}

function handleFeedback(difficulty) {
    const currentDeck = getCurrentDeck();
    if (!currentDeck || currentReviewQueue.length === 0) return;

    const currentCard = currentReviewQueue[currentCardInReviewIndex];
    currentReviewQueue.splice(currentCardInReviewIndex, 1);

    if (difficulty === 'hard') {
        currentReviewQueue.push(currentCard);
        showMessage('You found this card hard. It will reappear.', 1500);
    } else if (difficulty === 'good') {
        currentReviewQueue.push(currentCard);
        showMessage('Good job! This card will reappear.', 1500);
    } else if (difficulty === 'easy') {
        completedCardsCount++;
        showMessage('Great! This card is easy for you.', 1500);
    }

    if (currentReviewQueue.length > 0) {
        currentCardInReviewIndex = currentCardInReviewIndex % currentReviewQueue.length;
    } else {
        currentCardInReviewIndex = 0;
    }

    displayCurrentReviewCard();
}

export {
    startReviewSession,
    displayCurrentReviewCard,
    flipCard,
    handleFeedback
};