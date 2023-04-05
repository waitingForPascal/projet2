<?php

namespace App\Http\Controllers;
use App\Models\User;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class StatistiqueController extends Controller
{
    // le nombre d'usager
    public function nombreUsager()
    {
        // ne pas inclure admin
        $count = DB::table('users')->count() - 1;

        return response()->json($count);
    }

    // le nombre de cellier
    public function nombreCellier()
    {
        // $count = DB::table('celliers')->count();

        $count = DB::table('celliers')
        ->join('users', 'celliers.user_id', '=', 'users.id')
        ->whereColumn('celliers.user_id', '=', 'users.id')
        ->count();
       

        return response()->json($count);
    }

    //  le nombre de cellier par usager
    //  le nombre de cellier pour l'usager existe.
    public function nombreCellierUsager()
    {
        
        $cellierUsager = DB::table('celliers')
        ->join('users', 'celliers.user_id', '=', 'users.id')
        ->select('celliers.user_id', DB::raw('COUNT(*) as nombreCellierUsager'))
        // le nombre de cellier pour l'usager existe.
        ->whereNotNull('users.id')
        ->groupBy('celliers.user_id')
        ->get();

        return response()->json($cellierUsager);
    }

     //  le nombre de bouteille par cellier
     public function nombreBouteilleCellier()
     {
        $nombre = DB::table('celliers')
            ->leftJoin('bouteilles_celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
            ->leftJoin('users', 'celliers.user_id', '=', 'users.id')
            ->select('celliers.id', 'celliers.nom', DB::raw('IFNULL(SUM(bouteilles_celliers.quantite), null) as total_quantite'))
            ->whereColumn('celliers.user_id', '=', 'users.id')
            ->orWhereNull('users.id')
            ->groupBy('celliers.id', 'celliers.nom')
            ->get();
 
         return response()->json($nombre);
     }

    //  le nombre de bouteille par usager.
    public function nombreBouteilleUsager()
    {
        $nombre = DB::table('users')
            ->leftJoin('celliers', 'celliers.user_id', '=', 'users.id')
            ->leftJoin('bouteilles_celliers', function($join){
                $join->on('bouteilles_celliers.cellier_id', '=', 'celliers.id')
                    ->on('users.id', '=', 'celliers.user_id');
            })
            ->join('bouteilles', 'bouteilles_celliers.bouteille_id', '=', 'bouteilles.id')
            ->where('users.privilege', '<>', 'admin')
            ->whereNotNull('bouteilles.id')
            ->select('users.id', DB::raw('IFNULL(SUM(bouteilles_celliers.quantite), null) as total_quantite'))
            ->groupBy('users.id')
            ->orderBy('users.id')
            ->get();
        return response()->json($nombre);
    }



    //  la valeur total des bouteilles
    public function valeurTous()
    {
        $total = DB::table('bouteilles')
            ->join('bouteilles_celliers', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
            ->join('celliers', 'bouteilles_celliers.cellier_id', '=', 'celliers.id')
            ->whereColumn('bouteilles_celliers.cellier_id', '=', 'celliers.id')
            ->sum(DB::raw('prix * quantite'));
        return response()->json($total);
    }

    //  la valeur total des bouteilles par usager
    public function valeurUsager()
    {
        $total = DB::table('users')
        ->leftJoin('celliers', 'users.id', '=', 'celliers.user_id')
        ->leftJoin('bouteilles_celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
        ->leftJoin('bouteilles', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
        ->where('users.privilege', '<>', 'admin')
        ->select('users.id as user_id', DB::raw('IFNULL(SUM(prix * quantite), null) as total_prix'))
        ->groupBy('users.id')
        ->orderBy('users.id')
        ->get();

        return response()->json($total);
    }

    //  la valeur total des bouteilles par cellier
    public function valeurCellier()
    {
        $total = DB::table('celliers')
            ->leftJoin('bouteilles_celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
            ->leftJoin('bouteilles', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
            ->select('celliers.id as cellier_id', 'celliers.nom', DB::raw('IFNULL(SUM(prix * quantite), null) as total_prix'))
            ->groupBy('celliers.id','celliers.nom')
            ->get();
        return response()->json($total);
    }
}
