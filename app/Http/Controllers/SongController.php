<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SongController extends Controller
{
    public function store(Request $request)
    {
        // dd($request->all());
        $request->validate([
            'title' => 'required|string|max:255',
            'lyrics' => 'required|string',
            'is_private' => 'required|in:0,1',
            'spotifylink' => 'nullable|url',
            'audio' => 'nullable|mimes:mp3,wav,ogg|max:10240', 
        ]);
    

        $audioPath = $request->file('audio') ? $request->file('audio')->store('audio', 'public') : null;

        $spotifyId = null;
        if ($request->filled('spotifylink')) {
            preg_match('/track\/([a-zA-Z0-9]+)/', $request->spotifylink, $matches);
            $spotifyId = $matches[1] ?? null;
    
            if (!$spotifyId) {
                return back()->withErrors(['spotifylink' => 'URL Spotify non valido.']);
            }
        }
    
        $artist = auth()->user()->artist;
        if (!$artist) {
            return back()->withErrors(['artist' => 'Devi avere un artista associato per aggiungere una canzone.']);
        }
    
        $song = $artist->songs()->create([
            'title' => $request->title,
            'lyrics' => $request->lyrics,
            'is_private' => (bool) $request->is_private,
            'spotifylink' => $spotifyId,
            'audio' => $audioPath
        ]);

        return redirect()->route('artists.show', ['artist' => $artist->id]);
    }
 


    public function index()
    {
        $songs = Song::where('artist_id', Auth::id())->get();

        return Inertia::render('Songs/Index', [
            'songs' => $songs,
            'auth' => auth()->user(),

        ]);
    }

    public function edit($id)
    {
        $song = Song::find($id);
        $user = auth()->user();


        if (!$song) {
            return redirect()->route('songs.index')->withErrors(['song' => 'Canzone non trovata.']);
        }
    
        if (!auth()->check() || !auth()->user()->artist || $song->artist_id !== auth()->user()->artist->id) {
            abort(403, 'Non sei autorizzato a modificare questa canzone.');
        }
    
        return Inertia::render('Songs/Edit', [
            'song' => $song,
            'artist' => auth()->user() ? auth()->user()->artist : null,
            'auth' => $user ? [
                'user' => $user,
                'artist' => $user->artist, 
            ] : null,
        ]);
    }
    
    

    public function update(Request $request, $id)
    {
        $song = Song::find($id);
        $user = auth()->user();

        if (!$song) {
            return redirect()->route('songs.index')->withErrors(['song' => 'Canzone non trovata.']);
        }
    
        if (!auth()->check() || !auth()->user()->artist || $song->artist_id !== auth()->user()->artist->id) {
            abort(403, 'Non sei autorizzato a modificare questa canzone.');
        }
    
        $request->validate([
            'title' => 'required|string|max:255',
            'lyrics' => 'required|string',
            'is_private' => 'required|boolean',
            'spotifylink' => 'nullable|url',
        ]);
    
        $spotifyId = null;
        if ($request->filled('spotifylink')) {
            preg_match('/track\/([a-zA-Z0-9]+)/', $request->spotifylink, $matches);
            $spotifyId = $matches[1] ?? null;
            if (!$spotifyId) {
                return back()->withErrors(['spotifylink' => 'URL Spotify non valido.']);
            }
        }

        
        $song->update([
            'title'       => $request->title,
            'lyrics'      => $request->lyrics,
            'is_private'  => (bool)$request->is_private,
            'spotifylink' => $spotifyId,
        ]);
    
        return redirect()->route('songs.index');
    }
    

    public function destroy($id)
    {
        $song = Song::find($id);

        if (!$song) {
            return redirect()->route('songs.index');
        }

        $song->delete();

        return redirect()->route('songs.index');
    }

    // public function create() {
    //     return Inertia::render('Songs/Create', [
    //         'auth' => auth()->user(),
    //         'artist' => auth()->user()?->artist,
    //     ]);
    // }

    public function create() {
        $user = auth()->user();
        $artist = $user ? $user->artist : null;
    
        return Inertia::render('Songs/Create', [
            'auth' => [
                'user' => $user,
                'artist' => $artist,
            ],
        ]);
    }
    


public function show($id)
{
    
    $song = Song::findOrFail($id);
    $song->load('artist');

    if ($song->is_private && $song->artist->user_id !== auth()->id()) {
        abort(403, 'Accesso non autorizzato.');
    }

    if ($song->audio) {
        $song->audio_url = asset('storage/audio/' . $song->audio); // Using asset() here
    }

    return Inertia::render('Songs/Show', [
        'auth' => [
            'user' => auth()->user(),
            'artist' => auth()->user() ? auth()->user()->artist : null, 
        ],
        'song' => $song,
        'artist' => $song->artist,
    ]);
}
}
