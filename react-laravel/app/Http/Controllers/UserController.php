<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class UserController extends Controller
{
    //
    function register(Request $req){
        
        $user = new Account;
        $user->name = $req->input('name');
        $user->email = $req->input('email');
        $user->mobile = $req->input('mobile');
        $user->save();

        return response()->json('New user created successfully!');
    }

    function getAllUsers(){
        $users = Account::all();

        return response()->json($users);
    }

    function updateUser(Request $req){
        $name = $req->input('name');
        $email = $req->input('email');
        $mobile = $req->input('mobile');

        $userId = $req->input('id');
        $user = Account::find($userId);


        $user->name = $name;
        $user->email = $email;
        $user->mobile = $mobile;

        $user->save();

        return response()->json("User of id {$userId} is updated successfully!");
    }

    function deleteUser(Request $req){
        $userId = $req->input('id');
        $user = Account::find($userId);
        $user->delete();

        return response()->json("User of id {$userId} is deleted successfully!");
    }

    function getUser(Request $req){
        $userId = $req->input('id');
        $user = Account::find($userId);
        return response()->json($user);
    }
}
