<template>
  <router-view />
</template>

<script setup>
import { useUserStore } from "./stores/user.js";
import { useTaskStore } from "./stores/task.js";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { onMounted } from "vue";

import "@fortawesome/fontawesome-free/css/all.css";

const router = useRouter();
const userStore = useUserStore();
const taskStore = useTaskStore();
const { user } = storeToRefs(userStore);

onMounted(async () => {
  try {
    await userStore.fetchUser();
    if (!user.value) {
      router.push({ path: "/auth" });
    } else {
      router.push({ path: "/" });
      await taskStore.fetchTasks();
      await userStore.fetchProfile();
    }
  } catch (e) {
    console.error(e);
  }
});
</script>

<style>
html {
  width: 100vw;
  overflow-x: hidden;
  font-family: "Lucida Sans", "Lucida Sans Regular", "Lucida Grande",
    "Lucida Sans Unicode", Geneva, Verdana, sans-serif;
  display: flex;
  justify-content: center;
  height: 100vh;
  width: 100vw;
  box-sizing: border-box;
  background-color: #edcad072;
  margin: auto;
}

nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 95%;
  justify-content: flex-end;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #ba5858;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

button:hover {
  background-color: darkred;
}

input {
  width: 90%;
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

ul {
  list-style: none;
}

.container {
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 400px;
  margin-top: 5rem;
}
</style>
