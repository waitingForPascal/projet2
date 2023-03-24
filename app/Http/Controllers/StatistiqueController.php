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
}
