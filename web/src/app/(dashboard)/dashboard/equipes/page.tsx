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
import { PlusCircle, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Equipes - Easy Board",
  description: "Gerenciamento de equipes no Easy Board",
};

export default function EquipesPage() {
  // Dados simulados de equipes
  const equipes = [
    {
      id: "1",
      nome: "Equipe de Desenvolvimento",
      descricao: "Equipe responsável pelo desenvolvimento de novos recursos",
      membros: 5,
    },
    {
      id: "2",
      nome: "Equipe de Design",
      descricao: "Equipe responsável pela experiência do usuário e design de interface",
      membros: 3,
    },
    {
      id: "3",
      nome: "Equipe de QA",
      descricao: "Equipe responsável pelos testes e garantia de qualidade",
      membros: 2,
    },
  ];

  return (
    <div className="flex-1 space-y-4 p-4 pt-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight">Equipes</h2>
        <Link href="/dashboard/equipes/nova">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Nova Equipe
          </Button>
        </Link>
      </div>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {equipes.map((equipe) => (
          <Card key={equipe.id} className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle>{equipe.nome}</CardTitle>
              <CardDescription>{equipe.descricao}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-muted-foreground">
                <Users className="mr-1 h-4 w-4" />
                <span>{equipe.membros} {equipe.membros === 1 ? 'membro' : 'membros'}</span>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link href={`/dashboard/equipes/${equipe.id}`}>
                <Button variant="outline" size="sm">
                  Ver Detalhes
                </Button>
              </Link>
              <Link href={`/dashboard/equipes/${equipe.id}/sprints`}>
                <Button size="sm">
                  Sprints
                </Button>
              </Link>
            </CardFooter>
          </Card>
        ))}

        <Card className="flex h-[180px] flex-col items-center justify-center">
          <CardContent className="flex flex-col items-center justify-center p-6">
            <Link href="/dashboard/equipes/nova">
              <Button variant="outline" size="lg" className="h-20 w-20 rounded-full">
                <PlusCircle className="h-8 w-8" />
              </Button>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Criar Nova Equipe
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 