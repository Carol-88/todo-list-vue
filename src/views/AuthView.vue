<template>
  <section>
    <article v-if="hasUser">
      <LoginComponent />
      <a @click="toggleUser" class="hover">No tengo una cuenta</a>
    </article>
    <article v-else>
      <RegisterComponent />
    </article>
  </section>
</template>

<script setup>
import { ref } from "vue";
import RegisterComponent from "@/components/RegisterComponent.vue";
import LoginComponent from "@/components/LoginComponent.vue";

const hasUser = ref(true);
function toggleUser() {
  hasUser.value = !hasUser.value;
}
</script>

<style scoped>
a {
  padding: 1rem;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
}

.hover {
  --c: darkred; /* el color */
  color: #0000;
  background: linear-gradient(90deg, #c86666 50%, var(--c) 0)
      calc(100% - var(--_p, 0%)) / 200%,
    linear-gradient(var(--c) 0 0) 0% 100% / var(--_p, 0%) no-repeat,
    var(--_c, #0000);
  -webkit-background-clip: text, padding-box, padding-box;
  background-clip: text, padding-box, padding-box;
  transition: 1s, color.5s, background-color.5s;
}
.hover:hover {
  color: #ffffff;
  --_c: var(--c);
  --_p: 100%;
  transition: 0.5s, color 0s.1s, background-color 0s.5s;
}
</style>
