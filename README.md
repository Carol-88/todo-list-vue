# Proyecto VueJS3 con Pinia y Supabase

Este proyecto es una aplicación web completa desarrollada con VueJS 3, utilizando la Composition API, Pinia para el manejo del estado, y Supabase para la autenticación y gestión de datos. La aplicación permite a los usuarios registrarse, cerrar sesión, iniciar sesión, modificar su perfil, y gestionar tareas desde un panel de control. Además, incluye una barra de navegación y una tarjeta de usuario que muestra los datos del usuario.

<a href="https://dashboard-todolist.netlify.app/" target="_blank">Ver deploy</a>

## Características

- **Autenticación**: Implementación de registro, cierre de sesión e inicio de sesión utilizando Supabase.

  <div align="center" style="padding-top: 20px;">
    <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/login.png" width="350" height="350" alt="Login"> 
    <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/register.png" width="350" height="350" alt="Register">
  </div>

- **Gestión de Perfil**: Vista de perfil donde el usuario puede modificar sus datos.

  <div align="center" style="padding-top: 20px;">
    <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/profile.png" width="400" height="600" alt="Profile">
  </div>

- **Panel de Control de Tareas**: Vista de dashboard donde el usuario puede añadir, editar, marcar como completadas y borrar tareas.

  <div align="center">
    <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/dashboard.png" width="600" height="400" alt="Dashboard">
  </div>

- **Barra de Navegación**: Integración con Vue Router para una navegación fluida entre las vistas.

- **Tarjeta de Usuario**: Muestra los datos del usuario de manera dinámica.

  <div align="center">
    <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/usercard.png" width="200" height="90" alt="Usercard">
  </div>

## Tecnologías Utilizadas

- **Frontend**: VueJS 3, Composition API, Pinia.
- **Backend**: Supabase.
- **Estilos**: Utiliza CSS para el diseño y estilos de la aplicación.

**Configurar Supabase**:
   - Crea una cuenta en [Supabase](https://supabase.io/) si aún no tienes una.
   - Crea un nuevo proyecto en Supabase y obtén las credenciales de la API.
   - Configura las credenciales de Supabase en el archivo `.env` de tu proyecto.


