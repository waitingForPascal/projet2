<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteilles_user extends Model
{
    use HasFactory;
    protected $fillable = [
        'quantite'
    ];
}
