import {Campaign, Pack} from "../types.ts";
import {Checkbox, Spinner} from "@nextui-org/react";
import {useFilterStore} from "../stores.ts";
import campaign_list from "../assets/campaigns.json"

function getCampaigns() {
    const campaigns = new Map<number, Campaign>();
    for (const campaign of campaign_list) {
        campaigns.set(campaign.cycle_position, campaign);
    }
    return campaigns;
}

export default function PackFilter({ packs }: { packs: Pack[] | undefined }) {
    const campaigns = getCampaigns();
    
    if (packs === undefined) {
        return <Spinner/>
    }

    return <div className="p-2 h-1/2 overflow-auto">
        {
            packs
                .sort((a, b) => a.cycle_position - b.cycle_position)
                .map((pack) => {
                    return <PackSelector key={pack.code} pack={pack} campaigns={campaigns}/>
                })
        }
    </div>
}

function PackSelector({ pack, campaigns }: { pack: Pack, campaigns: Map<number, Campaign> }) {
    const filterStore = useFilterStore();
    
    function handlePackChange(isSelected: boolean) {
        if (isSelected) {
            filterStore.addCode(pack.code);
        } else {
            filterStore.removeCode(pack.code);
        }
    }
    
    function handleCampaignChange(isSelected: boolean) {
        if (campaigns.has(pack.cycle_position)) {
            const campaign = campaigns.get(pack.cycle_position) as Campaign;
            for (const code of campaign.codes) {
                if (isSelected) {
                    filterStore.addCode(code);
                } else {
                    filterStore.removeCode(code);
                }
            }
        }
    }
    
    return <div className="m-2 flex flex-col">
        { campaigns.has(pack.cycle_position) && pack.position === 1 ?
            <div className="flex items-center">
                <Checkbox className="p-0 mb-3" onValueChange={handleCampaignChange}>{campaigns.get(pack.cycle_position)?.name} Campaign</Checkbox>
            </div>
            :
            null
        }
        <div className="flex items-center">
            <Checkbox className={`p-0 mb-1 ${campaigns.has(pack.cycle_position) ? "ml-3" : ""}`} onValueChange={handlePackChange} isSelected={filterStore.filter.codes.has(pack.code)}>{pack.name}</Checkbox>
        </div>
    </div>
}