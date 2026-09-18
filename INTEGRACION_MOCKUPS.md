# Integración de los mockups de DignaVivienda

Se integró el frontend React/TypeScript de los mockups dentro de Laravel.

## Qué se integró

- Pantallas de bienvenida, autenticación, búsqueda, detalle de inmueble, favoritos, mensajes y notificaciones.
- Flujo de propietario: dashboard, publicación, verificación y éxito.
- Flujo de administración.
- Componentes reutilizables de barra superior, menú lateral, tarjetas e iconos.
- Tailwind CSS 4 y Vite.
- El rol del usuario ahora proviene de Laravel/MariaDB.
- Se eliminó el selector visual de "Vista demo".
- El registro usa una intención:
  - `rent` = arrendatario
  - `publish` = propietario
- Se agregó cierre de sesión real mediante Laravel.
- Se agregó el campo `phone` a `users` mediante migration.

## Antes de ejecutar

No se incluye `.env`, `vendor`, `node_modules`, `.git` ni la base de datos local.

En una instalación limpia:

```bash
cd ~/Proyectos/DignaVivienda
composer install
cp .env.example .env
php artisan key:generate
npm install
php artisan migrate
npm run build
composer run dev
```

Configura primero MariaDB en `.env`.

## Nota

Los inmuebles, conversaciones y notificaciones todavía provienen de `resources/js/data/mock.ts`. Esto permite presentar el avance visual mientras se construyen los modelos, migrations y controladores reales de DignaVivienda.
