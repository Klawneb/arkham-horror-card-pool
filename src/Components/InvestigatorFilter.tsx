﻿import {Autocomplete, AutocompleteItem, Image} from "@nextui-org/react";
import {useContext, useState} from "react";
import {CardContext} from "../App.tsx";
import {Card} from "../types.ts";
import {useFilterStore} from "../stores.ts";
import {factionColors} from "../utils.ts";

export default function InvestigatorFilter() {
    const cards = useContext(CardContext);
    const filterStore = useFilterStore();
    const investigators = cards.filter(card => card.type_code === "investigator");
    const [selectedID, setSelectedID] = useState<string>("");
    const [selectedInvestigator, setSelectedInvestigator] = useState<Card | undefined>(undefined);

    function handleSelectionChange(selection: string | number | null) {
        const newSelectedID = selection ? selection.toString() : "";
        if (newSelectedID !== selectedID) {
            setSelectedID(newSelectedID);
            const investigator = investigators.find((card) => card.octgn_id === selection);
            setSelectedInvestigator(investigator);
            filterStore.setInvestigator(investigator);
        }
    }
    
    return <div className="p-4 h-[400px]">
        <Autocomplete label={"Investigator Filter"} scrollShadowProps={{ isEnabled: false }} selectedKey={selectedID} onSelectionChange={handleSelectionChange}>
            {
                investigators.sort((a,b) => a.faction_code < b.faction_code ? a.faction_code > b.faction_code ? 1 : -1 : 0)
                    .map((investigator) => {
                    return <AutocompleteItem className={`${factionColors.get(investigator.faction_code)} bg-opacity-25`} key={investigator.octgn_id} endContent={investigator.pack_name.replace("Investigator Expansion", "")}>{investigator.name}</AutocompleteItem>
                })
            }
        </Autocomplete>
        {
            selectedInvestigator ?
                <Image src={"https://arkhamdb.com/" + selectedInvestigator?.imagesrc} className={"mt-2"}/>
                :
                null
        }
    </div>
}