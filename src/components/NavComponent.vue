<template>
  <nav>
    <ul>
      <li class="usercard"><UserCardComponent /></li>
      <li class="menu">
        <ProfileButtonComponent /> <LogoutComponent />
        <DashboardButtonComponent />
      </li>
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
.menu {
  display: flex;
  gap: 1rem;
}
nav {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  width: 95%;
  justify-content: flex-end;
}
ul {
  width: 100%;
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

@media (max-width: 768px) {
  nav {
    flex-direction: column;
  }
  ul {
    display: flex;
    justify-content: space-evenly;
    flex-direction: column;
    align-items: center;
  }

  .usercard {
    align-self: center;
    padding-bottom: 2rem;
  }
  .menu {
    flex-direction: column;
    width: 90%;
  }
}
</style>
