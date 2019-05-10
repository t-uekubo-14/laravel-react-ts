<?php

namespace App\Http\Controllers\Api;

use App\Talk;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class TalkController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {

        // Talk
        //     ::join('users', function ($join) {
        //         $join->on('users.id', '=', 'talks.contributer_id')
        //             ->where('contacts.user_id', '>', 5);
        //     })
        //     ->get();

        return Talk::join('users', 'users.id', '=', 'talks.contributer_id')
            ->select('talks.*', 'users.name as contributer_name')
            ->orderBy('talks.created_at', 'desc')->get();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $talk = new Talk;
        $talk->message = empty($request->message) ? 'null' : $request->message;
        $talk->contributer_id = 0; //$request->contributer;
        $talk->save();

        return $this->index();
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Talk  $talk
     * @return \Illuminate\Http\Response
     */
    public function show(Talk $talk)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Talk  $talk
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Talk $talk)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Talk  $talk
     * @return \Illuminate\Http\Response
     */
    public function destroy(Talk $talk)
    {
        $talk->delete();

        return $this->index();
    }
}
