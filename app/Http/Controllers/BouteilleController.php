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
use DOMDocument;
use stdClass;

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
            $nouvelleBouteille->ganreliste = $request->ganreliste;


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


    public function bouteilleSAQ()
    {
        return view('BouteilleSAQ');
    }


    public function importerBouteillesSAQ(Request $request)
    {
        $page = $request['page'];
        $nombre = $request['nb'];

        $s = curl_init();
		$url = "https://www.saq.com/fr/produits/vin/vin-rouge?p=".$page."&product_list_limit=".$nombre."&product_list_order=name_asc";

        // Se prendre pour un navigateur pour berner le serveur de la saq...
        curl_setopt_array($s,array(
            CURLOPT_URL => $url,
            // CURLOPT_URL => "https://www.saq.com/fr/produits/vin/vin-rouge?p=3&product_list_limit=24&product_list_order=name_asc",
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_SSL_VERIFYPEER => false,
            CURLOPT_USERAGENT=>'Mozilla/5.0 (Windows NT 6.1; Win64; x64; rv:60.0) Gecko/20100101 Firefox/60.0',
            CURLOPT_ENCODING=>'gzip, deflate',
            CURLOPT_HTTPHEADER=>array(
                    'Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
                    'Accept-Language: en-US,en;q=0.5',
                    'Accept-Encoding: gzip, deflate',
                    'Connection: keep-alive',
                    'Upgrade-Insecure-Requests: 1',
            ),
        ));

		$_webpage = curl_exec($s);
		$_status = curl_getinfo($s, CURLINFO_HTTP_CODE);
		curl_close($s);
        // var_dump(self::$_webpage);
        // exit();
		$doc = new DOMDocument();
		$doc -> recover = true;
		$doc -> strictErrorChecking = false;
		@$doc -> loadHTML($_webpage);
		$elements = $doc -> getElementsByTagName("li");
		foreach ($elements as $key => $noeud) {
			// var_dump($noeud -> getAttribute('class')) ;
			if (strpos($noeud -> getAttribute('class'), "product-item") !== false) {

				// echo $this->get_inner_html($noeud);
				$info = self::recupereInfo($noeud);
                echo "<p>".$info->nom;
				$retour = $this -> ajouteProduit($info);
				echo "<br>Message de retour : " . $retour -> raison . "<br>";
				echo "</p>";
			}
		}

		return response()->json($retour);
    }

    private function get_inner_html($node) {
		$innerHTML = '';
		$children = $node -> childNodes;
		foreach ($children as $child) {
			$innerHTML .= $child -> ownerDocument -> saveXML($child);

		}
		return $innerHTML;
	}

	private function nettoyerEspace($chaine)
	{
		return preg_replace('/\s+/', ' ',$chaine);
	}

	private function recupereInfo($noeud) {

		$info = new stdClass();
		$info -> img = $noeud -> getElementsByTagName("img") -> item(0) -> getAttribute('src'); //TODO : Nettoyer le lien
		;
		$a_titre = $noeud -> getElementsByTagName("a") -> item(0);
		$info -> url = $a_titre->getAttribute('href');

        //var_dump($noeud -> getElementsByTagName("a")->item(1)->textContent);
        $nom = $noeud -> getElementsByTagName("a")->item(1)->textContent;
        //var_dump($a_titre);
		$info -> nom = self::nettoyerEspace(trim($nom));
		//var_dump($info -> nom);
		// Type, format et pays
		$aElements = $noeud -> getElementsByTagName("strong");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'product product-item-identity-format') {
				$info -> desc = new stdClass();
				$info -> desc -> texte = $node -> textContent;
				$info->desc->texte = self::nettoyerEspace($info->desc->texte);
				$aDesc = explode("|", $info->desc->texte); // Type, Format, Pays
				if (count ($aDesc) == 3) {

					$info -> desc -> type = trim($aDesc[0]);
					$info -> desc -> format = trim($aDesc[1]);
					$info -> desc -> pays = trim($aDesc[2]);
				}

				$info -> desc -> texte = trim($info -> desc -> texte);
			}
		}

		//Code SAQ
		$aElements = $noeud -> getElementsByTagName("div");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'saq-code') {
				if(preg_match("/\d+/", $node -> textContent, $aRes))
				{
					$info -> desc -> code_SAQ = trim($aRes[0]);
				}
			}
		}

		$aElements = $noeud -> getElementsByTagName("span");
		foreach ($aElements as $node) {
			if ($node -> getAttribute('class') == 'price') {
				$info -> prix = trim($node -> textContent);
			}
		}
		//var_dump($info);
		return $info;
	}

    // Ajouter des bouteilled dans la base de données
	private function ajouteProduit($bte) {
		$retour = new stdClass();
		$retour -> succes = false;
		$retour -> raison = '';

		// chercher bouteille dans le tableau Bouteille, s'il n'existe pas, l'ajoute; s'elle existe retourner message "duplication"
		$bouteille = Bouteille::where('nom', $bte->nom)->first();

		if(!$bouteille){

			// chercher id dans le table Type: s'il existe retourner son id, sonon, créer un nouveau ligne et retourner son id;
			$Type = Type::where('type', $bte -> desc -> type)->first();
			if (!$Type) {
				$Type = Type::create(['type' => $type]);
			}
			$typeId =  $Type->id;

			DB::table('bouteilles')->insert([
				'nom'   => $bte->nom,
				'image'     => $bte->img,
				'url_img'     => $bte->img,
				'url_saq' => $bte->url,
				'description'   => $bte -> desc -> texte,
				'format'   => $bte->desc -> format,
				'code_saq'   => $bte -> desc -> code_SAQ,
				'prix'   => $bte->prix,
				'pays'   => $bte->desc -> pays,
				'type'   => $typeId,
			]);
            $retour -> succes = true;
            $retour -> raison = "SUCCES";

		}else {
			$retour -> succes = false;
			$retour -> raison = "DUPLICATION";
		}
		return $retour;

	}
}
