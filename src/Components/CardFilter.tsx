import {useQuery} from "@tanstack/react-query";
import {Pack} from "../types.ts";
import {Card, Divider} from "@nextui-org/react";
import PackFilter from "./PackFilter.tsx";
import TextFilter from "./TextFilter.tsx";

async function getPacks(): Promise<Pack[]> {
    const packs = await fetch("https://arkhamdb.com/api/public/packs/");
    
    return await packs.json();
}

export default function CardFilterSelector() {
    const packs = useQuery({ queryKey: ["packs"], queryFn: getPacks})
    
    return <div className="w-96 h-screen">
        <Card className="flex flex-col h-full">
            <h1 className="text-center font-bold text-2xl">Arkham Horror Card Search</h1>
            <TextFilter/>
            <Divider/>
            <PackFilter packs={packs.data}/>
            <Divider/>
        </Card>
    </div>
}