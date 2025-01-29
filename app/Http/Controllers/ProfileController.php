<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Redirect;
use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;

class ProfileController extends Controller
{
   
    public function edit(Request $request)
{
    $artist = auth()->user()->artist;
    return Inertia::render('Profile/Edit', [
        'mustVerifyEmail' => false,
        'status' => session('status'),
        'auth' => [
            'user' => auth()->user(),
        ],
        'artist' => $artist,
    ]);
}

    
    public function update(ProfileUpdateRequest $request): RedirectResponse
    {
        $request->user()->fill($request->validated());

        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $request->user()->save();

        return Redirect::route('profile.edit');
    }

  
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }

    public function mycatalog()
{
    $songs = Song::where('artist_id', auth()->id())->get();

    if ($songs->isEmpty()) {
        return Inertia::render('Profile/Mycatalog', [
            'songs' => [],
            'message' => 'Non hai ancora caricato nessuna canzone.',
        ]);
    }

    return Inertia::render('Profile/Mycatalog', [
        'songs' => $songs,
    ]);
}

    
    
    
}
