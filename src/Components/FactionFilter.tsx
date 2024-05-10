import { CheckboxGroup, Chip, useCheckbox, VisuallyHidden} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";

const factionColors = new Map<string, string>([
    ["blue", "bg-blue-500"],
    ["green", "bg-green-500"],
    ["red", "bg-red-500"],
    ["yellow", "bg-yellow-500"],
    ["purple", "bg-purple-500"],
    ["neutral", "bg-neutral-500"]
]);

export default function FactionFilter() {
    const filterStore = useFilterStore()
    
    return <div className="p-2">
        <CheckboxGroup value={filterStore.filter.factions} onValueChange={filterStore.setFactions} orientation={"horizontal"} classNames={{
            wrapper: "grid grid-cols-3 auto-cols-fr"
        }}>
            <CustomCheckbox value="guardian" color={"blue"}/>
            <CustomCheckbox value="seeker" color={"yellow"}/>
            <CustomCheckbox value="rogue" color={"green"}/>
            <CustomCheckbox value="mystic" color={"purple"}/>
            <CustomCheckbox value="survivor" color={"red"}/>
            <CustomCheckbox value="neutral" color={"neutral"}/>
        </CheckboxGroup>
    </div>
}

interface CustomCheckboxProps {
    value: string,
    color: string
}

function CustomCheckbox({ value, color }: CustomCheckboxProps) {
    const {isSelected, getInputProps, getBaseProps} = useCheckbox({
        value
    })

    return <label {...getBaseProps()} className={"w-full cursor-pointer"}>
        <VisuallyHidden>
            <input {...getInputProps()}/>
        </VisuallyHidden>
        <Chip variant={"solid"} classNames={{
            base: `max-w-full w-full text-center ${factionColors.get(color)} ${isSelected ? "bg-opacity-80" : "bg-opacity-30"}`
        }} >
            {value.slice(0,1).toUpperCase() + value.slice(1, value.length)}
        </Chip>
    </label>
}