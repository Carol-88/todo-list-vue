<template>
  <section>
    <h1>Dashboard</h1>
    <LogoutComponent />
    <div v-if="userStore.user">
      <input v-model="newTaskTitle" type="text" placeholder="Nueva tarea" />
      <button @click="addTask">Agregar tarea</button>
    </div>
    <div v-else>
      <p>Por favor, inicia sesión para agregar tareas.</p>
    </div>
  </section>
</template>

<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue";
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

const taskStore = useTaskStore();
const userStore = useUserStore();
const newTaskTitle = ref("");

const addTask = async () => {
  if (newTaskTitle.value.trim() === "") {
    alert("Por favor, ingresa una tarea válida.");
    return;
  }
  if (!userStore.user) {
    alert("Por favor, inicia sesión para agregar tareas.");
    return;
  }
  try {
    console.log(userStore.user.id);
    await taskStore.addTask(newTaskTitle.value, "", userStore.user.id);
    newTaskTitle.value = "";
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
    alert("Hubo un error al agregar la tarea. Por favor, inténtalo de nuevo.");
  }
};
</script>
