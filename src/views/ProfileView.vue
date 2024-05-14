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
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "../stores/user";
import NavComponent from "@/components/NavComponent.vue";

const userStore = useUserStore();
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
  width: 100vw;
}

@media (max-width: 768px) {
  .container {
    width: 70%;
  }
}
</style>
