import { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlusCircle, Calendar, CheckCircle2, Clock } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Sprints - Easy Board",
  description: "Gerenciamento de sprints no Easy Board",
};

export default function SprintsPage() {
  // Dados simulados de sprints
  const sprints = [
    {
      id: "1",
      nome: "Sprint 1",
      descricao: "Implementação das funcionalidades de autenticação",
      dataInicio: "2023-03-01",
      dataFim: "2023-03-15",
      status: "completed",
      equipe: "Equipe de Desenvolvimento",
      tarefas: 12,
      tarefasConcluidas: 12,
    },
    {
      id: "2",
      nome: "Sprint 2",
      descricao: "Desenvolvimento do dashboard e páginas principais",
      dataInicio: "2023-03-16",
      dataFim: "2023-03-30",
      status: "completed",
      equipe: "Equipe de Desenvolvimento",
      tarefas: 15,
      tarefasConcluidas: 14,
    },
    {
      id: "3",
      nome: "Sprint 3",
      descricao: "Implementação do gerenciamento de usuários e equipes",
      dataInicio: "2023-04-01",
      dataFim: "2023-04-15",
      status: "active",
      equipe: "Equipe de Desenvolvimento",
      tarefas: 10,
      tarefasConcluidas: 5,
    },
    {
      id: "4",
      nome: "Sprint 4",
      descricao: "Melhorias de UX e correção de bugs",
      dataInicio: "2023-04-16",
      dataFim: "2023-04-30",
      status: "planned",
      equipe: "Equipe de Design",
      tarefas: 8,
      tarefasConcluidas: 0,
    },
  ];

  // Função para definir a cor do badge com base no status
  const getBadgeVariant = (status: string) => {
    switch (status) {
      case "active":
        return "default";
      case "completed":
        return "success";
      case "planned":
        return "secondary";
      default:
        return "outline";
    }
  };

  // Função para traduzir o status
  const getStatusText = (status: string) => {
    switch (status) {
      case "active":
        return "Em andamento";
      case "completed":
        return "Concluído";
      case "planned":
        return "Planejado";
      default:
        return status;
    }
  };

  // Função para obter o ícone de acordo com o status
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Clock className="h-4 w-4 mr-1" />;
      case "completed":
        return <CheckCircle2 className="h-4 w-4 mr-1" />;
      case "planned":
        return <Calendar className="h-4 w-4 mr-1" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Sprints</h2>
        <Link href="/dashboard/sprints/novo">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Novo Sprint
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {sprints.map((sprint) => (
          <Card key={sprint.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <CardTitle>{sprint.nome}</CardTitle>
                <Badge variant={getBadgeVariant(sprint.status)} className="flex items-center">
                  {getStatusIcon(sprint.status)}
                  {getStatusText(sprint.status)}
                </Badge>
              </div>
              <CardDescription>{sprint.descricao}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="mr-1 h-4 w-4" />
                <span>
                  {formatDate(sprint.dataInicio)} - {formatDate(sprint.dataFim)}
                </span>
              </div>
              <div className="text-sm text-muted-foreground">
                <span>Equipe: {sprint.equipe}</span>
              </div>
              <div className="text-sm">
                <span className="font-medium">{sprint.tarefasConcluidas}</span>
                <span className="text-muted-foreground"> de </span>
                <span className="font-medium">{sprint.tarefas}</span>
                <span className="text-muted-foreground"> tarefas concluídas</span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div 
                  className="h-full bg-primary" 
                  style={{ 
                    width: `${(sprint.tarefasConcluidas / sprint.tarefas) * 100}%` 
                  }}
                />
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/dashboard/sprints/${sprint.id}`}>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </Link>
              <Link href={`/dashboard/sprints/${sprint.id}/tarefas`}>
                <Button size="sm">
                  Tarefas
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        <Card className="flex h-[260px] flex-col items-center justify-center">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Link href="/dashboard/sprints/novo">
              <Button variant="outline" size="lg" className="h-20 w-20 rounded-full">
                <PlusCircle className="h-8 w-8" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Criar Novo Sprint
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 