import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore("tasks", {
  state: () => ({
    tasks: null,
  }),
  actions: {
    async fetchTasks() {
      const { data: tasks } = await supabase
       .from("tasks")
       .select("*")
       .order("id", { ascending: false });
      this.tasks = tasks;
    },
    async addTask(newTaskTitle) {
      const { data, error } = await supabase
      .from("tasks")
      .insert([{ task: newTaskTitle }]);
      if (error) {
        console.error("Error al agregar la tarea:", error);
        return;
      }
      // Actualizar el estado de las tareas en el store
      this.fetchTasks(); // Esto actualizará el estado de tasks con las nuevas tareas
    },
  },
});
