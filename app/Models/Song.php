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
        'is_private', // aggiungiamo la proprietà is_private
        'cover', // aggiungiamo la proprietà cover
    ];

    public function artist()
    {
        return $this->belongsTo(Artist::class);
    }
}