<template>
  <section>
    <NavComponent />
    <h1>Mis Tareas</h1>
    <div v-if="userStore.user">
      <form @submit.prevent="addTask" class="task-inputs">
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
        <button type="submit">Agregar tarea</button>
      </form>
    </div>
    <div v-else>
      <p>Por favor, inicia sesión para agregar tareas.</p>
    </div>
    <div v-if="taskIdToEdit" class="modal-container">
      <EditTaskForm
        :taskId="taskIdToEdit"
        @update-task="handleUpdateTask"
        @close="handleCloseModal"
      />
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
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useTaskStore } from "@/stores/task";
import { useUserStore } from "@/stores/user";
import EditTaskForm from "@/components/EditTaskForm.vue";
import NavComponent from "@/components/NavComponent.vue";

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
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, 2);
  const minutes = String(date.getMinutes()).padStart(2, "0");
  return `${day}/${month}/${year} : ${hours}:${minutes}`;
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 2rem;
  height: 100vh;
}

h1 {
  font-size: xx-large;
  text-align: center;
  font-weight: bold;
  font-size: 30px;
  color: darkred;
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

.task-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  list-style: none;
  gap: 2rem;
}

.task-card {
  display: flex;
  height: 200px;
  width: 250px;
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #ffffff;
  max-width: 100%;
  margin: 8px;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}

.task-card.task-content {
  margin-bottom: 16px;
  max-height: 100px;
  overflow: auto;
}

.task-actions {
  display: flex;
  justify-content: end;
}

.task-actions i {
  cursor: pointer;
  margin-left: 8px;
  color: darkred;
}

.task-actions i:hover {
  color: #1e775b;
}

.task-title-completed {
  text-decoration: line-through;
  color: darkred;
}

.task-description-completed {
  text-decoration: line-through;
  color: darkred;
}

.task-content {
  height: -webkit-fill-available;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
