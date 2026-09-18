<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>DignaVivienda</title>

    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
            background: #f0f2f5;
            color: #1c1e21;
        }

        /* BARRA SUPERIOR */

        .navbar {
            height: 60px;
            background: white;
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 0 25px;
            border-bottom: 1px solid #ddd;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .logo {
            font-size: 24px;
            font-weight: bold;
            color: #2563eb;
        }

        .search {
            width: 350px;
        }

        .search input {
            width: 100%;
            padding: 11px 18px;
            border: none;
            border-radius: 20px;
            background: #f0f2f5;
            outline: none;
            font-size: 14px;
        }

        .user {
            display: flex;
            align-items: center;
            gap: 10px;
        }

        .avatar {
            width: 38px;
            height: 38px;
            border-radius: 50%;
            background: #2563eb;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        }

        /* ESTRUCTURA */

        .container {
            max-width: 1400px;
            margin: auto;
            display: grid;
            grid-template-columns: 230px 1fr 280px;
            gap: 25px;
            padding: 25px;
        }

        /* MENÚ IZQUIERDO */

        .sidebar {
            position: sticky;
            top: 85px;
            height: fit-content;
        }

        .menu-item {
            display: flex;
            align-items: center;
            gap: 12px;
            padding: 12px;
            border-radius: 8px;
            margin-bottom: 5px;
            cursor: pointer;
        }

        .menu-item:hover {
            background: #e4e6eb;
        }

        .menu-item.active {
            background: #dbeafe;
            color: #2563eb;
            font-weight: bold;
        }

        /* FEED */

        .feed {
            display: flex;
            flex-direction: column;
            gap: 20px;
        }

        .welcome {
            background: white;
            border-radius: 10px;
            padding: 20px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .welcome h2 {
            margin-bottom: 8px;
        }

        .welcome p {
            color: #65676b;
        }

        /* PUBLICACIÓN */

        .post {
            background: white;
            border-radius: 10px;
            overflow: hidden;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .post-header {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 15px;
        }

        .post-header-info strong {
            display: block;
        }

        .post-header-info span {
            color: #65676b;
            font-size: 13px;
        }

        .property-image {
            width: 100%;
            height: 300px;
            object-fit: cover;
            display: block;
        }

        .post-content {
            padding: 18px;
        }

        .post-content h3 {
            margin-bottom: 8px;
        }

        .location {
            color: #65676b;
            margin-bottom: 12px;
        }

        .price {
            font-size: 21px;
            font-weight: bold;
            color: #2563eb;
            margin-bottom: 15px;
        }

        .features {
            display: flex;
            gap: 20px;
            margin-bottom: 18px;
            color: #444;
        }

        .actions {
            border-top: 1px solid #ddd;
            padding-top: 12px;
            display: flex;
            gap: 10px;
        }

        .btn {
            flex: 1;
            border: none;
            padding: 10px;
            border-radius: 7px;
            cursor: pointer;
            font-weight: bold;
        }

        .btn:hover {
            opacity: 0.85;
        }

        .btn-favorite {
            background: #f0f2f5;
        }

        .btn-contact {
            background: #2563eb;
            color: white;
        }

        /* LATERAL DERECHO */

        .right-sidebar {
            position: sticky;
            top: 85px;
            height: fit-content;
        }

        .card {
            background: white;
            border-radius: 10px;
            padding: 18px;
            margin-bottom: 20px;
            box-shadow: 0 1px 2px rgba(0, 0, 0, 0.08);
        }

        .card h3 {
            margin-bottom: 15px;
        }

        .filter {
            margin-bottom: 12px;
        }

        .filter label {
            display: block;
            font-size: 13px;
            margin-bottom: 5px;
            color: #65676b;
        }

        .filter select {
            width: 100%;
            padding: 9px;
            border: 1px solid #ddd;
            border-radius: 6px;
        }

        /* RESPONSIVE */

        @media (max-width: 1000px) {
            .container {
                grid-template-columns: 200px 1fr;
            }

            .right-sidebar {
                display: none;
            }
        }

        @media (max-width: 700px) {
            .navbar {
                padding: 0 12px;
            }

            .search {
                width: 180px;
            }

            .container {
                display: block;
                padding: 12px;
            }

            .sidebar {
                display: none;
            }

            .property-image {
                height: 220px;
            }
        }
    </style>
</head>

<body>

    <!-- BARRA SUPERIOR -->

    <nav class="navbar">

        <div class="logo">
            DignaVivienda
        </div>

        <div class="search">
            <input
                type="text"
                placeholder="Buscar viviendas..."
            >
        </div>

        <div class="user">
            <div class="avatar">
                Y
            </div>

            <strong>Usuario</strong>
        </div>

    </nav>


    <!-- CONTENIDO -->

    <main class="container">

        <!-- MENÚ IZQUIERDO -->

        <aside class="sidebar">

            <div class="menu-item active">
                🏠
                <span>Inicio</span>
            </div>

            <div class="menu-item">
                🏘️
                <span>Inmuebles</span>
            </div>

            <div class="menu-item">
                ❤️
                <span>Favoritos</span>
            </div>

            <div class="menu-item">
                💬
                <span>Mensajes</span>
            </div>

            <div class="menu-item">
                👤
                <span>Mi perfil</span>
            </div>

        </aside>


        <!-- FEED -->

        <section class="feed">

            <div class="welcome">

                <h2>Encuentra tu próximo hogar 🏠</h2>

                <p>
                    Explora viviendas disponibles en Ubaté
                    y encuentra el lugar ideal para ti.
                </p>

            </div>


            <!-- PUBLICACIÓN -->

            <article class="post">

                <div class="post-header">

                    <div class="avatar">
                        P
                    </div>

                    <div class="post-header-info">

                        <strong>Pedro Rodríguez</strong>

                        <span>
                            Propietario · Hace 2 horas
                        </span>

                    </div>

                </div>


                <img
                    class="property-image"
                    src="https://images.unsplash.com/photo-1560185008-b033106af5c3?auto=format&fit=crop&w=1200&q=80"
                    alt="Apartamento en alquiler"
                >


                <div class="post-content">

                    <h3>
                        Apartamento moderno en Ubaté
                    </h3>

                    <div class="location">
                        📍 Ubaté, Cundinamarca
                    </div>

                    <div class="price">
                        $650.000 / mes
                    </div>

                    <div class="features">

                        <span>🛏️ 3 habitaciones</span>

                        <span>🚿 2 baños</span>

                        <span>🚗 Garaje</span>

                    </div>

                    <div class="actions">

                        <button class="btn btn-favorite">
                            ❤️ Favorito
                        </button>

                        <button class="btn btn-contact">
                            💬 Contactar
                        </button>

                    </div>

                </div>

            </article>


            <!-- SEGUNDA PUBLICACIÓN -->

            <article class="post">

                <div class="post-header">

                    <div class="avatar">
                        M
                    </div>

                    <div class="post-header-info">

                        <strong>María González</strong>

                        <span>
                            Propietaria · Ayer
                        </span>

                    </div>

                </div>


                <img
                    class="property-image"
                    src="https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=80"
                    alt="Apartamento disponible"
                >


                <div class="post-content">

                    <h3>
                        Apartamento acogedor cerca del centro
                    </h3>

                    <div class="location">
                        📍 Ubaté, Cundinamarca
                    </div>

                    <div class="price">
                        $550.000 / mes
                    </div>

                    <div class="features">

                        <span>🛏️ 2 habitaciones</span>

                        <span>🚿 1 baño</span>

                        <span>🐶 Mascotas</span>

                    </div>

                    <div class="actions">

                        <button class="btn btn-favorite">
                            ❤️ Favorito
                        </button>

                        <button class="btn btn-contact">
                            💬 Contactar
                        </button>

                    </div>

                </div>

            </article>

        </section>


        <!-- LATERAL DERECHO -->

        <aside class="right-sidebar">

            <div class="card">

                <h3>Filtros rápidos</h3>

                <div class="filter">

                    <label>Tipo de inmueble</label>

                    <select>
                        <option>Todos</option>
                        <option>Apartamento</option>
                        <option>Casa</option>
                        <option>Habitación</option>
                    </select>

                </div>

                <div class="filter">

                    <label>Precio máximo</label>

                    <select>
                        <option>Sin límite</option>
                        <option>$500.000</option>
                        <option>$700.000</option>
                        <option>$1.000.000</option>
                    </select>

                </div>

                <div class="filter">

                    <label>Habitaciones</label>

                    <select>
                        <option>Cualquiera</option>
                        <option>1+</option>
                        <option>2+</option>
                        <option>3+</option>
                    </select>

                </div>

            </div>


            <div class="card">

                <h3>¿Eres propietario?</h3>

                <p>
                    Publica tu inmueble y encuentra
                    rápidamente personas interesadas.
                </p>

                <br>

                <button class="btn btn-contact">
                    Publicar inmueble
                </button>

            </div>

        </aside>

    </main>

</body>
</html>