<template>
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
</template>

<script setup>
import { ref } from "vue";

// Define las props que el componente espera recibir
const props = defineProps({
  taskId: Number, // Asegúrate de que taskId sea de tipo String
  taskTitle: String,
  taskDescription: String,
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["update-task", "close"]);

// Inicializa los datos del formulario con los valores actuales de la tarea
const editedTitle = ref(props.taskTitle);
const editedDescription = ref(props.taskDescription);

const submitForm = async () => {
  emit("update-task", {
    taskId: props.taskId,
    newTitle: editedTitle.value,
    newDescription: editedDescription.value,
  });

  // Llama a la función editTask del store con los nuevos datos
  // Asegúrate de que el componente padre maneje correctamente esta emisión
  emit("close");
};
</script>

<style scoped>
h2 {
  text-align: center;
  color: darkred;
}
</style>
