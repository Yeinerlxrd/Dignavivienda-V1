# DignaVivienda

Aplicativo web de arriendo de viviendas para Ubaté, Cundinamarca.

## Stack

- Laravel 13
- PHP 8.5+
- MariaDB / MySQL
- React + TypeScript
- Tailwind CSS 4
- Vite
- Git / GitHub

## Instalación

```bash
cd ~/Proyectos/DignaVivienda
composer install
cp .env.example .env
php artisan key:generate
```

Configura en `.env` las credenciales locales de MariaDB y crea la base de datos `dignavivienda`.

Después:

```bash
php artisan migrate
npm install
npm run build
composer run dev
```

La aplicación estará disponible en `http://localhost:8000`.

> No subir `.env`, `vendor/`, `node_modules/` ni la base de datos local al repositorio.

## Estructura del frontend

El frontend React proveniente de los mockups se encuentra en:

```text
resources/js/
├── components/
├── data/
├── screens/
├── App.tsx
└── app.tsx
```

Laravel entrega el contenedor React mediante `resources/views/app.blade.php`.

## Autenticación

El registro asigna el rol automáticamente según la intención del usuario:

- `rent` → `arrendatario`
- `publish` → `propietario`

El rol `administrador` no se puede seleccionar desde el registro público.
```Creado por Juan José Corredor Ahumada y Yeiner José Sánchez Colina ```

El dashboard se adapta al rol almacenado en la base de datos.
