"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  Users, 
  Calendar, 
  ListTodo, 
  Settings,
  BarChart3
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const pathname = usePathname();

  const routes = [
    {
      href: "/dashboard",
      icon: Home,
      label: "Dashboard",
      active: pathname === "/dashboard",
    },
    {
      href: "/dashboard/equipes",
      icon: Users,
      label: "Equipes",
      active: pathname === "/dashboard/equipes" || pathname.startsWith("/dashboard/equipes/"),
    },
    {
      href: "/dashboard/sprints",
      icon: Calendar,
      label: "Sprints",
      active: pathname === "/dashboard/sprints" || pathname.startsWith("/dashboard/sprints/"),
    },
    {
      href: "/dashboard/tarefas",
      icon: ListTodo,
      label: "Tarefas",
      active: pathname === "/dashboard/tarefas" || pathname.startsWith("/dashboard/tarefas/"),
    },
    {
      href: "/dashboard/relatorios",
      icon: BarChart3,
      label: "Relatórios",
      active: pathname === "/dashboard/relatorios" || pathname.startsWith("/dashboard/relatorios/"),
    }
  ];

  return (
    <div className={cn("pb-12", className)} {...props}>
      <div className="space-y-4 py-4">
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Navegação
          </h2>
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={route.active ? "secondary" : "ghost"}
                size="sm"
                className={cn(
                  "w-full justify-start",
                  route.active ? "bg-primary/10" : ""
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="mr-2 h-4 w-4" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </div>
        <Separator />
        <div className="py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
            Configurações
          </h2>
          <div className="space-y-1">
            <Button
              variant={pathname === "/dashboard/perfil" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/perfil">
                <Users className="mr-2 h-4 w-4" />
                Perfil
              </Link>
            </Button>
            <Button
              variant={pathname === "/dashboard/configuracoes" ? "secondary" : "ghost"}
              size="sm"
              className="w-full justify-start"
              asChild
            >
              <Link href="/dashboard/configuracoes">
                <Settings className="mr-2 h-4 w-4" />
                Configurações
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
} 