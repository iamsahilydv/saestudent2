import React from "react";
import type { LucideIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface StatsCardProps {
  title: string;
  value: string | number;
  description?: string;
  icon: LucideIcon;
  trend?: {
    value: string | number;
    positive?: boolean;
  };
  className?: string;
}

export default function StatsCard({
  title,
  value,
  description,
  icon: Icon,
  trend,
  className = "",
}: StatsCardProps) {
  return (
    <Card className={`sae-card-hover ${className}`}>
      <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && (
          <div
            className={`text-xs mt-1 ${
              trend.positive ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend.positive ? "+" : ""}{trend.value}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
