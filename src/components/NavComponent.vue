<template>
  <nav>
    <img src="/dash.png" alt="Dashboard" />
    <ul>
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
</script>

<style scoped>
img {
  position: absolute;
  top: -13px;
  left: -43px;
  width: 250px;
}
</style>
