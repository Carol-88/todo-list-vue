<template>
  <div class="container-btn">
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
.container-btn {
  position: absolute;
  top: 10px;
  right: 126px;
  width: 104px;
}
</style>
