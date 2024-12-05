import { CheckCircle, AlertCircle, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type Status = "ready" | "payment_pending" | "payment_failed";

interface StatusIndicatorProps {
  status: Status;
}

const statusConfig: Record<
  Status,
  { label: string; icon: React.ElementType; color: string }
> = {
  ready: { label: "Ready", icon: CheckCircle, color: "text-green-500" },
  payment_pending: {
    label: "Payment Pending",
    icon: AlertCircle,
    color: "text-yellow-500",
  },
  payment_failed: {
    label: "Payment Failed",
    icon: XCircle,
    color: "text-red-500",
  },
};

export function StatusIndicator({ status }: StatusIndicatorProps) {
  const { label, icon: Icon, color } = statusConfig[status];

  return (
    <div className="flex items-center space-x-2">
      <Icon className={cn("h-5 w-5", color)} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}
