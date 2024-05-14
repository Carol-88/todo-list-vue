<template>
  <div class="container-btn">
    <button @click="goToDashboard">Dashboard</button>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";

const router = useRouter();

const goToDashboard = () => {
  router.push({ path: "/dashboard" });
};
</script>
