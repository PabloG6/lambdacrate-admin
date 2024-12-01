import { DataTable } from "@/components/data-table/data-table";
import { getFeatureFlagTiers } from "../../../actions";

export default async function Page({params: {tier_id}}: {params: {tier_id: string}}) {
    const urlSearchParams = new URLSearchParams();
    urlSearchParams.append('tier_id', tier_id);
    const results = await getFeatureFlagTiers(tier_id)

    return <DataTable data={results} columns={[]}></DataTable>

 
}