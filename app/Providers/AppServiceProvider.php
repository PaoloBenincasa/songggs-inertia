<?php

namespace App\Providers;

use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Condividi l'oggetto auth con Inertia, includendo la relazione 'artist'
        Inertia::share([
            'auth' => function () {
                return [
                    'user' => auth()->check() ? auth()->user()->load('artist') : null,
                ];
            },
        ]);
    }
}
