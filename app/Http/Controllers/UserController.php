<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;


use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
        return response()->json(Auth::user()->privilege);
    }
    
    public function gestionUsager()
    {
        //
        return view('listeUsager');
    }

    public function getTousUser()
    {
        //
        // $users = User::all();
        // $users = User::orderBy('id')->get();

        // privilege != 'admin'
        $users = User::where('privilege', '<>', 'admin')
            ->orderBy('id')
            ->get();
        return response()->json($users);
        
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
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, User $user, $id)
    {
        //
        DB::table('users')->where('id', $id)->update([
            'name' => $request['name']
        ]);

        return true;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\User  $user
     * @return \Illuminate\Http\Response
     */
    public function destroy(User $user, $id)
    {
        //
        DB::table('users')->where('id', $id)->delete();
        return true;
    }
}
