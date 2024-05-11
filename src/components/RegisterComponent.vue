<template>
  <div class="container">
    <h2>Registro</h2>
    <form @submit.prevent="handleSubmit">
      <input
        v-model="email"
        type="email"
        placeholder="Correo electrónico"
        required
      />
      <input
        v-model="password"
        type="password"
        placeholder="Contraseña"
        required
      />
      <input
        v-model="confirmPassword"
        type="password"
        placeholder="Confirmar contraseña"
        required
      />
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user.js";

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const handleSubmit = async () => {
  if (password.value !== confirmPassword.value) {
    alert("Las contraseñas no coinciden.");
    return;
  }
  try {
    await userStore.signUp(email.value, password.value);
    // Redirigir o mostrar un mensaje de éxito
  } catch (error) {
    console.error("Error al registrarse:", error.message);
    alert("Error al registrarse. Por favor, verifica los datos ingresados.");
  }
};
</script>

<style scoped>
.container {
  background-color: #f1c9c9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-top: 5rem;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}
</style>
