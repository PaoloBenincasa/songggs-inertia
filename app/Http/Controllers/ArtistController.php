<?php

namespace App\Http\Controllers;

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

    public function store(Request $request)
{
    $artist = new Artist();
    $artist->stage_name = $request->input('stage_name');
    // $artist->avatar = $request->file('avatar')->store('avatars');
    $artist->avatar = $request->file('avatar')->store('avatars', 'public');

    $artist->bio = $request->input('bio');
    $artist->user_id = auth()->id(); // impostare il valore di user_id
    $artist->save();

    return redirect()->route('artists.index');
}

public function show(Artist $artist)
{
    return Inertia::render('Artists/Show', ['artist' => $artist]);
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
        $artist->delete();
        return redirect()->route('artists.index');
    }

}