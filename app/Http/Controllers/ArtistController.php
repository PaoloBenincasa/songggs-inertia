<?php

namespace App\Http\Controllers;

use App\Models\Song;
use Inertia\Inertia;
use App\Models\Artist;
use Illuminate\Http\Request;

class ArtistController extends Controller
{
    public function index()
    {
        $artists = Artist::all();
        return Inertia::render('Artists/All', ['artists' => $artists]);
    }

    public function create()
    {
        return view('artists.create');
    }

//     public function store(Request $request)
// {
//     $artist = new Artist();
//     $artist->stage_name = $request->input('stage_name');
//     // $artist->avatar = $request->file('avatar')->store('avatars');
//     $artist->avatar = $request->file('avatar')->store('avatars', 'public');

//     $artist->bio = $request->input('bio');
//     $artist->user_id = auth()->id(); // impostare il valore di user_id
//     $artist->save();

//     return redirect()->route('artists.index');
// }

public function store(Request $request)
{
    $validatedData = $request->validate([
        'stage_name' => 'required|string|max:255',
        'bio' => 'required|string',
        'avatar' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
    ]);

    if ($request->hasFile('avatar')) {
        $avatarPath = $request->file('avatar')->store('avatars', 'public');
        $validatedData['avatar'] = $avatarPath;
    }

    $artist = new Artist();
    $artist->stage_name = $validatedData['stage_name'];
    $artist->bio = $validatedData['bio'];
    $artist->user_id = auth()->id(); // Imposta l'ID dell'utente autenticato
    
    if (isset($validatedData['avatar'])) {
        $artist->avatar = $validatedData['avatar'];
    }
    
    $artist->save();

    return redirect()->route('artists.index')->with('success', 'Artista creato con successo');
}


// public function show(Artist $artist)
// {
//     $artist->load('songs');
//     $user = auth()->user();
        
//     if (!$user->artist) {
//         return Inertia::render('Profile/Mycatalog', [
//             'songs' => [],
//             'message' => 'Non hai ancora caricato nessuna canzone.',
//         ]);
//     }
    
//     $songs = Song::where('artist_id', $user->artist->id)->get();

//     return Inertia::render('Artists/Show', [
//         'artist' => $artist,
//         'songs' => [],
//         'message' => 'Non hai ancora caricato nessuna canzone.',
//     ]);
// }

public function show(Artist $artist)
{
    // Carica le canzoni associate all'artista
    $artist->load('songs');

    return Inertia::render('Artists/Show', [
        'artist' => $artist,
        'songs' => $artist->songs, // Ora passa effettivamente le canzoni
    ]);
}


public function edit(Artist $artist)
{
    return Inertia::render('Artists/ArtistEdit', [
        'artist' => $artist
    ]);
}




public function update(Request $request, Artist $artist)
{
    // Verifica che l'artista appartenga all'utente autenticato
    if ($artist->user_id !== auth()->id()) {
        abort(403, 'Non autorizzato');
    }

    // Aggiorna i campi dell'artista
    $artist->update([
        'stage_name' => $request->input('stage_name'),
        'bio' => $request->input('bio'),
    ]);

    // Aggiorna l'avatar solo se è stato fornito un nuovo file
    if ($request->hasFile('avatar')) {
        $artist->avatar = $request->file('avatar')->store('avatars', 'public');
        $artist->save();
    }

    return redirect()->route('artists.show', $artist);
}



public function destroy(Artist $artist)
{
    // Verifica che l'artista appartenga all'utente autenticato
    if ($artist->user_id !== auth()->id()) {
        abort(403, 'Non sei autorizzato a eliminare questo artista.');
    }

    $artist->delete();

    return redirect()->route('artists.index');
}

}