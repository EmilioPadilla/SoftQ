<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Post;
class PostController extends Controller
{
    public function get(){
        return Post::get();
    }
    public function delete($id){
        return response()->json(Post::destroy($id));
        
    }
    public function put(Request $request, $id){
        $post=  Post::get($id);
        

    }
    public function post(Request $request){
        $post=new Post();
        
    }

}
