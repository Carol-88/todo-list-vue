<template>
  <article class="modal">
    <div class="container">
      <h2>Editar Tarea</h2>
      <form @submit.prevent="submitForm">
        <input v-model="editedTitle" type="text" placeholder="Título" />
        <input
          v-model="editedDescription"
          type="text"
          placeholder="Descripción"
        />
        <button type="submit">Guardar Cambios</button>
      </form>
    </div>
  </article>
</template>

<script setup>
import { ref } from "vue";

// Define las props que el componente espera recibir
const props = defineProps({
  taskId: Number, // Asegúrate de que taskId sea de tipo String
  taskTitle: String,
  taskDescription: String,
});

const emit = defineEmits(["update-task", "close"]);

const editedTitle = ref(props.taskTitle);
const editedDescription = ref(props.taskDescription);

const submitForm = async () => {
  emit("update-task", {
    taskId: props.taskId,
    newTitle: editedTitle.value,
    newDescription: editedDescription.value,
  });

  emit("close");
};
</script>

<style scoped>
.container {
  height: 250px;
}
.modal {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.585);
}
h2 {
  text-align: center;
  color: darkred;
}
</style>
