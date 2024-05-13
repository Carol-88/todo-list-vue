import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore({
  id: "tasks",
  state: () => ({
    tasks: [],
  }),
  actions: {
    async fetchTasks() {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .select("*")
          .order("id", { ascending: false });

        if (error) throw error;
        this.tasks = data;
      } catch (error) {
        console.error("Error fetching tasks:", error);
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
        console.log(data);
        if (data) this.tasks = [...this.tasks, ...data];

        this.fetchTasks();
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },

    async editTask(taskId, newTitle, newDescription) {
      try {
        const { data, error } = await supabase
          .from("tasks")
          .update({
            title: newTitle,
            description: newDescription,
          })
          .match({ id: taskId });
      } catch (error) {
        console.error("Error editing task:", error);
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

        this.fetchTasks();
      } catch (error) {
        console.error("Error deleting task:", error);
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

        this.fetchTasks();
      } catch (error) {
        console.error("Error marking task as complete:", error);
      }
    },
  },
});
