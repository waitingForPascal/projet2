<?php

namespace App\Http\Controllers;

use App\Models\SAQ;
use Illuminate\Http\Request;
use DOMDocument;

class SAQController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        // phpinfo();
        // $page = 1;
        // $nombreProduit = 48; //48 ou 96	
        
        $saq = new SAQ;
        echo $saq->getProduits();
        // return $saq;
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\SAQ  $sAQ
     * @return \Illuminate\Http\Response
     */
    public function show(SAQ $sAQ)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\SAQ  $sAQ
     * @return \Illuminate\Http\Response
     */
    public function edit(SAQ $sAQ)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\SAQ  $sAQ
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, SAQ $sAQ)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\SAQ  $sAQ
     * @return \Illuminate\Http\Response
     */
    public function destroy(SAQ $sAQ)
    {
        //
    }
}
