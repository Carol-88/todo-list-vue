<template>
  <div class="container">
    <h2>Registro</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Correo electrónico</label>
        <input
          v-model="email"
          type="email"
          id="email"
          placeholder="Correo electrónico"
        />
        <span v-if="emailError" class="error-message">{{ emailError }}</span>
      </div>
      <div class="form-group">
        <label for="password">Contraseña</label>
        <input
          v-model="password"
          type="password"
          id="password"
          placeholder="Contraseña"
        />
        <span v-if="passwordError" class="error-message">{{
          passwordError
        }}</span>
      </div>
      <div class="form-group">
        <label for="confirmPassword">Confirmar contraseña</label>
        <input
          v-model="confirmPassword"
          type="password"
          id="confirmPassword"
          placeholder="Confirmar contraseña"
        />
        <span v-if="confirmPasswordError" class="error-message">{{
          confirmPasswordError
        }}</span>
      </div>
      <button type="submit">Registrarse</button>
    </form>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useUserStore } from "../stores/user.js";

const userStore = useUserStore();
const email = ref("");
const password = ref("");
const confirmPassword = ref("");

const emailError = computed(() => {
  if (!email.value) return "El correo electrónico es requerido.";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.value))
    return "El correo electrónico no es válido.";
  return null;
});

const passwordError = computed(() => {
  if (!password.value) return "La contraseña es requerida.";
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password.value))
    return "La contraseña debe contener al menos una letra mayúscula, una letra minúscula, un número y tener al menos 8 caracteres.";
  return null;
});

const confirmPasswordError = computed(() => {
  if (!confirmPassword.value)
    return "La confirmación de contraseña es requerida.";
  if (password.value !== confirmPassword.value)
    return "Las contraseñas no coinciden.";
  return null;
});

const handleSubmit = async () => {
  console.log("Probando");
  try {
    await userStore.signUp(email.value, password.value);
  } catch (error) {
    alert.error("Error al registrarse:", error.message);
  }
};
</script>

<style scoped>
.container {
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-top: 5rem;
}

h2 {
  text-align: center;
  color: darkred;
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

.is-invalid {
  border-color: red;
}

.error-message {
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
}
</style>
