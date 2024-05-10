import {Checkbox, CheckboxGroup} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";

export default function XPFilter() {
    const filterStore = useFilterStore()
    
    return <CheckboxGroup onValueChange={(value) => filterStore.setXpCost(value.map((x) => parseInt(x)))} orientation={"horizontal"} label={"XP Cost"} className={"p-2 text-center"} classNames={{
        wrapper: "justify-between"
    }}>
        <Checkbox value="0">0</Checkbox>
        <Checkbox value="1">1</Checkbox>
        <Checkbox value="2">2</Checkbox>
        <Checkbox value="3">3</Checkbox>
        <Checkbox value="4">4</Checkbox>
        <Checkbox value="5">5</Checkbox>
    </CheckboxGroup>
}