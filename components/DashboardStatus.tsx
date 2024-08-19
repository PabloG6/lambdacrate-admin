import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { cn } from "@/lib/utils"
import { CheckCircle2Icon, XCircleIcon, LoaderIcon } from "lucide-react"

const deploymentStatuses = [
  { name: "Dashboard", status: "done" },
  { name: "API", status: "in_progress" },
  { name: "Backend", status: "failed" },
]

const StatusIcon = ({ status }: {status: string}) => {
  switch (status) {
    case "done":
      return <CheckCircle2Icon className="h-5 w-5 text-green-500" aria-hidden="true" />
    case "in_progress":
      return <LoaderIcon className="h-5 w-5 text-yellow-500 animate-spin" aria-hidden="true" />
    case "failed":
      return <XCircleIcon className="h-5 w-5 text-red-500" aria-hidden="true" />
    default:
      return null
  }
}

const StatusText = ({ status }: { status: string}) => {
  switch (status) {
    case "done":
      return <span className="sr-only">Deployment completed</span>
    case "in_progress":
      return <span className="sr-only">Deployment in progress</span>
    case "failed":
      return <span className="sr-only">Deployment failed</span>
    default:
      return null
  }
}

const StatusItem = ({ name, status}: {name: string, status: string}) => (
  <div className="flex items-center space-x-4 py-2 relative">
    <div className="absolute left-0 top-0 bottom-0 border-l-2 border-dashed border-gray-300" aria-hidden="true" />
    <div className="pl-4">
      <StatusIcon status={status} />
    </div>
    <div>
      <span className="font-medium">{name}</span>
      <StatusText status={status} />
    </div>
  </div>
)

type Props = {
    className?: string
}

export default function DashboardStatus({className}: Props) {
  return (
    <div className={cn("px-4 max-w-2xl", className)}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="deployment-status">
          <AccordionTrigger>Dashboard Status</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2 pl-4">
              {deploymentStatuses.map((item, index) => (
                <StatusItem key={index} name={item.name} status={item.status} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}