import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore({
  id: "user", // Un identificador único para el store
  state: () => ({
    user: null, // Inicializamos el estado del usuario como null
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      this.user = data.user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email: email,
        password: password,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signInWithEmail(email, password) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        if (data) this.user = data.user;
      } catch (error) {
        console.error("Error al iniciar sesión:", error.message);
        // Aquí puedes lanzar el error o manejarlo de otra manera, por ejemplo, mostrando un mensaje al usuario
        throw error;
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },
    async updateUser(full_name, avatar_url) {
      const { data, error } = await supabase
        .from("users")
        .update({ full_name, avatar_url, updated_at: new Date() })
        .match({ id: this.user.id });

      if (error) throw error;
      if (data) this.user = data[0];
    },

    async deleteUser() {
      const { data, error } = await supabase
        .from("users")
        .delete()
        .match({ id: this.user.id });

      if (error) throw error;
      this.user = null;
    },
  },
});
