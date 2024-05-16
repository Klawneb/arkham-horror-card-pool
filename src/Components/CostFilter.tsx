import {Checkbox, CheckboxGroup} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";

export default function CostFilter() {
    const filterStore = useFilterStore()

    return <CheckboxGroup onValueChange={(value) => filterStore.setResourceCosts(value.map((x) => parseInt(x)))} orientation={"horizontal"} label={"Resource Costs"} className={"p-2 text-center"} classNames={{
        wrapper: "justify-between grid grid-cols-5"
    }}>
        <Checkbox className={"m-0 p-0"} value="0">0</Checkbox>
        <Checkbox className={"m-0 p-0"} value="1">1</Checkbox>
        <Checkbox className={"m-0 p-0"} value="2">2</Checkbox>
        <Checkbox className={"m-0 p-0"} value="3">3</Checkbox>
        <Checkbox className={"m-0 p-0"} value="4">4</Checkbox>
        <Checkbox className={"m-0 p-0"} value="5">5</Checkbox>
        <Checkbox className={"m-0 p-0"} value="6">6</Checkbox>
        <Checkbox className={"m-0 p-0"} value="7">7</Checkbox>
        <Checkbox className={"m-0 p-0"} value="10">10</Checkbox>
        <Checkbox className={"m-0 p-0"} value="12">12</Checkbox>
    </CheckboxGroup>
}