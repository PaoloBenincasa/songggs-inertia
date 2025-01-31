<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;

use Illuminate\Foundation\Application;
use App\Http\Controllers\SongController;
use App\Http\Controllers\ArtistController;
use App\Http\Controllers\ProfileController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/artists', [ArtistController::class, 'index'])->name('artists.index');
Route::get('/artists/{artist}', [ArtistController::class, 'show'])->name('artists.show');
Route::post('/artists', [ArtistController::class, 'store'])->name('artists.store');
Route::get('/songs', [SongController::class, 'index'])->name('songs.index');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/profile/mycatalog', [ProfileController::class, 'mycatalog'])->name('mycatalog');
    Route::put('/artists/{artist}', [ArtistController::class, 'update'])->name('artists.update');    Route::get('/artists/{artist}/edit', [ArtistController::class, 'edit'])->name('artists.edit');
    Route::get('/artists/{id}/edit', [ArtistController::class, 'edit'])->name('artists.edit');
    Route::post('/songs', [SongController::class, 'store'])->name('songs.store');
    Route::get('/songs/create', [SongController::class, 'create'])->name('songs.create');
    Route::get('/songs/{id}', [SongController::class, 'show'])->name('songs.show');
    Route::get('/songs/{id}/edit', [SongController::class, 'edit'])->name('songs.edit');
    Route::patch('/songs/{id}', [SongController::class, 'update'])->name('songs.update');
    Route::delete('/songs/{id}', [SongController::class, 'destroy'])->name('songs.destroy');
});

require __DIR__.'/auth.php';
