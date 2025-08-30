import { useState } from "react";
import { TrainerDashboard } from "@/components/trainer/TrainerDashboard";
import { RoutineEditor } from "@/components/routine/RoutineEditor";
import { Plus, Users, FileSpreadsheet, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  objetivos: string;
  lastRoutine?: string;
  totalRoutines: number;
}

const Index = () => {
  const [currentView, setCurrentView] = useState<'dashboard' | 'editor'>('dashboard');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  
  // Client state management
  const [clients, setClients] = useState<Client[]>([
    {
      id: "1",
      name: "Carlos Mendez",
      email: "carlos@email.com",
      phone: "+34 600 123 456",
      objetivos: "Pérdida de peso",
      lastRoutine: "2024-01-15",
      totalRoutines: 12
    },
    {
      id: "2", 
      name: "Ana García",
      email: "ana@email.com",
      phone: "+34 600 234 567",
      objetivos: "Ganancia muscular",
      lastRoutine: "2024-01-20",
      totalRoutines: 8
    },
    {
      id: "3",
      name: "Miguel Torres",
      email: "miguel@email.com", 
      phone: "+34 600 345 678",
      objetivos: "Fuerza y resistencia",
      lastRoutine: "2024-01-18",
      totalRoutines: 15
    },
    {
      id: "4",
      name: "Laura Rodríguez",
      email: "laura@email.com",
      phone: "+34 600 456 789", 
      objetivos: "Rehabilitación",
      totalRoutines: 6
    }
  ]);

  const addClient = (newClientData: Omit<Client, 'id' | 'totalRoutines'>) => {
    const newClient: Client = {
      ...newClientData,
      id: Date.now().toString(),
      totalRoutines: 0
    };
    setClients(prev => [...prev, newClient]);
  };

  // Mock data
  const stats = {
    totalClients: clients.length,
    routinesSent: clients.reduce((sum, client) => sum + client.totalRoutines, 0),
    activePrograms: clients.filter(client => client.lastRoutine).length
  };

  if (currentView === 'editor') {
    return (
      <RoutineEditor 
        onBack={() => setCurrentView('dashboard')} 
        selectedClient={selectedClient}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
               GestiRutinas
              </h1>
              <p className="text-muted-foreground">Gestor de rutinas para entrenadores</p>
            </div>
            <Button 
              onClick={() => setCurrentView('editor')}
              className="bg-[var(--gradient-primary)] hover:bg-primary-deep shadow-[var(--shadow-primary)] transition-[var(--transition-smooth)]"
            >
              <Plus className="w-4 h-4 mr-2" />
              Nueva Rutina
            </Button>
          </div>
        </div>
      </header>

      {/* Stats Cards */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-primary)] transition-[var(--transition-smooth)]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary/10 rounded-lg">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Clientes</p>
                  <p className="text-2xl font-bold">{stats.totalClients}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-primary)] transition-[var(--transition-smooth)]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-accent/10 rounded-lg">
                  <Send className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Rutinas Enviadas</p>
                  <p className="text-2xl font-bold">{stats.routinesSent}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-primary)] transition-[var(--transition-smooth)]">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-primary-glow/10 rounded-lg">
                  <FileSpreadsheet className="w-6 h-6 text-primary-glow" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Programas Activos</p>
                  <p className="text-2xl font-bold">{stats.activePrograms}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard */}
        <TrainerDashboard 
          clients={clients}
          onAddClient={addClient}
          onNewRoutine={() => setCurrentView('editor')}
          onEditRoutine={(client) => {
            setSelectedClient(client);
            setCurrentView('editor');
          }}
        />
      </div>
    </div>
  );
};

export default Index;