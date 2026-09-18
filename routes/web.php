<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;

Route::get('/', function () {
    return view('app', [
        'initialScreen' => 'welcome',
        'user' => null,
    ]);
});

Route::get('/registro', function () {
    return view('app', [
        'initialScreen' => 'register',
        'user' => null,
    ]);
});

Route::post('/registro', [AuthController::class, 'register']);

Route::get('/login', function () {
    return view('app', [
        'initialScreen' => 'login',
        'user' => null,
    ]);
});

Route::post('/login', [AuthController::class, 'login']);

Route::post('/logout', [AuthController::class, 'logout'])
    ->middleware('auth');

Route::get('/dashboard', [DashboardController::class, 'index'])
    ->middleware('auth');
