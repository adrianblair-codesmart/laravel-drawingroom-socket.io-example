<?php

namespace App\Http\Controllers;

use App\Events\SendMessage;
use Illuminate\Http\Request;

class MessageController extends Controller {

    public function SendMessage(Request $request) {
        
        $properties = $request->input('properties');
        //broadcast(new MessageSent($user, $chatroom, $message))->toOthers();
        broadcast(new SendMessage($request->input('properties')))->toOthers();

        return [
            'status' => 'Message Sent!'
        ];
    }

}
