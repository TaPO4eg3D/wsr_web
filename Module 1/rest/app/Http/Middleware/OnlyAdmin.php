<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Response;

class OnlyAdmin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        $user = Auth::guard('api')->user();
        if($user->role != true){
            return response()->json([
                'status' => false,
                'message' => 'You dont have permissions'
            ])->setStatusCode(401, 'Only for admins');
        }
        return $next($request);
    }
}
