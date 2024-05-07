import {Checkbox, CheckboxGroup} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";

export default function FactionFilter() {
    const filterStore = useFilterStore()
    
    return <div>
        <CheckboxGroup value={filterStore.filter.factions} onValueChange={filterStore.setFactions} orientation={"horizontal"} classNames={{
            wrapper: "grid grid-cols-3"
        }}>
            <Checkbox value="guardian">Guardian</Checkbox>
            <Checkbox value="seeker">Seeker</Checkbox>
            <Checkbox value="rogue">Rogue</Checkbox>
            <Checkbox value="mystic">Mystic</Checkbox>
            <Checkbox value="survivor">Survivor</Checkbox>
            <Checkbox value="neutral">Neutral</Checkbox>
        </CheckboxGroup>
    </div>
}