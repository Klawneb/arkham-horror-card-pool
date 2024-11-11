import {useLocalStorage} from "usehooks-ts";
import {Deck} from "../types.ts";
import {useState} from "react";
import {Button, Divider, Input, Popover, PopoverContent, PopoverTrigger, Tooltip} from "@nextui-org/react";
import {useAutoAnimate} from "@formkit/auto-animate/react";

export default function DeckList() {
    const [decks, setDecks] = useLocalStorage<Deck[]>("decks", []);
    const [deckNameInput, setDeckNameInput] = useState("");
    const [animParent] = useAutoAnimate()
    
    function addDeck(name: string) {
        const newDeck: Deck = {
            name: name,
            id: crypto.randomUUID(),
            cards: [],
        }
        
        setDecks(state => [newDeck, ...state]);
    }
    
    function deleteDeck(id: string) {
        const deckIndex = decks.findIndex(deck => deck.id === id);
        const decksCopy = [...decks];
        if (deckIndex != -1) {
            decksCopy.splice(deckIndex, 1);
        }
        setDecks(decksCopy)
    }

    return <div ref={animParent} className="flex flex-col h-full rounded-xl m-2">
        <div className="flex items-center mb-2">
            <Input value={deckNameInput} onValueChange={setDeckNameInput} label={"Deck name"} size={"sm"} classNames={{
                base: "w-full"
            }}/>
            <Button onClick={() => {
                addDeck(deckNameInput);
                setDeckNameInput("");
            }} className="ml-1 min-w-0" size={"md"} color={"success"}>Add</Button>
        </div>
        <Divider/>
        <div ref={animParent}>
            {
                decks.map(deck => {
                    return <DeckItem deleteDeck={deleteDeck} key={deck.id} deck={deck}/>;
                })
            }
        </div>
    </div>
}

interface DeckItemsProps {
    deck: Deck,
    deleteDeck: (id: string) => void
}

function DeckItem({deck, deleteDeck}: DeckItemsProps) {
    const [deletePopoverOpen, setDeletePopoverOpen] = useState(false);

    return <div className="bg-zinc-800 m-2 p-2 rounded-lg flex">
        <p title={deck.name} className="mr-auto truncate">{deck.name}</p>
        <Popover showArrow placement="right" isOpen={deletePopoverOpen}
                 onOpenChange={(open) => setDeletePopoverOpen(open)}>
            <PopoverTrigger>
                <div>
                    <Tooltip content="Delete">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5}
                             stroke="currentColor"
                             className="size-6 hover:stroke-red-500 hover:cursor-pointer transition-all">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"/>
                        </svg>
                    </Tooltip>
                </div>
            </PopoverTrigger>
            <PopoverContent>
                <div className="p-2">
                    <p className="text-center text-lg font-bold">Are you sure?</p>
                    <div className="flex justify-between mt-2">
                        <Button color="danger" className="h-6" onClick={() => deleteDeck(deck.id)}>Yes</Button>
                        <Button className="h-6 ml-2" onClick={() => setDeletePopoverOpen(false)}>No</Button>
                    </div>
                </div>
            </PopoverContent>
        </Popover>
    </div>
}