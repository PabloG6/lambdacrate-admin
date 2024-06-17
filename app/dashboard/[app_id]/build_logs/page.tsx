import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAppMetaData } from "../actions";

export default async function Page(props: { params: { app_id: string }, searchParams: {} }) {
    const response = await getAppMetaData(props.params.app_id);
    console.log(response);
  return (
    <>
    <div className="text-xl font-medium text-foreground">
        {/* {response.name}{" "} */}
      </div>
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Build Logs</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-1">
        <AccordionTrigger>Api Logs</AccordionTrigger>
        <AccordionContent></AccordionContent>
      </AccordionItem>
    </Accordion></>
    
  );
}
