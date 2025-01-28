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
    $artist->avatar = $request->file('avatar')->store('avatars');
    $artist->bio = $request->input('bio');
    $artist->user_id = auth()->id(); // impostare il valore di user_id
    $artist->save();

    return redirect()->route('artists.index');
}

    public function show($artist)
{
    $artist = Artist::find($artist);
    return Inertia::render('Artists/Show', ['artist' => $artist]);
}

    public function edit(Artist $artist)
    {
        return view('artists.edit', ['artist' => $artist]);
    }

    public function update(Request $request, Artist $artist)
    {
        $artist->stage_name = $request->input('stage_name');
        $artist->bio = $request->input('bio');
        if ($request->hasFile('avatar')) {
            $artist->avatar = $request->file('avatar')->store('avatars');
        }
        $artist->save();

        return redirect()->route('artists.show', $artist);
    }

    public function destroy(Artist $artist)
    {
        $artist->delete();
        return redirect()->route('artists.index');
    }
}