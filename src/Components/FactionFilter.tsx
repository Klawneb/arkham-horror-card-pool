import { CheckboxGroup, Chip, useCheckbox, VisuallyHidden} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";
import {factionColors} from "../utils.ts";

export default function FactionFilter() {
    const filterStore = useFilterStore()
    
    return <div className="p-2">
        <CheckboxGroup value={filterStore.filter.factions} onValueChange={filterStore.setFactions} orientation={"horizontal"} classNames={{
            wrapper: "grid grid-cols-3 auto-cols-fr"
        }}>
            <CustomCheckbox value="guardian" color={"guardian"}/>
            <CustomCheckbox value="seeker" color={"seeker"}/>
            <CustomCheckbox value="rogue" color={"rogue"}/>
            <CustomCheckbox value="mystic" color={"mystic"}/>
            <CustomCheckbox value="survivor" color={"survivor"}/>
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