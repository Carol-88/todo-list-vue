<template>
  <section>
    <h1>Dashboard</h1>
    <nav>
      <ul>
        <li><ProfileButtonComponent /></li>
        <li><LogoutComponent /></li>
      </ul>
    </nav>
    <div v-if="userStore.user">
      <form class="task-inputs">
        <input
          v-model="newTaskTitle"
          type="text"
          placeholder="Nueva tarea"
          required
        />
        <input
          v-model="description"
          type="text"
          placeholder="Describe tu tarea"
          required
        />
        <button @click="addTask">Agregar tarea</button>
      </form>
    </div>
    <div v-else>
      <p>Por favor, inicia sesión para agregar tareas.</p>
    </div>

    <div v-if="taskStore.tasks && taskStore.tasks.length > 0">
      <ul class="task-list">
        <li v-for="task in taskStore.tasks" :key="task.id" class="task-card">
          <div class="task-content">
            <div class="task-actions">
              <i class="fas fa-edit" @click="editTask(task.id)"></i>
              <i class="fas fa-trash" @click="deleteTask(task.id)"></i>
              <i class="fas fa-check" @click="markTaskAsComplete(task.id)"></i>
            </div>
            <h3 :class="{ 'task-title-completed': task.is_complete }">
              {{ task.title }}
            </h3>
            <p :class="{ 'task-description-completed': task.is_complete }">
              {{ task.description }}
            </p>
            <em
              ><em>{{ formatDate(task.inserted_at) }}</em></em
            >
          </div>
        </li>
      </ul>
    </div>
    <EditTaskForm
      v-if="taskIdToEdit"
      :taskId="taskIdToEdit"
      @update-task="handleUpdateTask"
      @close="handleCloseModal"
    />
  </section>
</template>

<script setup>
import LogoutComponent from "@/components/LogoutComponent.vue";
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";
import EditTaskForm from "@/components/EditTaskForm.vue";
import ProfileButtonComponent from "@/components/ProfileButtonComponent.vue";

const taskStore = useTaskStore();
const userStore = useUserStore();
const newTaskTitle = ref("");
const description = ref("");
const taskIdToEdit = ref(null);

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

const editTask = (taskId) => {
  taskIdToEdit.value = taskId;
};

const deleteTask = (taskId) => {
  taskStore.deleteTask(taskId);
};

const markTaskAsComplete = (taskId) => {
  taskStore.markTaskAsComplete(taskId);
};

const handleUpdateTask = async (updatedTask) => {
  await taskStore.editTask(
    updatedTask.taskId,
    updatedTask.newTitle,
    updatedTask.newDescription
  );
  await taskStore.fetchTasks();
};

const handleCloseModal = () => {
  console.log("Modal cerrado");
  taskIdToEdit.value = null;
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Los meses en JavaScript empiezan desde 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, 2);
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} : ${hours}:${minutes}`;
};

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 5rem;
  height: 100vh;
}

h1 {
  font-size: xx-large;
  text-align: center;
  font-family: Arial Black;
  font-weight: bold;
  font-size: 30px;
  color: #fff;
  text-shadow: -1px 0 #000, 0 1px #000, 1px 0 #000, 0 -1px #000;
}

nav {
  display: flex;
  flex-direction: row;
}
li {
  list-style: none;
}

.task-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  width: 100%;
}

.task-inputs input {
  flex-grow: 1;
  margin-right: 8px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.task-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  gap: 2rem;
}

.task-card {
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f6ecec;
  width: calc(33.33% - 16px);
  max-width: 100%;
  margin: 8px;
}

/* Ajustes para mantener el título y el timestamp fijos */
.task-card.task-content {
  margin-bottom: 16px;
  max-height: 100px; /* Ajusta según sea necesario */
  overflow: auto; /* Permite el scroll si el texto de la descripción excede el espacio disponible */
}

.task-actions {
  display: flex;
  justify-content: end;
}

.task-actions i {
  cursor: pointer;
  margin-left: 8px;
  color: #872020;
}

.task-actions i:hover {
  color: #660606;
}

.task-title-completed {
  text-decoration: line-through;
  color: #660606;
}

.task-description-completed {
  text-decoration: line-through;
  color: #660606;
}
</style>
