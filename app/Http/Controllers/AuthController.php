<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        // Validamos los datos del formulario
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone' => 'required|string|max:30',
            'password' => 'required|string|confirmed|min:8',
            'intent' => 'required|in:rent,publish',
        ]);

        // Determinamos el rol internamente.
        // El usuario nunca envía directamente "arrendatario" o "propietario".
        $role = match ($validatedData['intent']) {
            'rent' => 'arrendatario',
            'publish' => 'propietario',
        };

        // Creamos el usuario
        $user = User::create([
            'name' => $validatedData['name'],
            'email' => $validatedData['email'],
            'phone' => $validatedData['phone'],
            'password' => Hash::make($validatedData['password']),
            'role' => $role,
        ]);

        // Iniciamos sesión
        Auth::login($user);

        // Llevamos al dashboard único
        return redirect('/dashboard');
    }

    public function logout(Request $request)
    {
        Auth::logout();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/');
    }

    public function login(Request $request)
    {
        // Validamos los datos recibidos
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required|string',
        ]);

        // Intentamos iniciar sesión
        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            // Todos los usuarios entran al mismo dashboard.
            // El dashboard decidirá qué mostrar según el rol.
            return redirect('/dashboard');
        }

        // Si las credenciales son incorrectas
        return back()->withErrors([
            'email' => 'El correo o la contraseña son incorrectos.',
        ])->onlyInput('email');
    }
}