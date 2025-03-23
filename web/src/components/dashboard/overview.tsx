"use client";

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";

const data = [
  {
    name: "Sprint 1",
    concluido: 12,
    pendente: 5,
  },
  {
    name: "Sprint 2",
    concluido: 18,
    pendente: 3,
  },
  {
    name: "Sprint 3",
    concluido: 14,
    pendente: 8,
  },
  {
    name: "Sprint 4",
    concluido: 22,
    pendente: 2,
  },
  {
    name: "Sprint 5",
    concluido: 16,
    pendente: 4,
  },
  {
    name: "Sprint 6",
    concluido: 24,
    pendente: 0,
  },
];

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
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
        />
        <Tooltip />
        <Bar
          dataKey="concluido"
          fill="hsl(var(--primary))"
          radius={[4, 4, 0, 0]}
          name="Concluído"
        />
        <Bar
          dataKey="pendente"
          fill="hsl(var(--muted-foreground))"
          radius={[4, 4, 0, 0]}
          name="Pendente"
        />
      </BarChart>
    </ResponsiveContainer>
  );
} 