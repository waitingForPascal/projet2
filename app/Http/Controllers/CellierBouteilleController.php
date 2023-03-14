<?php

namespace App\Http\Controllers;

use App\Models\Bouteilles_user;
use App\Models\BouteillesUser;
use Illuminate\Http\Request;

class cellierBouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //print_r($request);
        return $request;
        return response()->json($request);
        // $nouvcellierBouteille = Bouteilles_user::create([
        //     'bouteilles_id' => $request->bouteilles_id,
        //     'celliers_id'   => $request->celliers_id,
        //     'data_achat'    => $request->data_achat,
        //     'quantite'      => $request->quantite,
        // ]);

        // $nouvcellierBouteille = new Bouteilles_user;
        // $nouvcellierBouteille->fill($request->all());
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function show(cellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function edit(cellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, CellierBouteille $cellierBouteille)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function destroy(cellierBouteille $cellierBouteille)
    {
        //
    }
}
