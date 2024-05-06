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

    return <div className="p-2">
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
    
    return <div className="mb-1 flex flex-col">
        { campaigns.has(pack.cycle_position) && pack.position === 1 ?
            <div className="mb-1">
                <Checkbox onValueChange={handleCampaignChange}>{campaigns.get(pack.cycle_position)?.name}</Checkbox>
            </div>
            :
            null
        }   
        <Checkbox onValueChange={handlePackChange} isSelected={filterStore.filter.codes.has(pack.code)}
                  className={`${campaigns.has(pack.cycle_position) ? "ml-2" : ""}`}
        >{pack.name}</Checkbox>
    </div>
}