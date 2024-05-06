import {useQuery} from "@tanstack/react-query";
import { Image, Pagination, Spinner} from "@nextui-org/react";
import {Card} from "../types.ts";
import {useFilterStore} from "../stores.ts";
import {RefObject, useEffect, useRef, useState} from "react";

export default function CardDisplay() {
    const cards= useQuery({ queryKey: ["cards"], queryFn: getCards});
    const filterStore = useFilterStore();
    const cardDisplay = useRef<HTMLDivElement>(null);
    const [cardsVisible, setCardsVisible] = useState(0)
    const [page, setPage] = useState(1);
    const filteredCards = filterCode(cards.data ? cards.data : [])
    
    useEffect(() => {
        function updateCardsVisible(cardDisplay: RefObject<HTMLDivElement>) {
            if (cardDisplay.current) {
                const horizontalCardAmount =  Math.floor(cardDisplay.current.offsetWidth / 202);
                const verticalCardAmount = Math.floor(cardDisplay.current.offsetHeight / 280);
                setCardsVisible(horizontalCardAmount * verticalCardAmount);
            }
        }
        
        window.addEventListener("resize", () => {
            updateCardsVisible(cardDisplay);
        }) 
        
        updateCardsVisible(cardDisplay);
        return () => {
            window.removeEventListener("resize", () => {})
        }
    }, [])

    async function getCards(): Promise<Card[]>  {
        const cards = await fetch("https://arkhamdb.com/api/public/cards/");
        
        return await cards.json();
    }
    
    function filterCode(cards: Card[]) {
        if (filterStore.filter.codes.size === 0) {
            return cards;
        }
        
        return cards.filter((card) => {
            return filterStore.filter.codes.has(card.pack_code)
        })
    }
    
    if (cards.data === undefined) {
        return <div ref={cardDisplay} className="flex flex-grow items-center justify-center">
            <Spinner label="Loading cards..." size="lg"/>
        </div>
    }
    
    return <div className="flex flex-grow flex-col">
        <div ref={cardDisplay}
             className="flex-grow grid grid-rows-[repeat(auto-fit,minmax(280px,1fr))] grid-cols-[repeat(auto-fit,minmax(202px,1fr))] overflow-hidden">
            {
                    filteredCards
                    .slice(cardsVisible*(page-1), cardsVisible*page)
                    .map((card) => {
                        return <CardInstance key={crypto.randomUUID()} card={card}/>
                    })
            }
        </div>
        <div className="h-10 flex items-center justify-center w-full overflow-hidden">
            <Pagination total={Math.floor(filteredCards.length/cardsVisible)} className="pf-0" page={page} onChange={setPage}/>
        </div>
    </div>
}

function CardInstance({card}: { card: Card }) {

    return <div className="h-[280px] flex flex-col items-center justify-center">
        <Image src={"https://arkhamdb.com/" + card.imagesrc} height={280} width={202}/>
    </div>
}