<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BouteilleController ;
use App\Http\Controllers\CellierController ;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\CellierBouteilleController ;
use App\Http\Controllers\UserController ;
use App\Http\Controllers\SAQController ;
use App\Http\Controllers\StatistiqueController ;
/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/
Auth::routes();
// ------------------------------test
Route::get('/aaa', [BouteilleController::class, 'modifierUnBouteille']);

Route::get('test', function () {
    return view('test');
});
// ------------------------------test


// --------------------------------peut être utile à l'avenir
// récupérer tous les bouteilles
Route::get('/getListeBouteilleCellier', [BouteilleController::class, 'getListeBouteilleCellier']);

// modificaiton la quantité de bouteille dans un cellier
Route::patch('/bouteille/{id}', [BouteilleController::class, 'update']);
// --------------------------------peut être utile à l'avenir end



Route::get('/ajout', function () {
    return view('ajout');
});

Route::get('/statistique', function () {
    return view('statistique');
});

Route::get('/', [CellierBouteilleController::class, 'index']);
Route::get('/home', [CellierBouteilleController::class, 'accueil'])->middleware('auth');
Route::get('/accueil', [CellierBouteilleController::class, 'index'])->name('accueil');
Route::get('/logout', [CellierBouteilleController::class, 'logout'])->name('logout');

// -----------------------------------------------------------------------------celliers
// récupérer tous les celliers ou les celliers personnels
Route::get('/getTousCelliers', [CellierController::class, 'index']);
// modificaiton de cellier
Route::patch('/modCellier/{id}', [CellierController::class, 'update']);
// ajout de cellier
Route::post('/ajouteCellier' , [CellierController::class, 'store']);
// Supprimer un cellier
Route::delete('/deleteCellier/{id}' , [CellierController::class, 'destroy']);

// récupérer les bouteilles dans le cellier spécial
Route::get('/getCeillerBouteille/{id}', [CellierController::class, 'getListeBouteilleCellier']);
// entrer dans un cellier précis
Route::get('/cellier/{id}', function () {return view('cellier');});

// ----------------------------------------------------------------------------------usager
// vérifier si utilisateur est admin
Route::get('/verificationUser', [UserController::class, 'index']);
// aller vers page de gestion d'utilisateur
Route::get('/listeUsager', [UserController::class, 'gestionUsager']);
// récupérer tous les usagers
Route::get('/getTousUser', [UserController::class, 'getTousUser']);
// modificaiton d'usager
Route::patch('/modUser/{id}', [UserController::class, 'update']);
// Supprimer un usager
Route::delete('/deleteUser/{id}' , [UserController::class, 'destroy']);
//modification bouteille
Route::patch('/modBoutielle/{id}', [CellierBouteilleController::class, 'update']);


// ------------------------------------------------------------------------------Statistique
// le nombre d'usager
Route::get('/getNombreUsager', [StatistiqueController::class, 'nombreUsager']);
// le nombre de cellier
Route::get('/getNombreCellier', [StatistiqueController::class, 'nombreCellier']);
//  le nombre de cellier par usager
Route::get('/getNombreCellierUsager', [StatistiqueController::class, 'nombreCellierUsager']);
//  le nombre de bouteille par cellier
Route::get('/getNombreBouteilleCellier', [StatistiqueController::class, 'nombreBouteilleCellier']);
//  le nombre de bouteille par usager.
Route::get('/getNombreBouteilleUsager', [StatistiqueController::class, 'nombreBouteilleUsager']);
//  la valeur total des bouteilles
Route::get('/getValeurTous', [StatistiqueController::class, 'valeurTous']);
//  la valeur total des bouteilles par cellier
Route::get('/getValeurUsager', [StatistiqueController::class, 'valeurUsager']);
//  la valeur total des bouteilles par usager
Route::get('/getValeurCellier', [StatistiqueController::class, 'valeurCellier']);


Route::patch('/modiffBouteilleCellier/{id}' , [CellierBouteilleController::class, 'modiffier']);

Route::delete('/deleteBouteilleCellier/{id}' , [CellierBouteilleController::class, 'destroy']);


Route::patch('/modBouteille/{id}', [BouteilleController::class, 'modifierUnBouteille']);

Route::get('/getBouteillesSAQ', [BouteilleController::class, 'index']);
Route::post('/ajouteBouteilleCellier' , [CellierBouteilleController::class, 'store']);
Route::patch('/ajouteBouteilleCellierPatch/{id}' , [CellierBouteilleController::class, 'update']);
// Route::get('/cellier', function () {return view('cellier');})->name('mesCellier');

Route::get('/getCelliersUsager/{user_id}', [CellierController::class, 'cellierUsager']);
Route::get('/getCellier/{cellier_id}', [CellierController::class, 'cellierParId']);

Route::post('/voirCellier', [CellierController::class, 'voir']);

Route::get('/bouteille', [SAQController::class, 'index']);
Route::post('/ajouteBouteilleNl' , [BouteilleController::class, 'storeNl']);

//importer des bouteilles du SAQ
Route::get('/importerBouteille', [BouteilleController::class, 'importerBouteillesSAQ']);

// Aller dans la page pour importer des bouteilles de SAQ
// Route::get('/bouteilleSAQ', [BouteilleController::class, 'bouteilleSAQ']);
// Importer des bouteilles de SAQ
// Route::post('/bouteilleSAQ', [BouteilleController::class, 'importerBouteillesSAQ']);

