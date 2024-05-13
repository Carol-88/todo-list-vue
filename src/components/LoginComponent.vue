<template>
  <div class="container">
    <h2>Iniciar sesión</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="loginEmail"
        type="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        v-model="loginPassword"
        type="password"
        placeholder="Contraseña"
        required
      />
      <button type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";
import { useTaskStore } from "../stores/task.js";

const userStore = useUserStore();
const taskStore = useTaskStore();
const router = useRouter();
const loginEmail = ref("");
const loginPassword = ref("");

const handleSubmit = async () => {
  try {
    await userStore.signInWithEmail(loginEmail.value, loginPassword.value);
    if (userStore.user) {
      await userStore.fetchProfile();
      await taskStore.fetchTasks();
      router.push({ path: "/" });
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error.message);
    alert(
      "Error al iniciar sesión. Por favor, verifica el correo electrónico y la contraseña."
    );
  }
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}
</style>
