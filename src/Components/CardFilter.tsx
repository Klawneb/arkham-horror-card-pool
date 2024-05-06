import {useQuery} from "@tanstack/react-query";
import {Pack} from "../types.ts";
import {Card} from "@nextui-org/react";
import PackFilter from "./PackFilter.tsx";

async function getPacks(): Promise<Pack[]> {
    const packs = await fetch("https://arkhamdb.com/api/public/packs/");
    
    return await packs.json();
}

export default function CardFilterSelector() {
    const packs = useQuery({ queryKey: ["packs"], queryFn: getPacks})
    
    return <div className="w-96 overflow-auto">
        <Card>
            <PackFilter packs={packs.data}/>
        </Card>
    </div>
}