import { defineStore } from "pinia";
import { supabase } from "../supabase";

export const useUserStore = defineStore({
  id: "user",
  state: () => ({
    user: null,
  }),
  actions: {
    async fetchUser() {
      const { data, error } = await supabase.auth.getUser();
      if (error) {
        console.error("Error al obtener el usuario:", error.message);
        throw error;
      }
      if (data && data.user) {
        this.user = data.user;
      } else {
        console.error("No se pudo obtener el usuario.");
        this.user = null;
      }
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
        throw error;
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      this.user = null;
    },

    async updateProfile(full_name, avatar_url, username) {
      const { data, error } = await supabase
        .from("profiles")
        .update({ full_name, avatar_url, username })
        .match({ id: this.user?.id });
      if (error) throw error;
      if (data && data.length > 0) {
        this.user = data[0];
      } else {
        console.error("No se encontraron datos del perfil.");
        this.user = null;
      }
    },
    async fetchProfile() {
      if (!this.user) {
        console.error("this.user no está definido.");
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .match({ id: this.user.id });

      if (error) {
        console.error("Error al obtener el perfil:", error.message);
        throw error;
      }

      if (data && data.length > 0) {
        this.user = data[0];
      } else {
        console.error("No se encontraron datos del perfil.");
        this.user = null;
      }
    },
    async deleteUser() {
      const { error } = await supabase
        .from("users")
        .delete()
        .match({ id: this.user?.id });
      if (error) throw error;
      this.user = null;
    },
  },
});
