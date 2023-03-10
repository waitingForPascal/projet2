<?php

namespace App\Http\Controllers;

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Type;
use Illuminate\Support\Facades\DB;


use Illuminate\Http\Request;

class BouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        $bouteilles = Bouteille::all();
        
        // return $bouteilles;

        return response()->json($bouteilles);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
        // return view('ajout');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function show(Bouteille $bouteille)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function edit(Bouteille $bouteille)
    {
        //
        
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Bouteille $bouteille, $id)
    {
        //
        $cellier = Cellier::find($id);
        $quantite =  $request['quantite'];
        

        // $cellier->update([
        //     'quantite' => '4'
        // ]);
        DB::table('celliers')->where('id', $id)->update([
            'quantite' => $quantite
        ]);


        $cellier = Cellier::find($id);
        return response()->json($cellier);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Bouteille  $bouteille
     * @return \Illuminate\Http\Response
     */
    public function destroy(Bouteille $bouteille)
    {
        //
    }

    public function getListeBouteilleCellier(Cellier $cellier)
    {
        $bouteilles = Bouteille::select('bouteilles.id','celliers.id as id_bouteille_cellier', 'celliers.id_bouteille','celliers.date_achat','celliers.garde_jusqua','celliers.notes','celliers.prix','celliers.quantite','celliers.millesime', 'bouteilles.nom', 'bouteilles.type', 'bouteilles.image', 'bouteilles.code_saq', 'bouteilles.url_saq', 'bouteilles.pays', 'bouteilles.description', 'types.type')
                ->join('celliers', 'celliers.id_bouteille', '=', 'bouteilles.id')
                ->join('types', 'types.id', '=', 'bouteilles.type')
                ->get();
        // return $query;
        return response()->json($bouteilles);
    }
}
