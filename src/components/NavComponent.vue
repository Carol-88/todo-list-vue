<template>
  <nav>
    <ul>
      <li><UserCardComponent /></li>
      <li><ProfileButtonComponent /></li>
      <li><LogoutComponent /></li>
      <li><DashboardButtonComponent /></li>
    </ul>
  </nav>
</template>

<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue";
import ProfileButtonComponent from "@/components/ProfileButtonComponent.vue";
import DashboardButtonComponent from "@/components/DashboardButtonComponent.vue";
import UserCardComponent from "@/components/UserCardComponent.vue";
</script>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }

  ul {
    flex-direction: column;
  }
}
</style>
