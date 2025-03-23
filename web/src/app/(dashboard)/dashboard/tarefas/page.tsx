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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Calendar, User, CheckCircle, Clock, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Tarefas - Easy Board",
  description: "Gerenciamento de tarefas no Easy Board",
};

export default function TarefasPage() {
  // Dados simulados de tarefas
  const tarefas = [
    {
      id: "1",
      titulo: "Implementar sistema de autenticação",
      descricao: "Criar telas de login, registro e recuperação de senha",
      status: "done",
      prioridade: "high",
      sprint: "Sprint 1",
      responsavel: "Ana Silva",
    },
    {
      id: "2",
      titulo: "Desenvolver componentes de UI",
      descricao: "Criar componentes base como botões, inputs, cards, etc",
      status: "done",
      prioridade: "medium",
      sprint: "Sprint 1",
      responsavel: "Carlos Oliveira",
    },
    {
      id: "3",
      titulo: "Criar dashboard principal",
      descricao: "Implementar layout e gráficos do dashboard",
      status: "in-progress",
      prioridade: "high",
      sprint: "Sprint 2",
      responsavel: "Juliana Mendes",
    },
    {
      id: "4",
      titulo: "Implementar gerenciamento de equipes",
      descricao: "Criar CRUD de equipes e convites para membros",
      status: "in-progress",
      prioridade: "medium",
      sprint: "Sprint 2",
      responsavel: "Ana Silva",
    },
    {
      id: "5",
      titulo: "Otimizar carregamento da aplicação",
      descricao: "Melhorar performance e tempo de carregamento",
      status: "todo",
      prioridade: "low",
      sprint: "Sprint 3",
      responsavel: null,
    },
    {
      id: "6",
      titulo: "Corrigir bug no formulário de registro",
      descricao: "Resolver problema com validação de email",
      status: "review",
      prioridade: "high",
      sprint: "Sprint 2",
      responsavel: "Carlos Oliveira",
    },
  ];

  // Função para obter a cor do badge de acordo com a prioridade
  const getPriorityBadge = (prioridade: string) => {
    switch (prioridade) {
      case "high":
        return <Badge variant="outline" className="bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800">Alta</Badge>;
      case "medium":
        return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800">Média</Badge>;
      case "low":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Baixa</Badge>;
      default:
        return null;
    }
  };

  // Função para obter o ícone e a cor do status
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "todo":
        return (
          <Badge variant="outline" className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            A fazer
          </Badge>
        );
      case "in-progress":
        return (
          <Badge variant="default" className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            Em progresso
          </Badge>
        );
      case "review":
        return (
          <Badge variant="secondary" className="flex items-center gap-1">
            <User className="h-3 w-3" />
            Em revisão
          </Badge>
        );
      case "done":
        return (
          <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800 flex items-center gap-1">
            <CheckCircle className="h-3 w-3" />
            Concluído
          </Badge>
        );
      default:
        return null;
    }
  };

  // Filtrar tarefas por status para as diferentes tabs
  const tarefasTodo = tarefas.filter((tarefa) => tarefa.status === "todo");
  const tarefasInProgress = tarefas.filter((tarefa) => tarefa.status === "in-progress");
  const tarefasReview = tarefas.filter((tarefa) => tarefa.status === "review");
  const tarefasDone = tarefas.filter((tarefa) => tarefa.status === "done");

  // Componente de card de tarefa para reutilização
  const TaskCard = ({ tarefa }: { tarefa: any }) => (
    <Card key={tarefa.id} className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <CardTitle className="text-lg">{tarefa.titulo}</CardTitle>
          {getPriorityBadge(tarefa.prioridade)}
        </div>
        <CardDescription>{tarefa.descricao}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-2">
        <div className="flex items-center text-sm text-muted-foreground">
          <Calendar className="mr-1 h-4 w-4" />
          <span>Sprint: {tarefa.sprint}</span>
        </div>
        {tarefa.responsavel && (
          <div className="flex items-center text-sm text-muted-foreground">
            <User className="mr-1 h-4 w-4" />
            <span>Responsável: {tarefa.responsavel}</span>
          </div>
        )}
        <div className="flex items-center">
          {getStatusBadge(tarefa.status)}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Link href={`/dashboard/tarefas/${tarefa.id}`}>
          <Button variant="outline" size="sm">
            Ver Detalhes
          </Button>
        </Link>
        <Link href={`/dashboard/tarefas/${tarefa.id}/editar`}>
          <Button size="sm">
            Editar
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Tarefas</h2>
        <Link href="/dashboard/tarefas/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Tarefa
          </Button>
        </Link>
      </div>
      
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">Todas ({tarefas.length})</TabsTrigger>
          <TabsTrigger value="todo">A Fazer ({tarefasTodo.length})</TabsTrigger>
          <TabsTrigger value="in-progress">Em Progresso ({tarefasInProgress.length})</TabsTrigger>
          <TabsTrigger value="review">Em Revisão ({tarefasReview.length})</TabsTrigger>
          <TabsTrigger value="done">Concluídas ({tarefasDone.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tarefas.map((tarefa) => (
              <TaskCard key={tarefa.id} tarefa={tarefa} />
            ))}
            <Card className="flex h-[240px] flex-col items-center justify-center">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <Link href="/dashboard/tarefas/nova">
                  <Button variant="outline" size="lg" className="h-20 w-20 rounded-full">
                    <PlusCircle className="h-8 w-8" />
                  </Button>
                </Link>
                <p className="mt-4 text-sm text-muted-foreground">
                  Criar Nova Tarefa
                </p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="todo" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tarefasTodo.map((tarefa) => (
              <TaskCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="in-progress" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tarefasInProgress.map((tarefa) => (
              <TaskCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="review" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tarefasReview.map((tarefa) => (
              <TaskCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="done" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {tarefasDone.map((tarefa) => (
              <TaskCard key={tarefa.id} tarefa={tarefa} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
} 