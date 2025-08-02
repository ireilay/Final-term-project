import { decks, currentDeckId, editingCardId, currentView } from './data.js';
import { currentDeckNameManageCards, currentCardsList, noCardsMessage, frontOfCardInput, backOfCardInput, showMessage } from './elements.js';
import { startReviewSession } from './study.js';
import { updateView } from './script.js';

function getCurrentDeck() {
    return decks.find(deck => deck.id === currentDeckId);
}

function clearCardForm() {
    frontOfCardInput.value = '';
    backOfCardInput.value = '';
    editingCardId = null;
}

function renderCardList() {
    const currentDeck = getCurrentDeck();
    currentDeckNameManageCards.textContent = currentDeck ? currentDeck.name : 'N/A';
    currentCardsList.innerHTML = '';

    if (!currentDeck || currentDeck.cards.length === 0) {
        noCardsMessage.classList.remove('hidden');
        currentCardsList.appendChild(noCardsMessage);
    } else {
        noCardsMessage.classList.add('hidden');
        currentDeck.cards.forEach(card => {
            const cardItem = document.createElement('div');
            cardItem.className = 'card-list-item flex justify-between items-center';
            cardItem.innerHTML = `
                <span>${card.question}</span>
                <div>
                    <button data-id="${card.id}" class="edit-card-btn text-blue-500 hover:text-blue-700 mr-2">Edit</button>
                    <button data-id="${card.id}" class="delete-card-btn text-red-500 hover:text-red-700">Delete</button>
                </div>
            `;
            currentCardsList.appendChild(cardItem);
        });
    }
}

function handleSaveCard() {
    const currentDeck = getCurrentDeck();
    if (!currentDeck) {
        showMessage('Please select or create a deck first!', 3000);
        return;
    }

    const question = frontOfCardInput.value.trim();
    const answer = backOfCardInput.value.trim();

    if (!question || !answer) {
        showMessage('Please fill in both front and back of the card.', 3000);
        return;
    }

    if (editingCardId) {
        currentDeck.cards = currentDeck.cards.map(card =>
            card.id === editingCardId ? { ...card, question, answer } : card
        );
        showMessage('Card updated successfully!', 2000);
    } else {
        const newId = currentDeck.cards.length > 0 ? Math.max(...currentDeck.cards.map(card => card.id)) + 1 : 1;
        currentDeck.cards.push({ id: newId, question, answer });
        showMessage('Card added successfully!', 2000);
    }
    clearCardForm();
    renderCardList();
    if (currentView === 'study') {
        startReviewSession();
    }
}

function handleEditCard(cardId) {
    const currentDeck = getCurrentDeck();
    if (!currentDeck) return;
    const cardToEdit = currentDeck.cards.find(card => card.id === cardId);
    if (cardToEdit) {
        frontOfCardInput.value = cardToEdit.question;
        backOfCardInput.value = cardToEdit.answer;
        editingCardId = cardId;
    }
}

function handleDeleteCard(cardId) {
    const currentDeck = getCurrentDeck();
    if (!currentDeck) return;

    if (confirm('Are you sure you want to delete this card?')) {
        currentDeck.cards = currentDeck.cards.filter(card => card.id !== cardId);
        showMessage('Card deleted successfully!', 2000);
        renderCardList();
        if (currentView === 'study') {
            startReviewSession();
        }
    }
}

export {
    clearCardForm,
    renderCardList,
    handleSaveCard,
    handleEditCard,
    handleDeleteCard
};