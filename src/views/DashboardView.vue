<template>
  <section>
    <h1>Dashboard</h1>
    <LogoutComponent />
    <div v-if="userStore.user">
      <div class="task-inputs">
        <input v-model="newTaskTitle" type="text" placeholder="Nueva tarea" />
        <input
          v-model="description"
          type="text"
          placeholder="Describe tu tarea"
        />
        <button @click="addTask">Agregar tarea</button>
      </div>
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

onMounted(async () => {
  await taskStore.fetchTasks();
});
</script>

<style scoped>
section {
  width: 100%;
}
.task-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
}

.task-list {
  display: flex;
  justify-content: space-between;
}

.task-card {
  border-radius: 8px;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f6ecec;
  width: 300px;
  margin: 8px;
}

.task-content {
  margin-bottom: 16px;
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
  color: #0056b3;
}

.task-title-completed {
  text-decoration: line-through;
  color: #660606; /* Opcional: cambia el color del texto a un gris para indicar que está completado */
}
.task-description-completed {
  text-decoration: line-through;
  color: #660606; /* Opcional: cambia el color del texto a un gris para indicar que está completado */
}
</style>
