<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;


// Route::post('/register', function (Request $request) {
//     return response('CORS headers added')
//         ->header('Access-Control-Allow-Origin', 'http://localhost:5173')
//         ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
//         ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
// });
Route::get('/', function () {
    return view('welcome');
});
Route::post('/login',[AuthController::class,'login']);
 Route::post('/register',[AuthController::class,'register']);
Route::post('/logout',[AuthController::class,'logout']);