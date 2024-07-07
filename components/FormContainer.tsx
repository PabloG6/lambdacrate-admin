import { cn } from "@/lib/utils";

export default function FormContainer({
  className,
  title,
  description,
  children,
}: {
  className?: string;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn(`flex space-between flex-col gap-6`, className)}>
      <div className="flex">
        <div>
          <div className="text-foreground text-base font-semibold">{title}</div>

          <div className="text-default text-sm text-muted-foreground">
            {description}
          </div>
        </div>
      </div>
      {children}
    </div>
  );
}
