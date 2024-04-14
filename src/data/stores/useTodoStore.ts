import { create, useStore } from "zustand";
import { generatedId } from "../../data/helpers";

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface TodoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title: string) => void;
    removeTask: (id: string) => void;
    clearTasks: () => void;
}

export const useTodoStore = create<TodoStore>((set, get) => ({
    tasks: [
        {
            id: "asd3ff45tfg4tg4343",
            title: "Моя дефолтная таска",
            createdAt: 2313123
        }
    ],
    createTask: (title) => {
        const { tasks } = get();
        const newTask = {
            id: generatedId(),
            title,
            createdAt: Date.now(),
        }

        set({
            tasks: [newTask].concat(tasks),
        })
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title,
            }))
        });
    },
    removeTask: (id: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        });
    },

    clearTasks: () => {
        // const { tasks } = get();
        set({
            tasks: []
        });
    }
}));


