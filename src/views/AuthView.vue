<template>
 <div>
    <h2>Registro</h2>
    <input v-model="email" type="email" placeholder="Correo electrónico" />
    <input v-model="password" type="password" placeholder="Contraseña" />
    <input v-model="confirmPassword" type="password" placeholder="Confirmar contraseña" />
    <button @click="signUp">Registrarse</button>

    <h2>Iniciar sesión</h2>
    <input v-model="loginEmail" type="email" placeholder="Correo electrónico" />
    <input v-model="loginPassword" type="password" placeholder="Contraseña" />
    <button @click="signIn">Iniciar sesión</button>
 </div>
</template>

<script>
import { useUserStore } from '../stores/user.js'

export default {
 data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      loginEmail: '',
      loginPassword: '',
    };
 },
 methods: {
    async signUp() {
      if (this.password !== this.confirmPassword) {
        alert('Las contraseñas no coinciden');
        return;
      }
      const userStore = useUserStore();
      try {
        await userStore.signUp(this.email, this.password);
        alert('Registro exitoso');
      } catch (error) {
        alert('Error en el registro: ' + error.message);
      }
    },
    async signIn() {
      const userStore = useUserStore();
      try {
        await userStore.signIn(this.loginEmail, this.loginPassword);
        alert('Inicio de sesión exitoso');
      } catch (error) {
        alert('Error en el inicio de sesión: ' + error.message);
      }
    },
 },
};
</script>
