<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;

class UserController extends Controller
{
    //
    function register(Request $req){
        
        $user = new Account;
        $user->name = $req->name;
        $user->email = $req->email;
        $user->mobile = $req->mobile;
        $user->dob = $req->dob;

        $user->save();

        return response()->json('New user created successfully!');
    }

    function getAllUsers(){
        $users = Account::all();

        return response()->json($users);
    }

    function updateUser(Request $req){

        $userId = $req->id;
        $user = Account::find($userId);
        
        $user->name = $req->name;
        $user->email = $req->email;
        $user->mobile = $req->mobile;
        $user->dob = $req->dob;

        $user->save();

        return response()->json("User of id {$userId} is updated successfully!");
    }

    function deleteUser(Request $req){
        $userId = $req->id;
        $user = Account::find($userId);
        $user->delete();

        return response()->json("User of id {$userId} is deleted successfully!");
    }

    function getUser(Request $req){
        $userId = $req->id;
        $user = Account::find($userId);
        return response()->json($user);
    }
}
