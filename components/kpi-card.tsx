import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpIcon, ArrowDownIcon } from "lucide-react";

interface KPICardProps {
  title: string;
  value: string;
  change: number;
  data: number[];
  icon: React.ElementType;
}

const KPICard: React.FC<KPICardProps> = ({
  title,
  value,
  change,
  data,
  icon,
}) => {
  const isPositive = change >= 0;
  const changeColor = isPositive ? "text-green-600" : "text-red-600";
  const Icon = isPositive ? ArrowUpIcon : ArrowDownIcon;

  const max = Math.max(...data);
  const min = Math.min(...data);

  return (
    <Card className="w-full">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        {React.createElement(icon, {
          className: "h-4 w-4 text-muted-foreground",
        })}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center space-x-2 mt-1">
          <Icon className={`h-4 w-4 ${changeColor}`} />
          <p className={`text-sm ${changeColor}`}>
            {isPositive ? "+" : ""}
            {change.toFixed(2)}%
          </p>
          <p className="text-sm text-muted-foreground">from last month</p>
        </div>
        <div className="mt-4 h-[40px]">
          <svg width="100%" height="100%" viewBox={`0 0 ${data.length} 40`}>
            {data.map((d, i) => (
              <line
                key={i}
                x1={i}
                y1={40 - ((d - min) / (max - min)) * 40}
                x2={i}
                y2={40}
                stroke="currentColor"
                strokeWidth="2"
                className="text-primary"
              />
            ))}
          </svg>
        </div>
      </CardContent>
    </Card>
  );
};

export default KPICard;
