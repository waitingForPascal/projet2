<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    // le nombre d'usager
    public function nombreUsager()
    {
        $count = DB::table('users')->count();

        return response()->json($count);
    }

    // le nombre de cellier
    public function nombreCellier()
    {
        $count = DB::table('celliers')->count();

        return response()->json($count);
    }

    //  le nombre de cellier par usager
    public function nombreCellierUsager()
    {
        $cellierUsager = DB::table('celliers')
        ->select('user_id', DB::raw('COUNT(*) as nombreCellierUsager'))
        ->groupBy('user_id')
        ->get();

        return response()->json($cellierUsager);
    }

     //  le nombre de bouteille par cellier
     public function nombreBouteilleCellier()
     {
        $nombre = DB::table('bouteilles_celliers')
        ->select('cellier_id', DB::raw('SUM(quantite) as total_quantite'))
        ->groupBy('cellier_id')
        ->get();

 
         return response()->json($nombre);
     }

    //  le nombre de bouteille par usager.
    public function nombreBouteilleUsager()
    {
        $nombre = DB::table('bouteilles_celliers')
            ->join('celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
            ->join('users', 'users.id', '=', 'celliers.user_id')
            ->select('users.id', DB::raw('SUM(quantite) as total_quantite'))
            ->groupBy('users.id')
            ->get();


        return response()->json($nombre);
    }



    //  la valeur total des bouteilles
    public function valeurTous()
    {
        $total = DB::table('bouteilles')
                ->join('bouteilles_celliers', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
                ->sum(DB::raw('prix * quantite'));

        return response()->json($total);
    }

    //  la valeur total des bouteilles par usager
    public function valeurUsager()
    {
        $total = DB::table('bouteilles')
        ->join('bouteilles_celliers', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
        ->join('celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
        ->join('users', 'users.id', '=', 'celliers.user_id')
        ->select('users.id as user_id', DB::raw('SUM(prix * quantite) as total_prix'))
        ->groupBy('users.id')
        ->get();

        return response()->json($total);
    }

    //  la valeur total des bouteilles par cellier
    public function valeurCellier()
    {
        $total = DB::table('bouteilles')
                 ->join('bouteilles_celliers', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
                 ->join('celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
                 ->select('celliers.id as cellier_id', DB::raw('SUM(prix * quantite) as total_prix'))
                 ->groupBy('celliers.id')
                 ->get();

        return response()->json($total);
    }
}
