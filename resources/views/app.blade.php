<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <title>DignaVivienda</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.tsx'])
</head>
<body>
    <div id="app"></div>

    <script>
    window.DIGNA_VIVIENDA = {{ Illuminate\Support\Js::from([
        'screen' => $initialScreen ?? 'welcome',
        'user' => $user ? [
            'id' => $user->id,
            'name' => $user->name,
            'email' => $user->email,
            'role' => $user->role,
        ] : null,
        'errors' => $errors->all(),
    ]) }};
    </script>
</body>
</html>
