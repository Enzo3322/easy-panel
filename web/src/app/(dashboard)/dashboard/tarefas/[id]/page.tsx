import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
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
import { 
  Calendar, 
  User, 
  Clock, 
  Edit, 
  Trash2, 
  ArrowLeft, 
  CheckSquare, 
  MessageSquare, 
  File
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export const metadata: Metadata = {
  title: "Detalhes da Tarefa - Easy Board",
  description: "Visualização detalhada de uma tarefa no Easy Board",
};

export default function TarefaDetalhesPage({ params }: { params: { id: string } }) {
  // Simular busca de tarefa pelo ID - em produção, use taskService.getTaskById
  const tarefaId = params.id;
  
  // Dados simulados para demonstração
  const tarefa = {
    id: tarefaId,
    titulo: "Implementar sistema de autenticação",
    descricao: "Criar telas de login, registro e recuperação de senha seguindo o design do Figma. Implementar validação de formulários e integração com a API de autenticação. Adicionar suporte para login social com Google e Github.",
    status: "in-progress",
    prioridade: "high",
    sprint: "Sprint 1",
    responsavel: {
      id: "1",
      nome: "Ana Silva",
      email: "ana.silva@exemplo.com",
      avatar: null,
    },
    dataCriacao: "2023-10-15T10:30:00Z",
    dataInicio: "2023-10-16T08:00:00Z",
    dataPrevista: "2023-10-20T18:00:00Z",
    dataFim: null,
    comentarios: [
      {
        id: "1",
        autor: "Carlos Oliveira",
        texto: "Sugiro usar o NextAuth para a implementação do login social.",
        data: "2023-10-16T14:25:00Z",
      },
      {
        id: "2",
        autor: "Ana Silva",
        texto: "Boa sugestão! Vou implementar usando NextAuth.",
        data: "2023-10-16T15:10:00Z",
      },
    ],
    anexos: [
      {
        id: "1",
        nome: "design-auth.fig",
        tipo: "figura",
        tamanho: "2.5MB",
        url: "#",
      },
      {
        id: "2",
        nome: "requisitos-auth.pdf",
        tipo: "documento",
        tamanho: "1.2MB",
        url: "#",
      },
    ],
    subtarefas: [
      {
        id: "1",
        titulo: "Criar tela de login",
        concluida: true,
      },
      {
        id: "2",
        titulo: "Implementar autenticação com Google",
        concluida: false,
      },
      {
        id: "3",
        titulo: "Configurar validações de formulário",
        concluida: false,
      },
    ],
  };

  // Se a tarefa não for encontrada
  if (!tarefa) {
    notFound();
  }

  // Função para formatar datas
  const formatarData = (dataString: string | null) => {
    if (!dataString) return "Não definida";
    const data = new Date(dataString);
    return data.toLocaleDateString('pt-BR', { 
      day: '2-digit', 
      month: '2-digit', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
        return <Badge variant="outline">A fazer</Badge>;
      case "in-progress":
        return <Badge variant="default">Em progresso</Badge>;
      case "review":
        return <Badge variant="secondary">Em revisão</Badge>;
      case "done":
        return <Badge variant="outline" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 border-green-200 dark:border-green-800">Concluído</Badge>;
      default:
        return null;
    }
  };

  // Calcular progresso das subtarefas
  const subtarefasConcluidas = tarefa.subtarefas.filter(sub => sub.concluida).length;
  const progressoSubtarefas = Math.round((subtarefasConcluidas / tarefa.subtarefas.length) * 100);

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center mb-6">
        <Link href="/dashboard/tarefas">
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">{tarefa.titulo}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Coluna principal - Detalhes da tarefa */}
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start mb-2">
                <div className="space-y-1">
                  <CardTitle className="text-2xl">{tarefa.titulo}</CardTitle>
                  <CardDescription>ID: {tarefa.id}</CardDescription>
                </div>
                <div className="flex gap-2">
                  {getPriorityBadge(tarefa.prioridade)}
                  {getStatusBadge(tarefa.status)}
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Descrição</h3>
                <p className="text-sm">{tarefa.descricao}</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">Sprint:</span>
                    <span>{tarefa.sprint}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <User className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">Responsável:</span>
                    <span>{tarefa.responsavel?.nome || "Não atribuído"}</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center text-sm">
                    <Calendar className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">Data de Criação:</span>
                    <span>{formatarData(tarefa.dataCriacao)}</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground mr-2">Previsão:</span>
                    <span>{formatarData(tarefa.dataPrevista)}</span>
                  </div>
                </div>
              </div>

              {/* Subtarefas */}
              <div className="pt-4">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Subtarefas ({subtarefasConcluidas}/{tarefa.subtarefas.length})</h3>
                <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full" 
                    style={{ width: `${progressoSubtarefas}%` }} 
                  />
                </div>
                <ul className="mt-4 space-y-2">
                  {tarefa.subtarefas.map(subtarefa => (
                    <li key={subtarefa.id} className="flex items-start">
                      <CheckSquare 
                        className={`mr-2 h-5 w-5 mt-0.5 ${
                          subtarefa.concluida 
                            ? 'text-primary' 
                            : 'text-muted-foreground'
                        }`} 
                        fill={subtarefa.concluida ? 'currentColor' : 'none'}
                      />
                      <span className={`text-sm ${
                        subtarefa.concluida ? 'line-through text-muted-foreground' : ''
                      }`}>
                        {subtarefa.titulo}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between pt-4">
              <Link href={`/dashboard/tarefas/${tarefa.id}/editar`}>
                <Button>
                  <Edit className="mr-2 h-4 w-4" />
                  Editar Tarefa
                </Button>
              </Link>
              <Button variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Excluir
              </Button>
            </CardFooter>
          </Card>

          {/* Comentários */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <MessageSquare className="mr-2 h-5 w-5" />
                Comentários
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {tarefa.comentarios.map(comentario => (
                <div key={comentario.id} className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{comentario.autor.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{comentario.autor}</span>
                      <span className="text-xs text-muted-foreground">
                        {formatarData(comentario.data)}
                      </span>
                    </div>
                    <p className="text-sm">{comentario.texto}</p>
                  </div>
                </div>
              ))}
              <div className="pt-4">
                <Button variant="outline" className="w-full">
                  Adicionar Comentário
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Coluna lateral - Anexos e atividades */}
        <div className="space-y-6">
          {/* Informações do responsável */}
          {tarefa.responsavel && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Responsável</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>{tarefa.responsavel.nome.charAt(0)}</AvatarFallback>
                    {tarefa.responsavel.avatar && (
                      <AvatarImage src={tarefa.responsavel.avatar} alt={tarefa.responsavel.nome} />
                    )}
                  </Avatar>
                  <div>
                    <p className="font-medium">{tarefa.responsavel.nome}</p>
                    <p className="text-sm text-muted-foreground">{tarefa.responsavel.email}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Datas importantes */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Datas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Criação</h4>
                <p className="text-sm">{formatarData(tarefa.dataCriacao)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Início</h4>
                <p className="text-sm">{formatarData(tarefa.dataInicio)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Previsão de Conclusão</h4>
                <p className="text-sm">{formatarData(tarefa.dataPrevista)}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">Conclusão</h4>
                <p className="text-sm">{formatarData(tarefa.dataFim)}</p>
              </div>
            </CardContent>
          </Card>

          {/* Anexos */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <File className="mr-2 h-5 w-5" />
                Anexos
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {tarefa.anexos.map(anexo => (
                <div key={anexo.id} className="flex items-center justify-between">
                  <div className="flex items-center">
                    <File className="mr-2 h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{anexo.nome}</p>
                      <p className="text-xs text-muted-foreground">{anexo.tamanho}</p>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={anexo.url}>Baixar</Link>
                  </Button>
                </div>
              ))}
              <div className="pt-2">
                <Button variant="outline" className="w-full">
                  Adicionar Anexo
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Ações */}
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Ações</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <User className="mr-2 h-4 w-4" />
                Alterar Responsável
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="mr-2 h-4 w-4" />
                Atualizar Status
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 