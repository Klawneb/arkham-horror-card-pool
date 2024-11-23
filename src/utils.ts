import {Card, Deck} from "./types.ts";

export const factionColors = new Map<string, string>([
    ["guardian", "bg-blue-500"],
    ["rogue", "bg-green-500"],
    ["survivor", "bg-red-500"],
    ["seeker", "bg-yellow-500"],
    ["mystic", "bg-purple-500"],
    ["neutral", "bg-neutral-500"]
]);

export function addCardToDeck(card: Card, deckID: string): void {
    const selectedDeck = getDeck(deckID);
    
    if (!selectedDeck) {
        return;
    }
    
    selectedDeck.cards.push(card);
    updateDeckList(selectedDeck);
}

function updateDeckList(newDeck: Deck): void {
    const deckJSON = localStorage.getItem("decks");
    if (!deckJSON) {
        return
    }

    const deckList = JSON.parse(deckJSON) as Deck[];
    if (!deckList) {
        return
    }
    
    const newDeckIndex = deckList.findIndex(deck => deck.id === newDeck.id);
    
    if (newDeckIndex >= 0) {
        deckList.splice(newDeckIndex, 1);
    }
    
    deckList.push(newDeck);
    localStorage.setItem("decks", JSON.stringify(deckList));
}

function getDeck(id: string) {
    const deckJSON = localStorage.getItem("decks");
    if (!deckJSON) {
        return
    }

    const deckList = JSON.parse(deckJSON) as Deck[];
    if (!deckList) {
        return
    }

    const selectedDeck = deckList.find((deck) => deck.id === id);

    if (!selectedDeck) {
        return
    }
    
    return selectedDeck;
}

export function isCardMaxCopies(card: Card, deckID: string): boolean {
    const deck = getDeck(deckID);
    
    if (!deck) {
        return false;
    }
    
    const copies = deck.cards.reduce((prev, curr) => {
        if (card.octgn_id === curr.octgn_id) {
            return prev + 1;
        }
        return prev
    }, 0);
    
    return copies > 1;
}