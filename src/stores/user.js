import { ref, onMounted } from 'vue';
import { supabase } from '../supabase';

export function useUserStore() {
 const user = ref(null);

 const fetchUser = async () => {
    const currentUser = await supabase.auth.getUser();
    user.value = currentUser;
 };

 const signUp = async (email, password) => {
    const { user, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw error;
    if (user) user.value = user;
 };

 const signInWithEmail = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw error;
   if (data) user.value = data.user;
 };

 const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    user.value = null;
 };

 onMounted(fetchUser);

 return {
    user,
    fetchUser,
    signUp,
    signInWithEmail,
    signOut,
 };
}

