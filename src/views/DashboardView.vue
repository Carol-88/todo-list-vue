<template>
  <section>
    <h1>Dashboard</h1>
    <LogoutComponent />
    <div v-if="userStore.user">
      <input v-model="newTaskTitle" type="text" placeholder="Nueva tarea" />
      <input
        v-model="description"
        type="text"
        placeholder="Describe tu tarea"
      />
      <button @click="addTask">Agregar tarea</button>
    </div>
    <div v-else>
      <p>Por favor, inicia sesión para agregar tareas.</p>
    </div>
    <div v-if="taskStore.tasks && taskStore.tasks.length > 0">
      <ul>
        <li v-for="task in taskStore.tasks" :key="task.id">
          {{ task.title }} - {{ task.description }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue";
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";

const taskStore = useTaskStore();
const userStore = useUserStore();
const newTaskTitle = ref("");
const description = ref("");

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
    await taskStore.addTask(
      newTaskTitle.value,
      description.value,
      userStore.user.id
    );
    newTaskTitle.value = "";
    description.value = "";
  } catch (error) {
    console.error("Error al agregar la tarea:", error);
    alert("Hubo un error al agregar la tarea. Por favor, inténtalo de nuevo.");
  }
};

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>
