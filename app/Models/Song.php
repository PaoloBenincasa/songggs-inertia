<?php

namespace App\Models;

use App\Models\Artist;
use Illuminate\Database\Eloquent\Model;

class Song extends Model
{
    protected $fillable = [
        'title',
        'lyrics',
        'artist_id',
        'is_private', 
        'spotifylink',
        'audio'
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class, 'artist_id');
    }

    public function isAccessibleBy(User $user)
{
    return $this->is_private == 0 || $this->artist_id == $user->id;
}
}