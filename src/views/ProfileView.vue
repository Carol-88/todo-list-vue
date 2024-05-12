<template>
  <NavComponent />
  <div class="container">
    <h2>Editar perfil</h2>
    <form @submit.prevent="updateProfile">
      <input v-model="full_name" placeholder="Nombre completo" />
      <input v-model="avatar_url" placeholder="URL del avatar" />
      <input v-model="username" placeholder="Nombre de usuario" />
      <button type="submit">Actualizar perfil</button>
    </form>
  </div>
  <div class="user-card" v-if="user">
    <img :src="user.avatar_url" alt="Avatar" />
    <div class="userinfo">
      <p>username {{ user.username }}</p>
      <em>name{{ user.full_name }}</em>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useUserStore } from "../stores/user";
import NavComponent from "@/components/NavComponent.vue";

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
  box-shadow: 0 0 10px rgb(118, 33, 33);
}

p {
  font-weight: 600;
}
.userinfo {
  padding: 0 2rem;
  text-align: start;
  color: darkred;
}

.container {
  text-align: center;
  color: darkred;
}
</style>
