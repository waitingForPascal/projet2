<?php

namespace App\Http\Controllers;

use App\Models\Bouteilles_cellier;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;


class cellierBouteilleController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    // il faut déplacer les deux fonctions
    public function index()
    {
        if(Auth::check()) {
            return view('accueil');
        }
        return view('auth.login');
    }

    public function logout()
    {
        Auth::logout();
        return view('auth.login');
    }

    public function accueil()
    {
        return view('accueil');
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
    //public function store(Request $request)
    public function store(Request $request)
    {



        $objBouteille = $request->json()->all();


         DB::table('bouteilles_celliers')->insert([
                 'date_achat'   => $objBouteille['data_achat'],
                 'quantite'     => $objBouteille['quantite'],
                 'bouteille_id' => $objBouteille['bouteilles_id'],
                 'cellier_id'   => $objBouteille['celliers_id'],
             ]);

            //return $objBouteille;


    }

   
    

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request,  $id)
    {
        
        DB::table('bouteilles_celliers')
        ->where('bouteille_id', $id)
        ->where('cellier_id', $request['id_cellier'])
        ->update([
            'quantite' => $request['quantite'],
            'date_achat' => $request['date_achat'],
        ]);
        
        return true;

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\cellierBouteille  $cellierBouteille
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        DB::table('bouteilles_celliers')->where('id', $id)->delete();
        return true;
    }








}
