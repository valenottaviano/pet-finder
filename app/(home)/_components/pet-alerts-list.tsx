"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AlertTriangle, MapPin, Trash2, CheckCircle } from "lucide-react";
import { EditAlertButton } from "./edit-alert-button";
import { useState } from "react";
import { deletePetAlert } from "../_actions/update-pet-alert";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Alert {
  id: string;
  status: string;
  description: string | null;
  latitude: number | null;
  longitude: number | null;
  createdAt: Date;
  updatedAt: Date;
}

interface PetAlertsListProps {
  alerts: Alert[];
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat("es-ES", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(date));
};

const getStatusBadge = (status: string) => {
  if (status === "LOST") {
    return (
      <Badge variant="destructive" className="gap-1">
        <AlertTriangle className="h-3 w-3" />
        Perdido
      </Badge>
    );
  }
  return (
    <Badge variant="default" className="gap-1 bg-green-600">
      <CheckCircle className="h-3 w-3" />
      Encontrado
    </Badge>
  );
};

export const PetAlertsList = ({ alerts }: PetAlertsListProps) => {
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const handleDelete = async (alertId: string) => {
    setDeletingId(alertId);
    try {
      const result = await deletePetAlert(alertId);

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(result.success || "Alerta eliminada exitosamente");
        window.location.reload();
      }
    } catch (error) {
      toast.error("Error al eliminar la alerta");
      console.error("Error:", error);
    } finally {
      setDeletingId(null);
    }
  };

  if (alerts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Alertas</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 text-center py-8">
            No hay alertas creadas para esta mascota.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Alertas ({alerts.length})</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className="border rounded-lg p-4 space-y-3 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between gap-2">
              <div className="space-y-1 flex-1">
                <div className="flex items-center gap-2">
                  {getStatusBadge(alert.status)}
                  <span className="text-xs text-gray-500">
                    {formatDate(alert.createdAt)}
                  </span>
                </div>
                {alert.description && (
                  <p className="text-sm text-gray-700 mt-2">
                    {alert.description}
                  </p>
                )}
                {alert.latitude && alert.longitude && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mt-2">
                    <MapPin className="h-3 w-3" />
                    <span>
                      {alert.latitude.toFixed(6)}, {alert.longitude.toFixed(6)}
                    </span>
                  </div>
                )}
                {alert.updatedAt.getTime() !== alert.createdAt.getTime() && (
                  <p className="text-xs text-gray-400 mt-1">
                    Actualizado: {formatDate(alert.updatedAt)}
                  </p>
                )}
              </div>
              <div className="flex gap-2">
                <EditAlertButton alert={alert} />
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={deletingId === alert.id}
                    >
                      <Trash2 className="h-4 w-4 text-red-600" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>¿Estás seguro?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Esta acción no se puede deshacer. Esta alerta será
                        eliminada permanentemente.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancelar</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => handleDelete(alert.id)}
                        className="bg-red-600 hover:bg-red-700"
                      >
                        Eliminar
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};
