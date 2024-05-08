import { defineStore } from 'pinia';
import { supabase } from '../supabase';

export const useUserStore = defineStore({
  id: 'user', // Un identificador único para el store
  state: () => ({
    user: null, // Inicializamos el estado del usuario como null
  }),
  actions: {
    async fetchUser() {
      const currentUser = await supabase.auth.getUser();
      this.user = currentUser;
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
  },
});


