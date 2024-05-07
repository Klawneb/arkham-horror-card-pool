﻿import {useQuery} from "@tanstack/react-query";
import {Image, Modal, ModalBody, ModalContent, Pagination, Spinner, useDisclosure} from "@nextui-org/react";
import {Card} from "../types.ts";
import {useFilterStore} from "../stores.ts";
import {RefObject, useEffect, useRef, useState} from "react";

export default function CardDisplay() {
    const cards = useQuery({queryKey: ["cards"], queryFn: getCards});
    const filterStore = useFilterStore();
    const cardDisplay = useRef<HTMLDivElement>(null);
    const [cardsVisible, setCardsVisible] = useState(0)
    const [page, setPage] = useState(1);
    const filteredCards = filterCode(cards.data ? cards.data : [])

    useEffect(() => {
        function updateCardsVisible(cardDisplay: RefObject<HTMLDivElement>) {
            if (cardDisplay.current) {
                const horizontalCardAmount = Math.floor(cardDisplay.current.offsetWidth / 202);
                const verticalCardAmount = Math.floor(cardDisplay.current.offsetHeight / 280);
                setCardsVisible(horizontalCardAmount * verticalCardAmount);
            }
        }

        window.addEventListener("resize", () => {
            updateCardsVisible(cardDisplay);
        })

        updateCardsVisible(cardDisplay);
        return () => {
            window.removeEventListener("resize", () => {
            })
        }
    }, [])

    async function getCards(): Promise<Card[]> {
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
                    .slice(cardsVisible * (page - 1), cardsVisible * page)
                    .map((card) => {
                        return <CardInstance key={crypto.randomUUID()} card={card}/>
                    })
            }
        </div>
        <div className="h-10 flex items-center justify-center w-full overflow-hidden">
            <Pagination total={Math.floor(filteredCards.length / cardsVisible)} className="pf-0" page={page}
                        onChange={setPage}/>
        </div>
    </div>
}

function CardInstance({card}: { card: Card }) {
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return <div className="h-[280px] flex flex-col items-center justify-center">
        <Image src={"https://arkhamdb.com/" + card.imagesrc} height={280} width={202} onClick={onOpen}
               className="hover:cursor-pointer"/>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} size="5xl" backdrop={"blur"}
               className="border-0 dark">
            <ModalContent className="bg-zinc-800">
                <ModalBody className="p-0">
                    <div className="flex">
                        <Image src={"https://arkhamdb.com/" + card.imagesrc} height={600} width={432}
                               className="min-w-[432px] min-h-[600px]"/>
                        <div className="p-10 flex flex-col">
                            <p className="text-xl text-foreground"><span className="font-bold tracking-wide">Cost:</span> {card.cost}</p>
                            <p className="text-xl text-foreground">XP: {card.xp}</p>
                            <p className="text-xl text-foreground">Faction: {card.faction_name}</p>
                            <div className="flex-grow flex items-center justify-center">
                                <p className="text-xl text-foreground">Text: {card.text}</p>
                            </div>
                            <p className="text-xl text-foreground font-bold">{card.pack_name}</p>
                        </div>
                    </div>
                </ModalBody>
            </ModalContent>
        </Modal>
    </div>
}