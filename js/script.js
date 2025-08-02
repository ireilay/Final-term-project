import { currentView, currentDeckId } from './data.js';
import {
    studyView,
    manageCardsView,
    manageDecksView,
    flashcardElement,
    flipCardBtn,
    hardBtn,
    goodBtn,
    easyBtn,
    restartSessionBtn,
    manageCardsLink,
    manageDecksLink,
    backToStudyFromCardsBtn,
    backToStudyFromDecksBtn,
    saveCardBtn,
    cancelCardBtn,
    addNewCardBtn,
    currentCardsList,
    addDeckBtn,
    currentDecksList,
    showMessage
} from './elements.js';
import { startReviewSession, flipCard, handleFeedback } from './study.js';
import { clearCardForm, renderCardList, handleSaveCard, handleEditCard, handleDeleteCard } from './cards.js';
import { renderDeckList, handleAddDeck, handleDeleteDeck, handleSelectDeck } from './decks.js';

function updateView() {
    studyView.classList.add('hidden');
    manageCardsView.classList.add('hidden');
    manageDecksView.classList.add('hidden');

    if (currentView === 'study') {
        studyView.classList.remove('hidden');
        startReviewSession();
    } else if (currentView === 'manage-cards') {
        manageCardsView.classList.remove('hidden');
        renderCardList();
        clearCardForm();
    } else if (currentView === 'manage-decks') {
        manageDecksView.classList.remove('hidden');
        renderDeckList();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    flashcardElement.parentElement.addEventListener('click', flipCard);
    flipCardBtn.addEventListener('click', flipCard);
    hardBtn.addEventListener('click', () => handleFeedback('hard'));
    goodBtn.addEventListener('click', () => handleFeedback('good'));
    easyBtn.addEventListener('click', () => handleFeedback('easy'));
    restartSessionBtn.addEventListener('click', startReviewSession);

    manageCardsLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (!currentDeckId) {
            showMessage('Please add or select a deck first!', 3000);
            return;
        }
        currentView = 'manage-cards';
        updateView();
    });

    manageDecksLink.addEventListener('click', (e) => {
        e.preventDefault();
        currentView = 'manage-decks';
        updateView();
    });

    backToStudyFromCardsBtn.addEventListener('click', () => {
        currentView = 'study';
        updateView();
    });
    backToStudyFromDecksBtn.addEventListener('click', () => {
        currentView = 'study';
        updateView();
    });

    saveCardBtn.addEventListener('click', handleSaveCard);
    cancelCardBtn.addEventListener('click', clearCardForm);
    addNewCardBtn.addEventListener('click', () => {
        clearCardForm();
        frontOfCardInput.focus();
    });

    currentCardsList.addEventListener('click', (e) => {
        const target = e.target;
        const cardId = parseInt(target.dataset.id);

        if (target.classList.contains('edit-card-btn')) {
            handleEditCard(cardId);
        } else if (target.classList.contains('delete-card-btn')) {
            handleDeleteCard(cardId);
        }
    });

    addDeckBtn.addEventListener('click', handleAddDeck);

    currentDecksList.addEventListener('click', (e) => {
        const target = e.target;
        const deckId = target.dataset.id;

        if (target.classList.contains('select-deck-btn')) {
            handleSelectDeck(deckId);
        } else if (target.classList.contains('delete-deck-btn')) {
            handleDeleteDeck(deckId);
        }
    });

    updateView();
});

export { updateView };