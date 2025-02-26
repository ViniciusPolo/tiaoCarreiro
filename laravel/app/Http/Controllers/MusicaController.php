<?php

namespace App\Http\Controllers;

use App\Models\Musica;
use Illuminate\Http\Request;

class MusicaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $musicas = Musica::all();
        return $musicas;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'visualizacoes' => 'integer|min:0',
            'youtube_id' => 'required|string|max:255',
            'thumb' => 'nullable|string',
        ]);

        $musica = Musica::create($request->all());

        return response()->json($musica, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Musica $musica)
    {
        return response()->json($musica);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Musica $musica)
    {
        $request->validate([
            'titulo' => 'string|max:255',
            'visualizacoes' => 'integer|min:0',
            'youtube_id' => 'string|max:255',
            'thumb' => 'nullable|string',
        ]);

        $musica->update($request->all());

        return response()->json($musica);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Musica $musica)
    {
        $musica->delete();
        return response()->json(['message' => 'Música deletada com sucesso'], 200);
    }
}
