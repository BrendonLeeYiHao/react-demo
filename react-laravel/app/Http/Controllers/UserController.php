<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Account;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    //
    function register(Request $req){
        $user = new Account;
        $user->name = $req->name;
        $user->password = Hash::make($req->password);
        $user->role = "Member";
        $user->email = $req->email;
        $user->mobile = $req->mobile;
        $user->dob = $req->dob;

        $uploadedFile = $req->file('file');
        //can use either one
        $fileName = $uploadedFile->getClientOriginalName();
        $user->file = $fileName;
        // $fileName = $_FILES['file']['name'];
        $sourcePath = $_FILES['file']['tmp_name'];
        // $tmpName = $uploadedFile->getRealPath();
        
        $filePath = "C:\\Users\\Acer\\react-demo\\src\\assets\\image" . "\\" . $fileName;
        move_uploaded_file($sourcePath, $filePath);
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

        // $filePath = "C:\\Users\\Acer\\react-demo\\src\\assets\\image" . "\\" . $user->file;

        // unlink($filePath);

        return response()->json("User of id {$userId} is deleted successfully!");
    }


    function deleteImage(Request $req){
        $filePath = "C:\\Users\\Acer\\react-demo\\src\\assets\\image" . "\\" . $req->file;

        unlink($filePath);

        return response()->json("{$req->file} is removed!");
    }

    function getUser(Request $req){
        $userId = $req->id;
        $user = Account::find($userId);
        return response()->json($user);
    }

    function login(Request $req){
        $credentials = $req->only('name','password');

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $role = $user->role;
            return response()->json($role);
        }
        else{
            return response()->json('False');
        }
    }
}
