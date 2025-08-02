let decks = [
    {
        id: 'deck-1',
        name: 'French Basics',
        cards: [
            { id: 1, question: 'What is the capital of France?', answer: 'Paris' },
            { id: 2, question: 'Hello', answer: 'Bonjour' },
            { id: 3, question: 'Goodbye', answer: 'Au revoir' },
            { id: 4, question: 'Thank you', answer: 'Merci' }
        ]
    },
    {
        id: 'deck-2',
        name: 'Math Facts',
        cards: [
            { id: 5, question: 'What is 2 + 2?', answer: '4' },
            { id: 6, question: 'What is 7 * 8?', answer: '56' },
            { id: 7, question: 'What is the square root of 81?', answer: '9' }
        ]
    }
];

let currentDeckId = decks.length > 0 ? decks[0].id : null;
let currentReviewQueue = [];
let completedCardsCount = 0;
let totalCardsInSession = 0;
let currentCardInReviewIndex = 0;
let isFlipped = false;
let currentView = 'study';
let editingCardId = null;

export {
    decks,
    currentDeckId,
    currentReviewQueue,
    completedCardsCount,
    totalCardsInSession,
    currentCardInReviewIndex,
    isFlipped,
    currentView,
    editingCardId
};