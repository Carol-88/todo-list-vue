<template>
  <section>
    <h1>dashboard</h1>
    <LogoutComponent />
    <div>
      <input v-model="newTaskTitle" type="text" placeholder="Nueva tarea" />
      <button @click="addTask">Agregar tarea</button>
    </div>
  </section>
</template>

<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue";
import { ref } from "vue";
import { useTaskStore } from "@/stores/task";

const taskStore = useTaskStore();
const newTaskTitle = ref("");

const addTask = () => {
  if (newTaskTitle.value.trim() === "") {
    alert("Por favor, ingresa una tarea válida.");
    return;
  }
  taskStore.addTask(newTaskTitle.value);
  newTaskTitle.value = "";
};
</script>
