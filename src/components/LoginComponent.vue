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

const userStore = useUserStore();
const router = useRouter();
const loginEmail = ref("");
const loginPassword = ref("");

const handleSubmit = async () => {
  try {
    await userStore.signInWithEmail(loginEmail.value, loginPassword.value);
    if (userStore.user) {
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

button {
  width: 100%;
  padding: 10px;
  background-color: #ba5858;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background-color: #731f1f;
}

button:active {
  background-color: #004085;
}
</style>
