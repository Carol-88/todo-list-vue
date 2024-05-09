import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useTaskStore = defineStore({
  id: 'tasks',
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
    this.tasks = data; // Asegúrate de que esto actualiza el estado correctamente
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
    },
    async addTask(newTaskTitle, description, user_id) {
      try {
        console.log(newTaskTitle);
        console.log(description);
        console.log(user_id);
        const { data, error } = await supabase
         .from("tasks")
         .insert({
            user_id: user_id,
            title: newTaskTitle,
            is_complete: false,
            description: description
          });
        
        if (error) throw error;
        if (data) this.tasks = data;
     
        this.fetchTasks(); 
      } catch (error) {
        console.error("Error adding task:", error);
      }
    },
  },
});

