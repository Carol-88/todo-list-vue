<template>
  <NavComponent />
  <section>
    <div class="container">
      <h2>Editar perfil</h2>
      <form @submit.prevent="updateProfile">
        <input v-model="full_name" placeholder="Nombre completo" />
        <input v-model="avatar_url" placeholder="URL del avatar" />
        <input v-model="username" placeholder="Nombre de usuario" />
        <button type="submit">Actualizar perfil</button>
      </form>
    </div>
    <div class="user-card" v-if="profile">
      <img :src="profile.avatar_url" alt="Avatar" />
      <div class="userinfo">
        <p>{{ profile.full_name }}</p>
        <em>{{ profile.username }}</em>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";
import NavComponent from "@/components/NavComponent.vue";

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
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
  await userStore.fetchProfile();
};
</script>

<style scoped>
section {
  padding-top: 2rem;
}
.user-card {
  display: flex;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  width: 300px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

p {
  font-weight: 600;
}
.userinfo {
  padding: 0 2rem;
  text-align: start;
  color: darkred;
}

section {
  display: flex;
  flex-direction: column;
  text-align: center;
  align-items: center;
}
</style>
