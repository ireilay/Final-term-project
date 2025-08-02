import { decks, currentDeckId, currentView } from './data.js';
import { currentDecksList, noDecksMessage, newDeckNameInput, showMessage } from './elements.js';
import { startReviewSession } from './study.js';
import { updateView } from './script.js';

function getCurrentDeck() {
    return decks.find(deck => deck.id === currentDeckId);
}

function renderDeckList() {
    currentDecksList.innerHTML = '';
    if (decks.length === 0) {
        noDecksMessage.classList.remove('hidden');
        currentDecksList.appendChild(noDecksMessage);
    } else {
        noDecksMessage.classList.add('hidden');
        decks.forEach(deck => {
            const deckItem = document.createElement('div');
            deckItem.className = 'deck-list-item flex justify-between items-center';
            deckItem.innerHTML = `
                <span>${deck.name}</span>
                <div>
                    <button data-id="${deck.id}" class="select-deck-btn text-green-500 hover:text-green-700 mr-2">Select</button>
                    <button data-id="${deck.id}" class="delete-deck-btn text-red-500 hover:text-red-700">Delete</button>
                </div>
            `;
            currentDecksList.appendChild(deckItem);
        });
    }
}

function handleAddDeck() {
    const newDeckName = newDeckNameInput.value.trim();
    if (!newDeckName) {
        showMessage('Please enter a name for the new deck.', 3000);
        return;
    }

    const newId = 'deck-' + (decks.length > 0 ? Math.max(...decks.map(d => parseInt(d.id.split('-')[1]))) + 1 : 1);
    decks.push({ id: newId, name: newDeckName, cards: [] });
    newDeckNameInput.value = '';
    showMessage(`Deck "${newDeckName}" added!`, 2000);
    renderDeckList();

    if (decks.length === 1) {
        currentDeckId = newId;
        if (currentView === 'study') {
            startReviewSession();
        }
    }
}

function handleDeleteDeck(deckId) {
    if (confirm('Are you sure you want to delete this deck and all its cards?')) {
        decks = decks.filter(deck => deck.id !== deckId);
        showMessage('Deck deleted successfully!', 2000);
        renderDeckList();

        if (currentDeckId === deckId) {
            currentDeckId = decks.length > 0 ? decks[0].id : null;
        }

        startReviewSession();
    }
}

function handleSelectDeck(deckId) {
    currentDeckId = deckId;
    currentView = 'study';
    updateView();
    showMessage(`Switched to deck: ${getCurrentDeck().name}`, 2000);
}

export {
    renderDeckList,
    handleAddDeck,
    handleDeleteDeck,
    handleSelectDeck
};