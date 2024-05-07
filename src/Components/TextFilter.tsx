import {Input, Radio, RadioGroup} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";

export default function TextFilter() {
    const filterStore = useFilterStore();

    return <div className="p-2">
        <Input value={filterStore.filter.searchTerm} onValueChange={filterStore.setSearchTerm}
               placeholder="Enter search term"/>
        <div className="flex items-center pt-1 pl-1">
            <p className="mr-2">Search: </p>
            <RadioGroup orientation="horizontal" value={filterStore.filter.searchType} onValueChange={filterStore.setSearchType}>
                <Radio value="title">Title</Radio>
                <Radio value="text">Text</Radio>
            </RadioGroup>
        </div>
    </div>
}