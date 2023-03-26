<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteille extends Model
{
    use HasFactory;

    protected $fillable = [
        'nom',
        'pays',
        'type',
        'url_saq',
        'prix',
        'format',
        'code_saq',
        'image',
        'prix',
        'description',

    ];
}
