import { DragEvent, useState } from "react";
import Swal from "sweetalert2";

import { useTaskStore } from "../stores";
import { TaskStatus } from "../interfaces";

interface Options {
  status: TaskStatus;
}

export const useTasks = ({ status }: Options) => {
    
  const isDragginTaskId = useTaskStore((state) => !!state.draggingTasksId);
  const onTaskDrop = useTaskStore((state) => state.onTaskDrop);
  const addNewTask = useTaskStore((state) => state.addNewTask);
  const [onDragOver, setOnDragOver] = useState(false);

  const handleAddTask = async () => {
    const { isConfirmed, value } = await Swal.fire({
      title: "Nueva Tarea",
      input: "text",
      inputLabel: "Nombre de la tarea",
      inputPlaceholder: "Ingrese el nombre de la tarea",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) {
          return "Debe de ingresar un nombre para la tarea.";
        }
      },
    });

    if (!isConfirmed) return;
    addNewTask(value, status);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOnDragOver(false);
    onTaskDrop(status);
  };

  return {
    handleAddTask,
    handleDragLeave,
    handleDragOver,
    handleDrop,
    onDragOver,
    isDragginTaskId,
  };
};
