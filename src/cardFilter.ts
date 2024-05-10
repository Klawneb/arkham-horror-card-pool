import {Card} from "./types.ts";
import {Filter} from "./stores.ts";

export function filterCards(filter: Filter, cards: Card[]) {
    const filters = [filterCode, filterSearchTerm, filterFaction, filterXPCost];
    let filteredCards = [...cards];
    
    for (const f of filters) {
        filteredCards = f(filter, filteredCards);
    }
    
    return filteredCards;
}

function filterCode(filter: Filter, cards: Card[]) {
    if (filter.codes.size === 0) {
        return cards;
    }

    return cards.filter((card) => {
        return filter.codes.has(card.pack_code)
    })
}

function filterSearchTerm(filter: Filter, cards: Card[]) {
    if (filter.searchTerm === "") {
        return cards
    }
    
    return cards.filter((card) => {
        if (filter.searchType === "title") {
            return card.name.toLowerCase().includes(filter.searchTerm.toLowerCase());
        } else if (filter.searchType === "text") {
            if (card.real_text) {
                return card.real_text.toLowerCase().includes(filter.searchTerm.toLowerCase());
            }
        }
        return false
    })
}

function filterFaction(filter: Filter, cards: Card[]) {
    if (filter.factions.length === 0) {
        return cards;
    }

    return cards.filter((card) => {
        return filter.factions.includes(card.faction_code)
    })
}

function filterXPCost(filter: Filter, cards: Card[]) {
    if (filter.xpCost.length === 0) {
        return cards;
    }
    
    return cards.filter((card) => {
        return filter.xpCost.includes(card.xp)
    })
}