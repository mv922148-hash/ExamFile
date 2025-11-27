# Sistema de Gestión con Dashboard

Sistema completo de gestión con autenticación de usuarios, dashboard interactivo y gestión de usuarios.

## Características

- **Login con efecto cristal**: Página de inicio de sesión con diseño glassmorphism y colores azules
- **3 roles de usuario**: Superusuario, Administrador y Usuario
- **Dashboard interactivo**: 8 tarjetas con métricas y 4 gráficas de diferentes tipos
- **Gestión de usuarios**: Vista completa de todos los usuarios registrados con filtros por rol
- **Diseño responsivo**: Topbar flotante, sidebar desplegable y efectos translúcidos
- **Animaciones suaves**: Transiciones y efectos hover en todos los elementos

## Estructura del Proyecto

- `index.html` - Página de login
- `dashboard.html` - Dashboard principal con gráficas
- `users.html` - Gestión de usuarios
- `components/` - Componentes reutilizables
- `utils/` - Utilidades y funciones de autenticación

## Usuarios de Prueba

### Superusuarios
- Usuario: `super1` / Contraseña: `super123`
- Usuario: `super2` / Contraseña: `super456`

### Administradores
- Usuario: `admin1` / Contraseña: `admin123`
- Usuario: `admin2` / Contraseña: `admin456`

### Usuarios
- Usuario: `user1` / Contraseña: `user123`
- Usuario: `user2` / Contraseña: `user456`

## Tecnologías

- React 18
- TailwindCSS
- Chart.js
- Lucide Icons
- Trickle Database