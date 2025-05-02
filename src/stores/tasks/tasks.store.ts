import { create, StateCreator } from "zustand";
import { Task, TaskStatus } from "../../interfaces";
import { v4 as uuidv4 } from "uuid";

import { devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

interface TasksState {
  draggingTasksId?: string;
  tasks: Record<string, Task>;
  getTaskStatus: (status: TaskStatus) => Task[];
  setDraggingTasksId: (taskID: string) => void;
  addNewTask: (title: string, status: TaskStatus) => void;
  removeDraggingTaskId: () => void;
  onTaskDrop: (status: TaskStatus) => void;
  changeProgressStatus: (taskID: string, status: TaskStatus) => void;
}

const storeApi: StateCreator<TasksState, [["zustand/immer", never]]> = (
  set,
  get
) => ({
  tasks: {
    "id-1": { id: "id-1", title: "Task 1", status: "open" },
    "id-2": { id: "id-2", title: "Task 2", status: "in-progress" },
    "id-3": { id: "id-3", title: "Task 3", status: "open" },
    "id-4": { id: "id-4", title: "Task 4", status: "open" },
  },

  getTaskStatus: (status: TaskStatus) => {
    const tasks = get().tasks;
    return Object.values(tasks).filter((task) => task.status === status);
  },
  addNewTask: (title: string, status: TaskStatus) => {
    const newTask = { id: uuidv4(), title, status };

    set((state) => {
      state.tasks[newTask.id] = newTask;
    });
  },
  setDraggingTasksId: (taskID: string) => {
    set({ draggingTasksId: taskID });
  },
  removeDraggingTaskId: () => {
    set({ draggingTasksId: undefined });
  },

  changeProgressStatus: (taskID: string, status: TaskStatus) => {
    const task = get().tasks[taskID];
    const updateTaks = { ...task, status };

    set((state) => {
      state.tasks[task.id] = updateTaks;
    });
  },
  onTaskDrop: (status: TaskStatus) => {
    const taskID = get().draggingTasksId;
    if (!taskID) return;
    get().changeProgressStatus(taskID, status);
    get().removeDraggingTaskId();
  },
});

export const useTaskStore = create<TasksState>()(
  devtools(
    persist(immer(storeApi), {
      name: "task-store",
    })
  )
);
