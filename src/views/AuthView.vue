<template>
  <div class="container">
    <h2>Registro</h2>
    <input v-model="email" type="email" placeholder="Correo electrónico" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <input
      v-model="confirmPassword"
      type="password"
      placeholder="Confirmar contraseña"
    />
    <button @click="userStore.signUp(email, password)">Registrarse</button>

    <h2>Iniciar sesión</h2>
    <input v-model="loginEmail" type="email" placeholder="Correo electrónico" />
    <input v-model="loginPassword" type="password" placeholder="Contraseña" />
    <button @click="checkUser(loginEmail, loginPassword)">
      Iniciar sesión
    </button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const loginEmail = ref("");
const loginPassword = ref("");

async function checkUser(email, pass) {
  await userStore.signInWithEmail(email, pass);
  if (userStore.user._value.id) router.push({ path: "/" });
}
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
