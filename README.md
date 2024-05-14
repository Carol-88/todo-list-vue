# Proyecto VueJS3 con Pinia y Supabase

![Logo del Proyecto](https://dashboard-todolist.netlify.app/dash.png)

Este proyecto es una aplicación web completa desarrollada con VueJS 3, utilizando la Composition API, Pinia para el manejo del estado, y Supabase para la autenticación y gestión de datos. La aplicación permite a los usuarios registrarse, cerrar sesión, iniciar sesión, modificar su perfil, y gestionar tareas desde un panel de control. Además, incluye una barra de navegación y una tarjeta de usuario que muestra los datos del usuario.

## Características

- **Autenticación**: Implementación de registro, cierre de sesión e inicio de sesión utilizando Supabase.
- **Gestión de Perfil**: Vista de perfil donde el usuario puede modificar sus datos.
  <div align="center" padding-top="20">
  <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/profile.png" width="400" height="600" alt="Profile">
</div>
- **Panel de Control de Tareas**: Vista de dashboard donde el usuario puede añadir, editar, marcar como completadas y borrar tareas.
<div align="center">
  <img src="https://github.com/Carol-88/todo-list-vue/blob/main/public/dashboard.png" width="600" height="400" alt="Dashboard">
</div>
- **Barra de Navegación**: Integración con Vue Router para una navegación fluida entre las vistas.
- **Tarjeta de Usuario**: Muestra los datos del usuario de manera dinámica.

## Tecnologías Utilizadas

- **Frontend**: VueJS 3, Composition API, Pinia.
- **Backend**: Supabase.
- **Estilos**: Utiliza CSS para el diseño y estilos de la aplicación.

**Configurar Supabase**:
   - Crea una cuenta en [Supabase](https://supabase.io/) si aún no tienes una.
   - Crea un nuevo proyecto en Supabase y obtén las credenciales de la API.
   - Configura las credenciales de Supabase en el archivo `.env.local` de tu proyecto.
