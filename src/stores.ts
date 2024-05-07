import {create} from "zustand";
import {Filter} from "./types.ts";

interface FilterState {
    filter: Filter,
    addCode: (code: string) => void,
    removeCode: (code: string) => void,
}

export const useFilterStore = create<FilterState>()((set) => ({
    filter: {
        codes: new Set<string>(),
    },
    addCode: (code: string) => set((state) => ({
        filter: {
            codes: new Set<string>(state.filter.codes).add(code)
        }
    })),
    removeCode: (code: string) => set((state) => {
        const newSet = new Set<string>(state.filter.codes);
        newSet.delete(code);
        return {
            filter: {
                codes: newSet
            }
        }
    })
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