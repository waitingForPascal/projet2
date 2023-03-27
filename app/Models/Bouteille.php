<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'image',
        'pays',
        'code_saq',
        'description',
        'prix',
        'note',
        'millesime',
        'garde_jusqua',
        'url_saq',
        'url_img',
        'format',
        'type',
        'prix',
        'genreListe'
    ];
}


