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
        $request->validate([
            'title' => 'required|string|max:255',
            'lyrics' => 'required|string',
            'is_private' => 'required|in:0,1',
            'spotifylink' => 'nullable|url',
        ]);
    
        // Estrarre l'ID della traccia da Spotify URL (se presente)
        $spotifyId = null;
        if ($request->filled('spotifylink')) {
            preg_match('/track\/([a-zA-Z0-9]+)/', $request->spotifylink, $matches);
            $spotifyId = $matches[1] ?? null;
    
            if (!$spotifyId) {
                return back()->withErrors(['spotifylink' => 'URL Spotify non valido.']);
            }
        }
    
        // Ottenere l'artista dell'utente autenticato
        $artist = auth()->user()->artist;
        if (!$artist) {
            return back()->withErrors(['artist' => 'Devi avere un artista associato per aggiungere una canzone.']);
        }
    
        // Creare e salvare la canzone
        $song = $artist->songs()->create([
            'title' => $request->title,
            'lyrics' => $request->lyrics,
            'is_private' => (bool) $request->is_private,
            'spotifylink' => $spotifyId,
        ]);

        return redirect()->route('artists.show', ['artist' => $artist->id]);
    }
 


    public function index()
    {
        $songs = Song::where('artist_id', Auth::id())->get();

        return Inertia::render('Songs/Index', [
            'songs' => $songs,
        ]);
    }

    public function edit($id)
    {
        $song = Song::find($id);
    
        if (!$song) {
            return redirect()->route('songs.index')->withErrors(['song' => 'Canzone non trovata.']);
        }
    
        // Assicurati che l'utente autenticato abbia un artista associato e che questo sia il proprietario della canzone
        if (!auth()->check() || !auth()->user()->artist || $song->artist_id !== auth()->user()->artist->id) {
            abort(403, 'Non sei autorizzato a modificare questa canzone.');
        }
    
        return Inertia::render('Songs/Edit', [
            'song' => $song,
        ]);
    }
    
    

    public function update(Request $request, $id)
    {
        $song = Song::find($id);
    
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
    
        // Estrai lo Spotify ID se presente
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

    public function create() {
        return Inertia::render('Songs/Create', [
            'auth' => auth()->user(),
            'artist' => auth()->user() ? auth()->user()->artist : null,
        ]);
    }
    
    public function show($id)
    {
        $song = Song::find($id);
        $song->load('artist');
        // if (!$song) {
        //     return redirect()->route('songs.index');
        // }
        return Inertia::render('Songs/Show', [
            'auth' => [
                            'user' => auth()->user(),
                            'artist' => auth()->user()->artist, 
                        ],
            'song' => $song,
            'artist' => $song->artist
        ]);
    }
}
