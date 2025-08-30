import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  objetivos: string;
  lastRoutine?: string;
  totalRoutines: number;
}

interface AddClientDialogProps {
  onAddClient: (client: Omit<Client, 'id' | 'totalRoutines'>) => void;
}

export const AddClientDialog = ({ onAddClient }: AddClientDialogProps) => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    objetivos: ""
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email) {
      toast({
        title: "Error",
        description: "Nombre y email son obligatorios",
        variant: "destructive"
      });
      return;
    }

    onAddClient({
      ...formData,
      lastRoutine: undefined
    });

    toast({
      title: "Cliente añadido",
      description: `${formData.name} ha sido añadido exitosamente`,
    });

    setFormData({
      name: "",
      email: "",
      phone: "",
      objetivos: ""
    });
    setOpen(false);
  };

  const objetivosList = [
    "Pérdida de peso",
    "Ganancia muscular", 
    "Fuerza y resistencia",
    "Rehabilitación",
    "Mantenimiento",
    "Definición muscular",
    "Resistencia cardiovascular"
  ];

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Plus className="w-4 h-4 mr-2" />
          Añadir Cliente
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <span>Nuevo Cliente</span>
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nombre completo *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              placeholder="Ej: Carlos Mendez"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
              placeholder="carlos@email.com"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Teléfono</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
              placeholder="+34 600 123 456"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="objetivos">Objetivos</Label>
            <Select 
              value={formData.objetivos} 
              onValueChange={(value) => setFormData(prev => ({ ...prev, objetivos: value }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar objetivo" />
              </SelectTrigger>
              <SelectContent>
                {objetivosList.map((objetivo) => (
                  <SelectItem key={objetivo} value={objetivo}>
                    {objetivo}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit" className="bg-[var(--gradient-primary)]">
              Añadir Cliente
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}