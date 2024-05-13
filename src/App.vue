<template>
  <router-view />
  <!-- your routes will load inside of these tags -->
</template>

<script setup>
import { useUserStore } from "./stores/user.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import "@fortawesome/fontawesome-free/css/all.css";

const router = useRouter();
const userStore = useUserStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser();
    if (!user.value) {
      // redirect them to logout if the user is not there
      router.push({ path: "/auth" });
    } else {
      // continue to dashboard
      router.push({ path: "/" });
      await userStore.fetchProfile();
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<style>
html {
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #4d1818;
  margin: auto; /* Asegura que el padding y el margin no hagan que el contenido se salga del viewport */
}

button {
  width: 100%;
  padding: 10px;
  background-color: #ba5858;
  color: #ffffff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

button:hover {
  background-color: #731f1f;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
}

ul {
  list-style: none;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: #f1c9c9;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 400px;
  margin-top: 5rem;
}
</style>
