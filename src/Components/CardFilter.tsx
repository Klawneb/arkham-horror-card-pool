import {useQuery} from "@tanstack/react-query";
import {Pack} from "../types.ts";
import {Card, Divider, Tab, Tabs} from "@nextui-org/react";
import PackFilter from "./PackFilter.tsx";
import TextFilter from "./TextFilter.tsx";
import FactionFilter from "./FactionFilter.tsx";
import XPFilter from "./XPFilter.tsx";
import CostFilter from "./CostFilter.tsx";
import InvestigatorFilter from "./InvestigatorFilter.tsx";
import DeckList from "./DeckList.tsx";


async function getPacks(): Promise<Pack[]> {
    const packs = await fetch("https://arkhamdb.com/api/public/packs/");
    
    return await packs.json();
}

export default function CardFilterSelector() {
    const packs = useQuery({ queryKey: ["packs"], queryFn: getPacks})
    
    return <div className="w-96 h-screen">
        <Card className="flex h-full" radius="none">
            <Tabs fullWidth color={"primary"} size={"lg"} classNames={{
                panel: "flex flex-col h-full p-0",
                tabList: "rounded-none"
            }}>
                <Tab title={"Card Search"}>
                    <TextFilter/>
                    <Divider/>
                    <PackFilter packs={packs.data}/>
                    <Divider/>
                    <FactionFilter/>
                    <Divider/>
                    <XPFilter/>
                    <Divider/>
                    <CostFilter/>
                    <Divider/>
                    <InvestigatorFilter/>
                </Tab>
                <Tab title={"Decks"}>
                    <DeckList/>
                </Tab>
            </Tabs>
        </Card>
    </div>
}