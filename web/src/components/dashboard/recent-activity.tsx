"use client";

import { formatDate } from "@/lib/utils";

interface ActivityItem {
  id: string;
  type: "task" | "sprint" | "team" | "user";
  action: string;
  name: string;
  date: string;
  user: string;
}

const activities: ActivityItem[] = [
  {
    id: "1",
    type: "task",
    action: "concluiu",
    name: "Implementar autenticação",
    date: new Date(2023, 2, 22).toISOString(),
    user: "Ana Silva",
  },
  {
    id: "2",
    type: "sprint",
    action: "criou",
    name: "Sprint 6",
    date: new Date(2023, 2, 21).toISOString(),
    user: "Carlos Oliveira",
  },
  {
    id: "3",
    type: "task",
    action: "atualizou",
    name: "Melhorar UI do dashboard",
    date: new Date(2023, 2, 20).toISOString(),
    user: "Juliana Mendes",
  },
  {
    id: "4",
    type: "team",
    action: "adicionou",
    name: "Novo membro: Rafael Lima",
    date: new Date(2023, 2, 19).toISOString(),
    user: "Carlos Oliveira",
  },
  {
    id: "5",
    type: "task",
    action: "criou",
    name: "Corrigir bug de login",
    date: new Date(2023, 2, 18).toISOString(),
    user: "Ana Silva",
  },
  {
    id: "6",
    type: "user",
    action: "atualizou",
    name: "perfil",
    date: new Date(2023, 2, 17).toISOString(),
    user: "Juliana Mendes",
  },
];

function getActivityTypeIcon(type: ActivityItem["type"]) {
  switch (type) {
    case "task":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary"
        >
          <path d="M12 2v20M2 12h20" />
        </svg>
      );
    case "sprint":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary"
        >
          <rect width="18" height="18" x="3" y="3" rx="2" />
          <path d="M3 9h18" />
          <path d="M9 21V9" />
        </svg>
      );
    case "team":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case "user":
      return (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4 text-primary"
        >
          <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
          <circle cx="12" cy="7" r="4" />
        </svg>
      );
  }
}

export function RecentActivity() {
  return (
    <div className="space-y-8">
      {activities.map((activity) => (
        <div key={activity.id} className="flex items-start">
          <div className="mr-2 mt-0.5">
            {getActivityTypeIcon(activity.type)}
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              <span className="font-medium">{activity.user}</span>{" "}
              {activity.action}{" "}
              <span className="font-medium">{activity.name}</span>
            </p>
            <p className="text-xs text-muted-foreground">
              {formatDate(activity.date)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
} 