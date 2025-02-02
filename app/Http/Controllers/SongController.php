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
            'cover' => 'required|image',
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
            'cover' => $request->hasFile('cover') ? $request->file('cover')->store('covers') : null,
            'spotifylink' => $spotifyId,
        ]);

        return redirect()->route('songs.index');
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
            return redirect()->route('songs.index');
        }

        return Inertia::render('Songs/Edit', [
            'song' => $song,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'lyrics' => 'required|string',
            'is_private' => 'required|boolean',
            'cover' => 'nullable|image',
        ]);

        $song = Song::find($id);

        if (!$song) {
            return redirect()->route('songs.index');
        }

        $song->title = $request->input('title');
        $song->lyrics = $request->input('lyrics');
        $song->is_private = $request->input('is_private');

        if ($request->hasFile('cover')) {
            $song->cover = $request->file('cover')->store('covers');
        }

        $song->save();

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

    public function create()
    {
        return Inertia::render('Songs/Create');
    }

    public function show($id)
    {
        $song = Song::find($id);

        // if (!$song) {
        //     return redirect()->route('songs.index');
        // }

        return Inertia::render('Songs/Show', [
            'song' => $song,
        ]);
    }
}
