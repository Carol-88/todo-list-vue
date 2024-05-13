<template>
  <div class="user-card" v-if="profile">
    <img :src="profile.avatar_url" alt="Avatar" />
    <div class="userinfo">
      <p>{{ profile.full_name }}</p>
      <em>{{ profile.username }}</em>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";

const userStore = useUserStore();
const profile = ref(userStore.profile);

const updateProfile = async () => {
  try {
    // Llama a la función updateProfile del store para actualizar el perfil
    await userStore.updateProfile();
  } catch (error) {
    console.error("Error al actualizar el perfil:", error.message);
  }
};
</script>

<style scoped>
.user-card {
  display: flex;
  gap: 1rem;
  border-radius: 8px;
  padding: 16px;
  margin-top: 16px;
  width: 200px;
  position: absolute;
  height: 60px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  left: 27px;
  top: 0px;
}

img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
