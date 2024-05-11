<template>
  <div class="container">
    <button @click="goToProfile">Perfil</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToProfile = () => {
  router.push({ path: "/profile" });
};
</script>

<style scoped>
.container {
  position: absolute;
  top: 10px; /* Ajusta según sea necesario */
  right: 126px;
  width: 104px; /* Ajusta según sea necesario */
}
</style>
