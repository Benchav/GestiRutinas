import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  MoreVertical, 
  Copy, 
  Trash2, 
  GripVertical,
  Image,
  Link
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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

interface RoutineGridProps {
  exercises: ExerciseRow[];
  onUpdateExercise: (id: string, field: keyof ExerciseRow, value: string | number) => void;
  onDeleteExercise: (id: string) => void;
  onDuplicateExercise: (id: string) => void;
}

export const RoutineGrid = ({ 
  exercises, 
  onUpdateExercise, 
  onDeleteExercise, 
  onDuplicateExercise 
}: RoutineGridProps) => {
  const [editingCell, setEditingCell] = useState<{rowId: string, field: string} | null>(null);

  const handleCellClick = (rowId: string, field: string) => {
    setEditingCell({ rowId, field });
  };

  const handleCellChange = (rowId: string, field: keyof ExerciseRow, value: string) => {
    onUpdateExercise(rowId, field, value);
  };

  const handleCellBlur = () => {
    setEditingCell(null);
  };

  const CellInput = ({ 
    exercise, 
    field, 
    type = "text",
    className = ""
  }: { 
    exercise: ExerciseRow; 
    field: keyof ExerciseRow;
    type?: string;
    className?: string;
  }) => {
    const isEditing = editingCell?.rowId === exercise.id && editingCell?.field === field;
    const value = exercise[field] as string;
    
    if (field === 'notas') {
      return (
        <Textarea
          value={value}
          onChange={(e) => handleCellChange(exercise.id, field, e.target.value)}
          onFocus={() => handleCellClick(exercise.id, field)}
          onBlur={handleCellBlur}
          className={`min-h-[2.5rem] resize-none border-none p-1 text-sm bg-transparent hover:bg-muted/50 focus:bg-card focus:border focus:border-primary ${className}`}
          placeholder="Notas del ejercicio..."
        />
      );
    }

    return (
      <Input
        value={value}
        onChange={(e) => handleCellChange(exercise.id, field, e.target.value)}
        onFocus={() => handleCellClick(exercise.id, field)}
        onBlur={handleCellBlur}
        type={type}
        className={`border border-border rounded-none p-2 h-10 text-sm bg-background hover:bg-muted/30 focus:bg-background focus:border-primary focus:border-2 focus:ring-0 ${className} ${
          isEditing ? 'bg-primary/5 border-primary border-2' : ''
        }`}
        placeholder={field === 'ejercicio' ? 'Nombre del ejercicio' : field === 'orden' ? '#' : ''}
      />
    );
  };

  return (
    <div className="overflow-x-auto border border-border rounded-lg bg-card">
      <Table className="border-collapse">
        <TableHeader>
          <TableRow className="bg-muted hover:bg-muted border-b border-border">
            <TableHead className="w-12 p-0 border-r border-border bg-muted/80 text-center font-semibold">
              <div className="p-2">📋</div>
            </TableHead>
            <TableHead className="w-16 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Orden</div>
            </TableHead>
            <TableHead className="min-w-48 p-0 border-r border-border font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Ejercicio</div>
            </TableHead>
            <TableHead className="w-20 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Series</div>
            </TableHead>
            <TableHead className="w-24 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Repeticiones</div>
            </TableHead>
            <TableHead className="w-20 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Peso</div>
            </TableHead>
            <TableHead className="w-24 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Descanso</div>
            </TableHead>
            <TableHead className="min-w-48 p-0 border-r border-border font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Notas</div>
            </TableHead>
            <TableHead className="w-24 p-0 border-r border-border text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">Media</div>
            </TableHead>
            <TableHead className="w-16 p-0 text-center font-semibold text-xs uppercase tracking-wide">
              <div className="p-2">⚙️</div>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {exercises.map((exercise, index) => (
            <TableRow 
              key={exercise.id} 
              className="hover:bg-muted/20 group transition-colors border-b border-border"
            >
              <TableCell className="p-0 border-r border-border bg-muted/50 text-center">
                <div className="p-2">
                  <GripVertical className="w-4 h-4 text-muted-foreground cursor-move mx-auto" />
                </div>
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="orden" 
                  type="number"
                  className="text-center"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="ejercicio"
                  className="font-medium"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="series"
                  className="text-center"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="repeticiones"
                  className="text-center"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="peso"
                  className="text-center"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="descanso"
                  className="text-center"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <CellInput 
                  exercise={exercise} 
                  field="notas"
                />
              </TableCell>
              
              <TableCell className="p-0 border-r border-border">
                <div className="flex items-center justify-center space-x-1 p-2">
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                    <Image className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 hover:bg-primary/10">
                    <Link className="w-3 h-3" />
                  </Button>
                </div>
              </TableCell>
              
              <TableCell className="p-0 text-center">
                <div className="p-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-primary/10"
                      >
                        <MoreVertical className="w-3 h-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => onDuplicateExercise(exercise.id)}>
                        <Copy className="w-4 h-4 mr-2" />
                        Duplicar
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => onDeleteExercise(exercise.id)}
                        className="text-destructive"
                      >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Eliminar
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};