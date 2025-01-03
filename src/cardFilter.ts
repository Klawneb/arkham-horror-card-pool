﻿import {Card} from "./types.ts";
import {Filter, usePageStore} from "./stores.ts";

export function filterCards(filter: Filter, cards: Card[], cardsVisible: number) {
    const filters = [filterCode, filterSearchTerm, filterFaction, filterXPCost, filterResourceCost, filterDeckOptions];
    let filteredCards = [...cards];
    const pageStore = usePageStore.getState();
    
    if (cards.length === 0) {
        return []
    }
    
    for (const f of filters) {
        filteredCards = f(filter, filteredCards);
    }
    
    if ((filteredCards.length/cardsVisible)<pageStore.page && pageStore.page != 1) {
        pageStore.setPage(1)
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

function filterResourceCost(filter: Filter, cards: Card[]) {
    if (filter.resourceCosts.length === 0) {
        return cards;
    }

    return cards.filter((card) => {
        return filter.resourceCosts.includes(card.cost)
    })
}

function filterDeckOptions(filter: Filter, cards: Card[]) {
    if (!filter.investigator) {
        return cards;
    }
    
    return cards.filter((card) => {
        if (card.type_code === "investigator") {
            return false
        }
        
        if (card.type_code === "enemy" || card.type_code === "treachery") {
            return false
        }
        
        if ("restrictions" in card && filter.investigator) {
            return filter.investigator.code in card.restrictions.investigator;
        }
        
        let validCard = false
        filter.investigator!.deck_options.forEach((option) => {
            if (option.level && !(card.xp >= option.level.min && card.xp <= option.level.max)) {
                return
            }
            
            if (option.faction?.includes(card.faction_code)) {
                validCard = true;
            }
                
            const cardTraits = card.traits?.split(".").map(trait => trait.toLowerCase().trim());
            if (cardTraits) {
                option.trait?.forEach((trait) => {
                    if (cardTraits.includes(trait)) {
                        validCard = true;
                    }
                })
            }

            const cardTags = card.tags?.split(".").map(tag => tag.toLowerCase().trim());
            if (cardTags) {
                option.tag?.forEach((tag) => {
                    if (cardTags.includes(tag)) {
                        validCard = true;
                    }
                })
            }

            if (option.not) {
                validCard = false;
            }
        })  
        return validCard;
    })
}