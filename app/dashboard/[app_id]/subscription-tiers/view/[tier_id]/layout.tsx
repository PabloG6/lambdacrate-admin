import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getSubscriptionTier } from "../../actions";
import { Wallet, User } from "lucide-react";
import { NavLink, Navbar } from "@/components/navbar";



export default async function Layout({params: {tier_id, app_id}, children}: {params: {tier_id: string, app_id: string}, children: React.ReactNode}) { 
    console.log(app_id, 'app_id null')
    const links: NavLink[] = [
        {
            label: 'Subscriptions',
            href:`/dashboard/${app_id}/subscription-tiers/view/${tier_id}`,
            segment: null
        }
      ,
        {
            label: 'Feature Flags',
            href: `/dashboard/${app_id}/subscription-tiers/view/${tier_id}/feature-flags`,
            segment: 'feature-flags'
        }
      
      
      ] 
    const results = await getSubscriptionTier(tier_id);

    return <>
     <div className="flex w-full flex-col gap-2 my-4">
        <h1 className="font-bold text-lg mb-4">Tier Details</h1>
        <h2 className="text-xl font-medium">{results.name}</h2>
        <p className="text-muted-foreground font-light">{Intl.NumberFormat('en-US', {currency: 'USD', style: 'currency', minimumFractionDigits: 2}).format(results.price)}/month</p>
      </div>

      <div className="grid grid-cols-3 gap-3 my-4">
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2"> <Wallet/>Projected MRR</CardTitle>
                <CardDescription>Your projected earnings at the end of the month.</CardDescription>

            </CardHeader>
            <CardContent>
                <span className="text-lg font-medium">$488.00</span>
            </CardContent>
        </Card>
        <Card>
            <CardHeader>
                <CardTitle className="flex gap-2"><User></User>Users</CardTitle>
                <CardDescription>Number of users subscribed to this plan.</CardDescription>

            </CardHeader>
            <CardContent>
            <span className="text-lg font-medium">338 active users. </span>
            </CardContent>
        </Card>
      </div>
      <Navbar navigation={links}/>
      
    {children}</>
}