import CardFilterSelector from "./Components/CardFilter.tsx";
import CardDisplay from "./Components/CardDisplay.tsx";
import {useQuery} from "@tanstack/react-query";
import {Card} from "./types.ts";
import {createContext, useEffect, useState} from "react";

export const CardContext = createContext<Card[]>([]);

function App() {
    const [cards, setCards] = useState<Card[]>([]);
    const cardQuery = useQuery({queryKey: ["cards"], queryFn: getCards}, );
    
    useEffect(() => {
        if (cardQuery.isSuccess) {
            setCards(cardQuery.data)
        }
    }, [cardQuery.data, cardQuery.isSuccess])

    async function getCards(): Promise<Card[]> {
        const cards = await fetch("https://arkhamdb.com/api/public/cards/");

        return await cards.json();
    }

    return (
        <div className="w-screen h-screen bg-background dark flex">
            <CardContext.Provider value={cards}>
                <CardFilterSelector/>
                <CardDisplay/>
            </CardContext.Provider>
        </div>
    )
}

export default App
