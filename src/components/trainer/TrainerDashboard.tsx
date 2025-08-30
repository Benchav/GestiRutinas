import { useState } from "react";
import { AddClientDialog } from "@/components/client/AddClientDialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Plus, 
  Mail, 
  Phone, 
  FileSpreadsheet, 
  Calendar,
  MoreVertical,
  Eye,
  Users
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  objetivos: string;
  lastRoutine?: string;
  totalRoutines: number;
}

interface TrainerDashboardProps {
  onNewRoutine: () => void;
  onEditRoutine: (client: Client) => void;
  clients: Client[];
  onAddClient: (client: Omit<Client, 'id' | 'totalRoutines'>) => void;
}

export const TrainerDashboard = ({ onNewRoutine, onEditRoutine, clients, onAddClient }: TrainerDashboardProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Clients Section */}
      <Card className="shadow-[var(--shadow-soft)]">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center space-x-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <span>Mis Clientes</span>
            </CardTitle>
            <AddClientDialog onAddClient={onAddClient} />
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Buscar clientes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredClients.map((client) => (
              <Card key={client.id} className="hover:shadow-[var(--shadow-primary)] transition-[var(--transition-smooth)]">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-base">{client.name}</h3>
                      <Badge variant="secondary" className="text-xs mt-1">
                        {client.objetivos}
                      </Badge>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => onEditRoutine(client)}>
                          <FileSpreadsheet className="w-4 h-4 mr-2" />
                          Nueva Rutina
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" />
                          Ver Historial
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  
                  <div className="space-y-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3 h-3" />
                      <span className="truncate">{client.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3 h-3" />
                      <span>{client.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <FileSpreadsheet className="w-3 h-3" />
                      <span>{client.totalRoutines} rutinas enviadas</span>
                    </div>
                    {client.lastRoutine && (
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-3 h-3" />
                        <span>Última: {client.lastRoutine}</span>
                      </div>
                    )}
                  </div>
                  
                  <Button 
                    className="w-full mt-4 bg-[var(--gradient-primary)] hover:bg-primary-deep"
                    onClick={() => onEditRoutine(client)}
                    size="sm"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Crear Rutina
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};