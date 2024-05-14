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
import { useUserStore } from "../stores/user";
import { storeToRefs } from "pinia";

const userStore = useUserStore();
const { profile } = storeToRefs(userStore);
</script>

<style scoped>
.user-card {
  display: flex;
  gap: 1rem;
  border-radius: 8px;
  padding: 16px;
  width: 200px;
  height: 60px;
  text-align: center;
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  justify-content: space-around;
  align-items: flex-end;
}

img {
  width: 70px;
  height: 70px;
  border-radius: 50%;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
