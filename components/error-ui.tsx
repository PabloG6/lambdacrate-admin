import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

interface ErrorUIProps {
  message?: string
  onRetry?: () => void
}

export default function ErrorUI({ 
  message = "An error occurred while fetching data.", 
  onRetry 
}: ErrorUIProps = {}) {
  return (
    <Alert variant="destructive" className="max-w-lg w-full mx-auto mt-4">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
      {onRetry && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={onRetry} 
          className="mt-2"
        >
          Try Again
        </Button>
      )}
    </Alert>
  )
}