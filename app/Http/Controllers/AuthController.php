<?php

namespace App\Http\Controllers;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\LoginRequest;
use Illuminate\Http\Request;
use App\Models\User;
use Auth;
class AuthController extends Controller
{
   public function login(LoginRequest $request)
   {

       $data=$request->validated();
    //   return response()->json(['message' => 'API request reached the controller method'],422);
       if(!Auth::attempt($data)){
        return response([
        'message'=>'password or email is wrong',]);
       }

       $user = Auth::user();
    // return response()->json(['user' =>$user], 401);

       $token=$user->createToken('user-login')->plainTextToken;
    return response()->json([
        'user'=>$user,
        'token'=>$token,  
    ]);
   }
  
   public function register(RegisterRequest $request)
   {
    
     return response()->json(['message' => 'API request reached the controller method']);
   
    // dd($request);
    // Log::info('Register request received', $request->all());
    $data = $request->validated();
    $user=User::create([
        'name'=>$data['name'],
        'email'=>$data['email'],
        'password'=>bcrypt($data['password']),
    ]);
    $token=$user->createToken('main')->plainTextToken;
    return response()->json([
        'user'=>$user,
        'token'=>$token,  
    ]);
    return response(compact('user','token'));
   }
   public function logout(Request $request)
{
    // Get the authenticated user
    $userData = $request->input('user'); // Get user data from the request
        $user_id = $userData['id'] ?? null;
        // $user_id=$userData.id;

    // return response()->json(['user' =>$user], 401);
 
    if (!$user) {
        return response()->json(['error' => 'User is not authenticated'], 401);
    }

  
    $accessToken = $user->currentAccessToken();
    if ($accessToken) {
        $accessToken->delete();
    }

    return response()->json('', 204);
}    
   // Return 204 No Content status
}
