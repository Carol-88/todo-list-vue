<template>
  <nav>
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
