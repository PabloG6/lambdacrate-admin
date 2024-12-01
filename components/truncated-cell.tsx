import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
interface TruncatedCellProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}
export const TruncatedCell: React.FC<TruncatedCellProps> = ({
  children,
  className,
  content,
}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger
          asChild
          className={cn(
            "truncate overflow-hidden whitespace-nowrap max-w-[150px]",
            className,
          )}
        >
          <div>{children}</div>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs break-words">{content}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
