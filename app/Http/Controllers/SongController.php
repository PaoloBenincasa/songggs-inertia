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
            'title' => 'required|string',
            'lyrics' => 'required|string',
            'is_private' => 'required|in:0,1',
            'cover' => 'nullable|image',
            'spotifylink' => 'nullable|string',
        ]);

        $song = new Song();
        $song->title = $request->input('title');
        $song->lyrics = $request->input('lyrics');
        $song->is_private = (bool) $request->input('is_private');
        $song->cover = $request->hasFile('cover') ? $request->file('cover')->store('covers') : null;
        $song->artist_id = Auth::id();
        $song->spotifylink = $request->input('spotifylink');
        $song->save();

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
