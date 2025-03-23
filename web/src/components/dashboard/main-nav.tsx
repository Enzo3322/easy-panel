"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/equipes",
      label: "Equipes",
      active: pathname === "/dashboard/equipes" || pathname.startsWith("/dashboard/equipes/"),
    },
    {
      href: "/dashboard/sprints",
      label: "Sprints",
      active: pathname === "/dashboard/sprints" || pathname.startsWith("/dashboard/sprints/"),
    },
    {
      href: "/dashboard/tarefas",
      label: "Tarefas",
      active: pathname === "/dashboard/tarefas" || pathname.startsWith("/dashboard/tarefas/"),
    },
  ];

  return (
    <nav
      className={cn("flex items-center space-x-4 lg:space-x-6", className)}
      {...props}
    >
      <Link href="/dashboard" className="flex items-center space-x-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-6 w-6"
        >
          <rect width="20" height="14" x="2" y="5" rx="2" />
          <path d="M2 10h20" />
        </svg>
        <span className="font-bold inline-block">Easy Board</span>
      </Link>
      
      {routes.map((route) => (
        <Link
          key={route.href}
          href={route.href}
          className={cn(
            "text-sm font-medium transition-colors hover:text-primary",
            route.active
              ? "text-primary"
              : "text-muted-foreground"
          )}
        >
          {route.label}
        </Link>
      ))}
    </nav>
  );
} 