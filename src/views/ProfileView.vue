<template>
  <div class="container">
    <h2>Perfil</h2>
    <form @submit.prevent="updateProfile">
      <input v-model="full_name" placeholder="Nombre completo" />
      <input v-model="avatar_url" placeholder="URL del avatar" />
      <input v-model="username" placeholder="Nombre de usuario" />
      <button type="submit">Actualizar perfil</button>
    </form>
  </div>
  <div class="user-card container" v-if="user">
    <img :src="user.avatar_url" alt="Avatar" />
    <h3>{{ user.username }}</h3>
    <h4>{{ user.full_name }}</h4>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const user = ref(userStore.user);
const full_name = ref("");
const avatar_url = ref("");
const username = ref("");

const updateProfile = async () => {
  try {
    await userStore.updateProfile(
      full_name.value,
      avatar_url.value,
      username.value
    );

    full_name.value = "";
    avatar_url.value = "";
    username.value = "";
  } catch (error) {
    console.error("Error al actualizar el perfil:", error.message);
  }
};

onMounted(async () => {
  await userStore.fetchUser();
});
</script>

<style scoped>
.user-card {
  display: flex;
  border: 1px solid #ccc;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  width: 300px;
  text-align: center;
  background-color: #f6eeee;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>
