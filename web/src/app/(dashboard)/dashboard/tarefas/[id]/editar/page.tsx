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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Save } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

export const metadata: Metadata = {
  title: "Editar Tarefa - Easy Board",
  description: "Editar detalhes de uma tarefa no Easy Board",
};

export default function EditarTarefaPage({ params }: { params: { id: string } }) {
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

  // Obter dados para os selects
  const membrosEquipe = [
    { id: "1", nome: "Ana Silva" },
    { id: "2", nome: "Carlos Oliveira" },
    { id: "3", nome: "Juliana Mendes" },
    { id: "4", nome: "Rafael Costa" },
  ];

  const sprints = [
    { id: "1", nome: "Sprint 1" },
    { id: "2", nome: "Sprint 2" },
    { id: "3", nome: "Sprint 3" },
  ];

  // Se a tarefa não for encontrada
  if (!tarefa) {
    notFound();
  }

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center mb-6">
        <Link href={`/dashboard/tarefas/${tarefaId}`}>
          <Button variant="outline" size="sm" className="mr-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Button>
        </Link>
        <h2 className="text-3xl font-bold tracking-tight">Editar Tarefa</h2>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Detalhes da Tarefa</CardTitle>
          <CardDescription>Atualize as informações da tarefa conforme necessário.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="titulo">Título</Label>
              <Input 
                id="titulo" 
                defaultValue={tarefa.titulo} 
                placeholder="Digite o título da tarefa" 
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="descricao">Descrição</Label>
              <Textarea 
                id="descricao" 
                defaultValue={tarefa.descricao}
                placeholder="Descreva a tarefa detalhadamente" 
                className="min-h-32" 
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={tarefa.status}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todo">A Fazer</SelectItem>
                  <SelectItem value="in-progress">Em Progresso</SelectItem>
                  <SelectItem value="review">Em Revisão</SelectItem>
                  <SelectItem value="done">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="prioridade">Prioridade</Label>
              <Select defaultValue={tarefa.prioridade}>
                <SelectTrigger>
                  <SelectValue placeholder="Selecione a prioridade" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Baixa</SelectItem>
                  <SelectItem value="medium">Média</SelectItem>
                  <SelectItem value="high">Alta</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="sprint">Sprint</Label>
              <Select defaultValue="Sprint 1">
                <SelectTrigger>
                  <SelectValue placeholder="Selecione o sprint" />
                </SelectTrigger>
                <SelectContent>
                  {sprints.map(sprint => (
                    <SelectItem key={sprint.id} value={sprint.nome}>
                      {sprint.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="responsavel">Responsável</Label>
              <Select defaultValue={tarefa.responsavel?.id || "unassigned"}>
                <SelectTrigger>
                  <SelectValue placeholder="Atribuir a alguém" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="unassigned">Não atribuído</SelectItem>
                  {membrosEquipe.map(membro => (
                    <SelectItem key={membro.id} value={membro.id}>
                      {membro.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Data de Início</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tarefa.dataInicio && "text-muted-foreground"
                    )}
                  >
                    {tarefa.dataInicio ? (
                      format(new Date(tarefa.dataInicio), "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={tarefa.dataInicio ? new Date(tarefa.dataInicio) : undefined}
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label>Previsão de Conclusão</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !tarefa.dataPrevista && "text-muted-foreground"
                    )}
                  >
                    {tarefa.dataPrevista ? (
                      format(new Date(tarefa.dataPrevista), "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    locale={ptBR}
                    selected={tarefa.dataPrevista ? new Date(tarefa.dataPrevista) : undefined}
                  />
                </PopoverContent>
              </Popover>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Subtarefas</h3>
              <Button variant="outline" size="sm">
                Adicionar Subtarefa
              </Button>
            </div>
            
            <div className="space-y-2">
              {tarefa.subtarefas.map((subtarefa, index) => (
                <div key={subtarefa.id} className="flex items-center gap-2">
                  <Checkbox 
                    id={`subtarefa-${subtarefa.id}`} 
                    defaultChecked={subtarefa.concluida} 
                  />
                  <div className="flex-1 grid grid-cols-1 md:grid-cols-10 gap-2 items-center">
                    <div className="md:col-span-9">
                      <Input 
                        defaultValue={subtarefa.titulo} 
                        className="w-full"
                      />
                    </div>
                    <div className="md:col-span-1 flex justify-end">
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <span className="sr-only">Remover</span>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="h-4 w-4"
                        >
                          <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href={`/dashboard/tarefas/${tarefaId}`}>Cancelar</Link>
          </Button>
          <Button>
            <Save className="mr-2 h-4 w-4" />
            Salvar Alterações
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
} 