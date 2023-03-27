<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Bouteilles_cellier extends Model
{
    use HasFactory;
    protected $fillable = [
        'date_achat',
        'quantite',
        'bouteille_id',
        'cellier_id'
    ];
}
