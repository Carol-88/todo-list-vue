<template>
  <div>
    <h2>Indica tu nombre completo</h2>
    <input v-model="newFullName" placeholder="Nombre completo" />
    <h2>Sube tu avatar</h2>
    <input type="text" @change="handleAvatarUpload" />
    <button @click="updateUser">Actualizar</button>

    <!-- Tarjeta para mostrar los datos actualizados -->
    <div class="user-card" v-if="user">
      <img :src="user.avatar_url" alt="Avatar" />
      <h3>{{ user.full_name }}</h3>
      <p>Última actualización: {{ user.updated_at }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const newFullName = ref("");
const newAvatarUrl = ref("");

const updateUser = async () => {
  try {
    await userStore.updateUser(newFullName.value, newAvatarUrl.value);
    // Actualiza el estado del usuario en el store
    userStore.fetchUser();
  } catch (error) {
    console.error("Error al actualizar el usuario:", error.message);
  }
};
</script>

<style scoped>
.user-card {
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  width: 300px;
  text-align: center;
}
</style>
