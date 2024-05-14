import { defineStore } from "pinia";
import { supabase } from "../supabase";
import { useUserStore } from "./user";

export const useTaskStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
    errorMessage: null,
  }),
  actions: {
    async fetchTasks() {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .eq("user_id", useUserStore().user.id)
          .order("id", { ascending: false });

        if (error) {
          this.errorMessage = "Error al cargar las tareas.";
          throw error;
        }
        this.tasks = data;
        this.errorMessage = null;
      } catch (error) {
        console.error("Error fetching tasks:", error);
        this.errorMessage =
          "Error al cargar las tareas. Por favor, inténtalo de nuevo más tarde.";
      }
    },
    async addTask(newTaskTitle, description, user_id) {
      try {
        const { data, error } = await supabase.from("tasks").insert({
          user_id: user_id,
          title: newTaskTitle,
          is_complete: false,
          description: description,
        });

        if (error) throw error;
        if (data) this.tasks = [...this.tasks, ...data];
        this.errorMessage = null;
        this.fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
        this.errorMessage =
          "Error al agregar la tarea. Por favor, inténtalo de nuevo más tarde.";
      }
    },
    async editTask(taskId, newTitle, newDescription) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({
            title: newTitle,
            description: newDescription,
          })
          .match({ id: taskId });

        if (error) throw error;
        this.errorMessage = null;
        this.fetchTasks();
      } catch (error) {
        console.error("Error editing task:", error);
        this.errorMessage =
          "Error al editar la tarea. Por favor, inténtalo de nuevo más tarde.";
      }
    },
    async deleteTask(taskId) {
      try {
        const { error } = await supabase
          .from("tasks")
          .delete()
          .match({ id: taskId });

        if (error) throw error;
        this.tasks = this.tasks.filter((task) => task.id !== taskId);
        this.errorMessage = null;
        this.fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
        this.errorMessage =
          "Error al eliminar la tarea. Por favor, inténtalo de nuevo más tarde.";
      }
    },
    async markTaskAsComplete(taskId) {
      try {
        const { error } = await supabase
          .from("tasks")
          .update({ is_complete: true })
          .match({ id: taskId });

        if (error) throw error;

        const taskIndex = this.tasks.findIndex((task) => task.id === taskId);
        if (taskIndex !== -1) {
          this.tasks[taskIndex].is_complete = true;
        }

        this.errorMessage = null;
        this.fetchTasks();
      } catch (error) {
        console.error("Error marking task as complete:", error);
        this.errorMessage =
          "Error al marcar la tarea como completa. Por favor, inténtalo de nuevo más tarde.";
      }
    },
  },
});
