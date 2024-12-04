"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", subscriptions: 200, customers: 150, requests: 3000 },
  { month: "Feb", subscriptions: 250, customers: 180, requests: 3500 },
  { month: "Mar", subscriptions: 300, customers: 200, requests: 4000 },
  { month: "Apr", subscriptions: 280, customers: 220, requests: 4200 },
  { month: "May", subscriptions: 350, customers: 250, requests: 4800 },
  { month: "Jun", subscriptions: 400, customers: 280, requests: 5500 },
];

const OverviewChart = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="subscriptions"
              stroke="#8884d8"
              activeDot={{ r: 8 }}
            />
            <Line type="monotone" dataKey="customers" stroke="#82ca9d" />
            <Line type="monotone" dataKey="requests" stroke="#ffc658" />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default OverviewChart;
