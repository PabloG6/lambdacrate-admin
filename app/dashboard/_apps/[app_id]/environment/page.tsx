import { TabsTrigger, TabsList, Tabs } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { MoreVerticalIcon } from "lucide-react"
export default function Environment() {

    
      return (
        <div className=" w-full max-w-4xl">
          <h2 className="text-2xl font-bold mb-6">Environment Variables</h2>
          <p className="text-sm mb-4 max-w-2xl">
            Environment Variables only work in the preview and production environments.
             If you&apos;re developing locally, your local environment variables will be used.
          </p>
          <Tabs className="mb-8" defaultValue='production'>
            <TabsList>
              <TabsTrigger value='preview'>Preview</TabsTrigger>
              <TabsTrigger value={'production'}>Production</TabsTrigger>

            </TabsList>
          </Tabs>
        <div className="max-w-4xl space-y-6">
        <div className="flex mb-1 ">
            <div className="flex-1 pr-2">
              <Input placeholder="VARIABLE_NAME" />
            </div>
            <div className="flex-1 pl-2">
              <Input placeholder="ij9u23nf39nunu3asn" />
            </div>
            <Button className="ml-2">Add</Button>
          </div>
         <div className="border rounded-sm shadow-sm bg-card">
         <Table className="mb-6 ">
            <TableHeader>
              <TableRow>
                <TableHead className="w-1/3">NAME</TableHead>
                <TableHead className="w-1/3">VALUE</TableHead>
                <TableHead className="w-1/6">AGE</TableHead>
                <TableHead />
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>NODE_ENV</TableCell>
                <TableCell>Encrypted</TableCell>
         
                <TableCell>1m</TableCell>
                <TableCell className="text-right">
                  <MoreVerticalIcon className="w-4 h-4" />
                </TableCell>
              </TableRow>
            
            </TableBody>
          </Table>
         </div>
      
          <Button className="w-full" variant="outline">
            Show More
          </Button>
          <div className="text-sm underline mt-4">
            <Link href="#">Learn more about Environment Variables →</Link>
          </div>
        </div>
        </div>
      )
    
    
}