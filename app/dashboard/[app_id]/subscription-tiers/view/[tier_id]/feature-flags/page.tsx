import { endpoint } from "@/app/env"
import { headers } from "next/headers";
import SubFeatureFlagTable from "./table";
import { getFeatureFlagTiers } from "../../../actions";

export default async function Page({params: {tier_id}}: {params: {tier_id: string}}) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('tier_id', tier_id);
    const results = await getFeatureFlagTiers(tier_id)

    return <SubFeatureFlagTable data={results}></SubFeatureFlagTable>

 
}