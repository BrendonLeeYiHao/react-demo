<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\UserController;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//router name, then function name
Route::post('register', [UserController::class, 'register']);
Route::get('getAllUsers', [UserController::class, 'getAllUsers']);
Route::post('updateUser', [UserController::class, 'updateUser']);
Route::post('deleteUser', [UserController::class, 'deleteUser']);
Route::post('getUser', [UserController::class, 'getUser']);
Route::post('deleteImage', [UserController::class, 'deleteImage']);
Route::post('login', [UserController::class, 'login']);