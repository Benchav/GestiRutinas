import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { 
  ArrowLeft, 
  Save, 
  Send, 
  Plus, 
  Trash2, 
  Copy,
  Download,
  User,
  FileSpreadsheet,
  FileText
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RoutineGrid } from "./RoutineGrid";
import { SendRoutineDialog } from "./SendRoutineDialog";
import { exportToCSV, exportToExcel } from "@/utils/exportUtils";
import { useToast } from "@/hooks/use-toast";

interface RoutineEditorProps {
  onBack: () => void;
  selectedClient?: any;
}

interface ExerciseRow {
  id: string;
  orden: number;
  ejercicio: string;
  series: string;
  repeticiones: string;
  peso: string;
  descanso: string;
  notas: string;
  media?: string;
}

export const RoutineEditor = ({ onBack, selectedClient }: RoutineEditorProps) => {
  const [routineTitle, setRoutineTitle] = useState("Nueva Rutina");
  const [routineDescription, setRoutineDescription] = useState("");
  const [showSendDialog, setShowSendDialog] = useState(false);
  const { toast } = useToast();
  
  const [exercises, setExercises] = useState<ExerciseRow[]>([
    {
      id: "1",
      orden: 1,
      ejercicio: "Press banca",
      series: "4",
      repeticiones: "8-10",
      peso: "80kg",
      descanso: "90s",
      notas: "Control de la bajada",
      media: ""
    },
    {
      id: "2", 
      orden: 2,
      ejercicio: "Sentadillas",
      series: "3",
      repeticiones: "12-15",
      peso: "100kg",
      descanso: "2min",
      notas: "Profundidad completa",
      media: ""
    },
    {
      id: "3",
      orden: 3,
      ejercicio: "Peso muerto",
      series: "3",
      repeticiones: "6-8",
      peso: "120kg",
      descanso: "3min",
      notas: "Activar core",
      media: ""
    }
  ]);

  const addExercise = () => {
    const newExercise: ExerciseRow = {
      id: Date.now().toString(),
      orden: exercises.length + 1,
      ejercicio: "",
      series: "",
      repeticiones: "",
      peso: "",
      descanso: "",
      notas: "",
      media: ""
    };
    setExercises([...exercises, newExercise]);
  };

  const deleteExercise = (id: string) => {
    setExercises(exercises.filter(ex => ex.id !== id));
  };

  const updateExercise = (id: string, field: keyof ExerciseRow, value: string | number) => {
    setExercises(exercises.map(ex => 
      ex.id === id ? { ...ex, [field]: value } : ex
    ));
  };

  const duplicateExercise = (id: string) => {
    const exercise = exercises.find(ex => ex.id === id);
    if (exercise) {
      const newExercise = {
        ...exercise,
        id: Date.now().toString(),
        orden: exercises.length + 1
      };
      setExercises([...exercises, newExercise]);
    }
  };

  const handleSaveTemplate = () => {
    toast({
      title: "Plantilla guardada",
      description: `La plantilla "${routineTitle}" ha sido guardada exitosamente`,
    });
  };

  const handleExportCSV = () => {
    exportToCSV(exercises, routineTitle);
    toast({
      title: "Exportado a CSV",
      description: "La rutina se ha descargado como archivo CSV",
    });
  };

  const handleExportExcel = () => {
    exportToExcel(exercises, routineTitle);
    toast({
      title: "Exportado a Excel",
      description: "La rutina se ha descargado como archivo Excel",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver
              </Button>
              <div>
                <Input
                  value={routineTitle}
                  onChange={(e) => setRoutineTitle(e.target.value)}
                  className="text-xl font-bold border-none p-0 h-auto bg-transparent"
                />
                {selectedClient && (
                  <div className="flex items-center space-x-2 mt-1">
                    <User className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{selectedClient.name}</span>
                    <Badge variant="secondary" className="text-xs">
                      {selectedClient.objetivos}
                    </Badge>
                  </div>
                )}
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" size="sm" onClick={handleSaveTemplate}>
                <Save className="w-4 h-4 mr-2" />
                Guardar Plantilla
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4 mr-2" />
                    Exportar
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportCSV}>
                    <FileText className="w-4 h-4 mr-2" />
                    Exportar CSV
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportExcel}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Exportar Excel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Button 
                className="bg-[var(--gradient-accent)] hover:bg-accent text-accent-foreground"
                onClick={() => setShowSendDialog(true)}
              >
                <Send className="w-4 h-4 mr-2" />
                Enviar Rutina
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        {/* Routine Info */}
        <Card className="mb-6 shadow-[var(--shadow-soft)]">
          <CardHeader>
            <CardTitle>Información de la Rutina</CardTitle>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Descripción de la rutina, instrucciones generales..."
              value={routineDescription}
              onChange={(e) => setRoutineDescription(e.target.value)}
              className="min-h-20"
            />
          </CardContent>
        </Card>

        {/* Exercise Grid */}
        <Card className="shadow-[var(--shadow-soft)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Ejercicios</CardTitle>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" onClick={addExercise}>
                  <Plus className="w-4 h-4 mr-2" />
                  Añadir Ejercicio
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <RoutineGrid
              exercises={exercises}
              onUpdateExercise={updateExercise}
              onDeleteExercise={deleteExercise}
              onDuplicateExercise={duplicateExercise}
            />
          </CardContent>
        </Card>
      </div>

      {/* Send Dialog */}
      <SendRoutineDialog
        open={showSendDialog}
        onOpenChange={setShowSendDialog}
        routineTitle={routineTitle}
        selectedClient={selectedClient}
        exerciseCount={exercises.length}
      />
    </div>
  );
};