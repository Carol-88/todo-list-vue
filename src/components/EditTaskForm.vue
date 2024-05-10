<template>
  <div>
    <h2>Editar Tarea</h2>
    <form @submit.prevent="submitForm">
      <input v-model="editedTitle" type="text" placeholder="Título" />
      <textarea
        v-model="editedDescription"
        placeholder="Descripción"
      ></textarea>
      <button type="submit">Guardar Cambios</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";

// Define las props que el componente espera recibir
const props = defineProps({
  taskId: String, // Asegúrate de que taskId sea de tipo String
});

// Define los eventos que el componente puede emitir
const emit = defineEmits(["update-task", "close"]);

// Inicializa los datos del formulario con los valores actuales de la tarea
const editedTitle = ref(props.taskId ? props.taskId.title : "");
const editedDescription = ref(props.taskId ? props.taskId.description : "");

if (!props.taskId) {
  console.error("No se proporcionó un taskId válido.");
}

const submitForm = async () => {
  emit("update-task", {
    taskId: props.taskId,
    newTitle: editedTitle.value,
    newDescription: editedDescription.value,
  });

  // Llama a la función editTask del store con los nuevos datos
  emit("update-task", {
    taskId: props.taskId,
    newTitle: editedTitle.value,
    newDescription: editedDescription.value,
  });

  emit("close");
};
</script>
