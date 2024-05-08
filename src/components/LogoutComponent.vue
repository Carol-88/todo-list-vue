<template>
  <div class="logout-container">
    <button @click="handleLogout">Cerrar sesión</button>
  </div>
</template>

<script setup>
import { useUserStore } from "../stores/user.js";
import { useRouter } from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const handleLogout = async () => {
  try {
    await userStore.signOut();

    router.push({ path: "/auth" });
  } catch (error) {
    console.error("Error al cerrar sesión:", error.message);
    alert("Error al cerrar sesión. Por favor, inténtalo de nuevo.");
  }
};
</script>

<style scoped>
.logout-container {
  text-align: center;
  margin-top: 20px;
}
</style>
