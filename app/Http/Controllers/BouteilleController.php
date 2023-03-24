<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;

use App\Models\Cellier;
use App\Models\Bouteille;
use App\Models\Type;
use App\Models\Bouteilles_cellier;
use App\Models\SAQ;

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

    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function storeNl(Request $request)
    {
            $nouvelleBouteille = new Bouteille;

            $nouvelleBouteille->nom = $request->nom;
            $nouvelleBouteille->image = $request->image;
            $nouvelleBouteille->pays = $request->pays;
            $nouvelleBouteille->code_saq = $request->code_saq;
            $nouvelleBouteille->description = $request->description;
            $nouvelleBouteille->prix = $request->prix;
            $nouvelleBouteille->note = $request->note;
            $nouvelleBouteille->millesime = $request->millesime;
            $nouvelleBouteille->garde_jusqua = $request->garde_jusqua;
            $nouvelleBouteille->url_saq = $request->url_saq;
            $nouvelleBouteille->url_img = $request->url_img;
            $nouvelleBouteille->format = $request->format;
            $nouvelleBouteille->type = $request->type;
            $nouvelleBouteille->ganreListe = $request->ganreListe;


            $data = $nouvelleBouteille->toArray();
            $id = DB::table('bouteilles')->insertGetId($data);
            return $id;
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
    public function edit(Bouteille $bouteille, $id)
    {
        //
        // var_dump($id);
        // return view('test',['id' => $id]);

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
        $cellier = Bouteilles_cellier::find($id);
        $quantite =  $request['quantite'];
    
        DB::table('bouteilles_celliers')->where('id', $id)->update([
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

     

    public function modifierUnBouteille(Request $request, Cellier $cellier, $id)
    {
        
        if($request['type'] == 'Vin rouge') {
            $request['type'] = 1; 
        } elseif($request['type'] == 'Vin blanc') {
            $request['type'] = 2;
        }

        DB::table('bouteilles')->where('id', $id)->update([
            'nom' => $request['nom'],
            'pays' => $request['pays'],
            'prix' => $request['prix'],
            'type' => $request['type']
        ]);

        return response()->json($id);

    }










// just pour test
    public function data(Cellier $cellier, $id)
    {
        $bouteilles = Bouteilles_cellier::select('bouteilles_celliers.id','bouteilles.id as id_bouteilles', 'celliers.id as id_bouteille_cellier','bouteilles_celliers.bouteille_id','bouteilles_celliers.date_achat','bouteilles_celliers.quantite', 'bouteilles.nom', 'bouteilles.type', 'bouteilles.image', 'bouteilles.code_saq', 'bouteilles.url_saq', 'bouteilles.pays', 'bouteilles.description', 'types.type','users.id as user_Id')
        ->join('bouteilles', 'bouteilles.id', '=', 'bouteilles_celliers.bouteille_id')
        ->join('celliers', 'celliers.id', '=', 'bouteilles_celliers.cellier_id')
        ->join('types', 'types.id', '=', 'bouteilles.type')
        ->join('users', 'users.id', '=', 'celliers.user_id')
        ->get();

    

       
       
        return response()->json($id);

        
    }


    // public function importerBouteilles()
    // {
        // $page = 1;
        // $nombreProduit = 48; //48 ou 96	
        
        // $saq = SAQ::getProduits();
        // return $saq;
        // for($i=0; $i<2;$i++)	//permet d'importer séquentiellement plusieurs pages.
        // {
        //     echo "<h2>page ". ($page+$i)."</h2>";
        //     $nombre = $saq->getProduits($nombreProduit,$page+$i);
        //     echo "importation : ". $nombre. "<br>";
        
        // }
    // }
}
