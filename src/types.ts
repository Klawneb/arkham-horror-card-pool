export interface Pack {
    name: string;
    code: string;
    position: number;
    cycle_position: number;
    available: Date;
    known: number;
    total: number;
    url: string;
    id: number;
}

export interface Card {
    pack_code: string;
    pack_name: string;
    type_code: string;
    type_name: string;
    faction_code: string;
    faction_name: string;
    position: number;
    exceptional: boolean;
    myriad: boolean;
    code: string;
    name: string;
    real_name: string;
    cost: number;
    text: string;
    real_text: string;
    quantity: number;
    skill_combat: number;
    xp: number;
    health: number;
    health_per_investigator: boolean;
    deck_limit: number;
    slot: string;
    real_slot: string;
    traits: string;
    real_traits: string;
    illustrator: string;
    is_unique: boolean;
    permanent: boolean;
    double_sided: boolean;
    octgn_id: string;
    url: string;
    imagesrc: string;
    back_text?: string;
    backimagesrc?: string;
    deck_options: DeckOption[];
    restrictions: {
        investigator: {
            [key: string]: string;
        }
    }
}

interface DeckOption {
    faction?: string[],
    trait?: string[],
    level: {
        min: number,
        max: number
    }
}

export interface Deck {
    name: string,
    cards: Card[],
    investigator?: Card,
    id: string
}

export interface Campaign {
    name: string,
    cycle_position: number;
    codes: string[];
}

export interface Card {
    faction?: string[],
    level: {
        min: number,
        max: number
    }
}