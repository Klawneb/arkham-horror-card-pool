import {create} from "zustand";
import {Card} from "./types.ts";

export interface Filter {
    codes: Set<string>,
    searchTerm: string,
    searchType: string,
    factions: string[],
    xpCost: number[]
    resourceCosts: number[],
    investigator: Card | undefined,
}

interface FilterState {
    filter: Filter,
    addCode: (code: string) => void,
    removeCode: (code: string) => void,
    setSearchTerm: (searchTerm: string) => void,
    setSearchType: (searchType: string) => void,
    setFactions: (factions: string[]) => void,
    setXpCost: (xpCost: number[]) => void,
    setResourceCosts: (resourceCosts: number[]) => void,
    setInvestigator: (deckOptions: Card | undefined) => void,
}

export const useFilterStore = create<FilterState>()((set) => ({
    filter: {
        codes: new Set<string>(),
        searchTerm: "",
        searchType: "title",
        factions: [],
        xpCost: [],
        resourceCosts: [],
        investigator: undefined,
    },
    addCode: (code: string) => set((state) => ({
        filter: {
            ...state.filter,
            codes: new Set<string>(state.filter.codes).add(code)
        }
    })),
    removeCode: (code: string) => set((state) => {
        const newSet = new Set<string>(state.filter.codes);
        newSet.delete(code);
        return {
            filter: {
                ...state.filter,
                codes: newSet
            }
        }
    }),
    setSearchTerm: (searchTerm: string) => set((state) => ({
        filter: {
            ...state.filter,
            searchTerm: searchTerm
        }
    })),
    setSearchType: (searchType: string) => set((state) => ({
        filter: {
            ...state.filter,
            searchType: searchType
        }
    })),
    setFactions: (factions: string[]) => set((state) => ({
        filter: {
            ...state.filter,
            factions: factions
        }
    })),
    setXpCost: (xpCost: number[]) => set((state) => ({
        filter: {
            ...state.filter,
            xpCost: xpCost
        }
    })),
    setResourceCosts: (resourceCosts: number[]) => set((state) => ({
        filter: {
            ...state.filter,
            resourceCosts: resourceCosts
        }
    })),
    setInvestigator: (investigator: Card | undefined) => set((state) => ({
        filter: {
            ...state.filter,
            investigator: investigator
        }
    })),
}))

interface PageState {
    page: number,
    setPage: (page: number) => void
}

export const usePageStore = create<PageState>()((set) => ({
    page: 1,
    setPage: (page: number) => set(() => ({
        page: page,
    }))
}))