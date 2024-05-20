import {Image, Modal, ModalBody, ModalContent, Pagination, Spinner, useDisclosure} from "@nextui-org/react";
import {Card} from "../types.ts";
import {useFilterStore, usePageStore} from "../stores.ts";
import {Dispatch, RefObject, SetStateAction, useContext, useEffect, useRef, useState} from "react";
import {useAutoAnimate} from "@formkit/auto-animate/react";
import {filterCards} from "../cardFilter.ts";
import useKeyDown from "../hooks/useKeyDown.ts";
import parseCardText from "../cardTextParser.ts";
import {Interweave} from "interweave";
import {CardContext} from "../App.tsx";

export default function CardDisplay() {
    const filterStore = useFilterStore();
    const cards = useContext(CardContext)
    const cardDisplayRef = useRef<HTMLDivElement>(null);
    const [cardsVisible, setCardsVisible] = useState(0)
    const [modalCard, setModalCard] = useState<Card | undefined>()
    const pageStore = usePageStore()
    const filteredCards = filterCards(filterStore.filter, cards, cardsVisible)
    const [animationParent] = useAutoAnimate()
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    useKeyDown(showNextCard, ["ArrowRight"]);
    useKeyDown(showPrevCard, ["ArrowLeft"]);
    

    useEffect(() => {
        function updateCardsVisible(cardDisplay: RefObject<HTMLDivElement>) {
            if (cardDisplay.current) {
                const horizontalCardAmount = Math.floor(cardDisplay.current.offsetWidth / 202);
                const verticalCardAmount = Math.floor(cardDisplay.current.offsetHeight / 280);
                setCardsVisible(horizontalCardAmount * verticalCardAmount);
            }
        }

        window.addEventListener("resize", () => {
            updateCardsVisible(cardDisplayRef);
        })

        updateCardsVisible(cardDisplayRef);
        return () => {
            window.removeEventListener("resize", () => {
            })
        }
    }, [])

    function showNextCard() {
        if (!modalCard) {
            return;
        }

        const cardIndex = filteredCards.findIndex((card) => card === modalCard);
        console.log(filteredCards.length)
        setModalCard(filteredCards[Math.min(cardIndex + 1, filteredCards.length-1)]);
    }

    function showPrevCard() {
        if (!modalCard) {
            return;
        }

        const cardIndex = filteredCards.findIndex((card) => card === modalCard);
        setModalCard(filteredCards[Math.max(cardIndex - 1, 0)]);
    }

    if (cards.length === 0) {
        return <div ref={cardDisplayRef} className="flex flex-grow items-center justify-center">
            <Spinner label="Loading cards..." size="lg"/>
        </div>
    }

    return <div className="flex flex-grow flex-col">
        <div ref={cardDisplayRef}
             className="flex-grow overflow-hidden">
            <div ref={animationParent}
                 className="w-full h-full grid grid-rows-[repeat(auto-fit,minmax(280px,1fr))] grid-cols-[repeat(auto-fit,minmax(202px,1fr))]">
                {
                    filteredCards
                        .slice(cardsVisible * (pageStore.page - 1), cardsVisible * pageStore.page)
                        .map((card) => {
                            return <CardInstance key={card.octgn_id} card={card} onOpen={onOpen}
                                                 setModalCard={setModalCard}/>
                        })
                }
            </div>

        </div>
        <div className="h-10 flex items-center justify-center w-full overflow-hidden">
            <Pagination total={Math.floor(filteredCards.length / cardsVisible)} className="pf-0" page={pageStore.page}
                        onChange={pageStore.setPage}/>
        </div>
        <CardModal card={modalCard} isOpen={isOpen} onOpenChange={onOpenChange} showNextCard={showNextCard} showPrevCard={showPrevCard}/>
    </div>
}

interface CardInstanceProps {
    card: Card,
    onOpen: () => void,
    setModalCard: Dispatch<SetStateAction<Card | undefined>>
}

function CardInstance({card, onOpen, setModalCard}: CardInstanceProps) {
    return <div className="h-[280px] flex flex-col items-center justify-center">
        <Image src={"https://arkhamdb.com/" + card.imagesrc} fallbackSrc={"missing.png"} height={280} width={202} onClick={() => {
            setModalCard(card)
            onOpen();
        }}
               className="hover:cursor-pointer"/>
    </div>
}

interface CardModalProps {
    card: Card | undefined,
    isOpen: boolean,
    onOpenChange: () => void,
    showNextCard: () => void,
    showPrevCard: () => void,
}

function CardModal({card, isOpen, onOpenChange, showNextCard, showPrevCard}: CardModalProps) {
    if (!card) {
        return null
    }

    return <Modal isOpen={isOpen} onOpenChange={onOpenChange} hideCloseButton={true} size="5xl" backdrop={"blur"}
                  className="border-0 dark">

        <ModalContent className="bg-zinc-800 overflow-visible"> 
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                 stroke="currentColor"
                 className="w-20 h-20 absolute -left-24 top-1/2 transform -translate-y-1/2 stroke-foreground transition-all hover:cursor-pointer hover:h-28 hover:w-28 hover:-left-28"
                onClick={showPrevCard}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5"/>
            </svg>


            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                 className="w-20 h-20 absolute -right-24 top-1/2 transform -translate-y-1/2 stroke-foreground transition-all hover:cursor-pointer hover:h-28 hover:w-28 hover:-right-28"
                 onClick={showNextCard}
            >
                <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"/>
            </svg>
            <ModalBody className="p-0">
                <div className="flex">
                    <div className="min-w-[432px] min-h-[600px]">
                        {
                            card.type_code === "investigator" ?
                                <div className={"w-full h-full flex flex-col items-center justify-center"}>
                                    <Image src={"https://arkhamdb.com/" + card.imagesrc}
                                           fallbackSrc={"missing.png"}/>
                                    <Image src={"https://arkhamdb.com/" + card.backimagesrc}
                                           fallbackSrc={"missing.png"}/>
                                </div>
                                
                                :
                                <Image src={"https://arkhamdb.com/" + card.imagesrc} height={600} width={432}
                                       fallbackSrc={"missing.png"}/>
                        }
                        
                    </div>
                    <div className="p-10 flex flex-col">
                        <p className="text-3xl text-foreground font-bold mb-4">{card.name}</p>
                        <p className="text-xl text-foreground">
                            <span className="font-bold tracking-wide whitespace-pre">Cost: </span>{card.cost ?? 0}
                        </p>
                        <p className="text-xl text-foreground">
                            <span className="font-bold tracking-wide whitespace-pre">XP: </span>{card.xp ?? 0}</p>
                        <p className="text-xl text-foreground">
                                <span
                                    className="font-bold tracking-wide whitespace-pre">Faction: </span>{card.faction_name}
                        </p>
                        <div className="flex-grow flex flex-col items-center justify-center">
                            <Interweave className="text-xl text-foreground inl" content={parseCardText(card.real_text ?? "")}/>
                            {
                                card.back_text ?
                                    <Interweave className="text-xl text-foreground mt-6" content={parseCardText(card.back_text ?? "")}/>
                                    :
                                    null
                            }
                        </div>
                        <p className="text-xl text-foreground font-bold">{card.pack_name}</p>
                    </div>
                </div>
            </ModalBody>
        </ModalContent>
    </Modal>
}