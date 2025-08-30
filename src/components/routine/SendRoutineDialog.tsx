import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Send, 
  User, 
  Mail, 
  FileSpreadsheet, 
  Clock,
  Shield,
  Check
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SendRoutineDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  routineTitle: string;
  selectedClient?: any;
  exerciseCount: number;
}

export const SendRoutineDialog = ({ 
  open, 
  onOpenChange, 
  routineTitle, 
  selectedClient,
  exerciseCount 
}: SendRoutineDialogProps) => {
  const [emailMessage, setEmailMessage] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("xlsx");
  const [deleteAfterSend, setDeleteAfterSend] = useState(true);
  const [includeInstructions, setIncludeInstructions] = useState(true);
  const [sending, setSending] = useState(false);
  const { toast } = useToast();

  // Mock clients for demo
  const allClients = [
    { id: "1", name: "Carlos Mendez", email: "carlos@email.com" },
    { id: "2", name: "Ana García", email: "ana@email.com" },
    { id: "3", name: "Miguel Torres", email: "miguel@email.com" },
    { id: "4", name: "Laura Rodríguez", email: "laura@email.com" }
  ];

  const [recipients, setRecipients] = useState<string[]>(
    selectedClient ? [selectedClient.id] : []
  );

  const handleSend = async () => {
    setSending(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Rutina enviada",
      description: `La rutina "${routineTitle}" ha sido enviada exitosamente.`,
    });
    
    setSending(false);
    onOpenChange(false);
  };

  const toggleRecipient = (clientId: string) => {
    setRecipients(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const selectedClients = allClients.filter(client => recipients.includes(client.id));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Send className="w-5 h-5" />
            <span>Enviar Rutina</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Routine Info */}
          <Card className="bg-muted/30">
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-lg">{routineTitle}</h3>
                  <div className="flex items-center space-x-4 mt-2 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <FileSpreadsheet className="w-4 h-4" />
                      <span>{exerciseCount} ejercicios</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Creada hoy</span>
                    </div>
                  </div>
                </div>
                <Badge variant="secondary">{selectedFormat.toUpperCase()}</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Recipients */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Destinatarios</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {allClients.map((client) => (
                <Card 
                  key={client.id} 
                  className={`cursor-pointer transition-colors ${
                    recipients.includes(client.id) ? 'ring-2 ring-primary bg-primary/5' : 'hover:bg-muted/50'
                  }`}
                  onClick={() => toggleRecipient(client.id)}
                >
                  <CardContent className="p-3">
                    <div className="flex items-center space-x-3">
                      <Checkbox 
                        checked={recipients.includes(client.id)}
                        onCheckedChange={() => toggleRecipient(client.id)}
                      />
                      <div className="flex-1">
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground flex items-center space-x-1">
                          <Mail className="w-3 h-3" />
                          <span>{client.email}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Message */}
          <div className="space-y-3">
            <Label htmlFor="message" className="text-base font-semibold">
              Mensaje del email
            </Label>
            <Textarea
              id="message"
              placeholder="Hola! Te envío tu nueva rutina de entrenamiento..."
              value={emailMessage}
              onChange={(e) => setEmailMessage(e.target.value)}
              className="min-h-24"
            />
          </div>

          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Formato de envío</Label>
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Privacy Options */}
          <div className="space-y-4">
            <Label className="text-base font-semibold flex items-center space-x-2">
              <Shield className="w-4 h-4" />
              <span>Opciones de privacidad</span>
            </Label>
            
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="delete-after-send"
                  checked={deleteAfterSend}
                  onCheckedChange={(checked) => setDeleteAfterSend(checked === true)}
                />
                <div className="space-y-1">
                  <Label htmlFor="delete-after-send" className="text-sm font-medium cursor-pointer">
                    No mantener copia en mi cuenta
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    El archivo se eliminará de mi espacio después del envío por privacidad
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <Checkbox 
                  id="include-instructions"
                  checked={includeInstructions}
                  onCheckedChange={(checked) => setIncludeInstructions(checked === true)}
                />
                <div className="space-y-1">
                  <Label htmlFor="include-instructions" className="text-sm font-medium cursor-pointer">
                    Incluir instrucciones de ejercicios
                  </Label>
                  <p className="text-xs text-muted-foreground">
                    Añadir página con descripciones e imágenes de referencia
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Selected Recipients Summary */}
          {selectedClients.length > 0 && (
            <Card className="bg-accent-light/20 border-accent/20">
              <CardContent className="p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Check className="w-4 h-4 text-accent" />
                  <span className="font-medium text-sm">
                    Enviar a {selectedClients.length} cliente{selectedClients.length > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedClients.map((client) => (
                    <Badge key={client.id} variant="secondary" className="text-xs">
                      {client.name}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Actions */}
          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button 
              onClick={handleSend}
              disabled={recipients.length === 0 || sending}
              className="bg-[var(--gradient-accent)] hover:bg-accent"
            >
              {sending ? (
                <>
                  <div className="w-4 h-4 mr-2 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  Enviar Rutina
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};