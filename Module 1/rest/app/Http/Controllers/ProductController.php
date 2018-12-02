<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Validator;

// Models
use App\Product;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'title' => 'required|unique:products,title',
            'firm' => 'required|string',
            'text' => 'required|string',
            'image' => 'required|file|image|mimes:jpg,png|max:3072'
        ]);

        if($validation->fails()){
            return response()->json([
                'status' => 'false',
                'message' => $validation->errors()
            ])->setStatusCode(400, "Creating error");
        }

        $image = $request->image->store('transport_images', 'api');
        $product = Product::create([
            'title' => $request->title,
            'firm' => $request->firm,
            'text' => $request->text,
            'image' => 'storage/api/' . $image
        ]);
        return response()->json([
            'status' => true,
            'article_id' => $product->id
        ])->setStatusCode(201, 'Successful creation');
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
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = Product::where('id', $id)->first();

        if(!$product){
            return response()->json([
                'status' => 'false',
                'message' => 'Product not found'
            ])->setStatusCode(400, "Product not found");
        }

        $validation = Validator::make($request->all(), [
            'title' => 'unique:products,title,' . $product->id,
            'firm' => 'string',
            'text' => 'string',
            'image' => 'file|image|mimes:jpg,png|max:3072'
        ]);

        if($validation->fails()){
            return response()->json([
                'status' => 'false',
                'message' => $validation->errors()
            ])->setStatusCode(400, "Editing error");
        }

        $image = null;
        if($request->image){
            $image = $request->image->store('transport_images', 'api');
        }

        $product->update([
            'title' => $request->title ? $request->title : $product->title,
            'firm' => $request->firm ? $request->firm : $product->firm,
            'text' => $request->text ? $request->text : $product->text,
            'image' => $image ? 'storage/api/' . $image : $product->image
        ]);

        return response()->json([
            'status' => true,
            'post' => [
                'title' => $product->title,
                'datetime' => $product->updated_at->format('H:i d.m.Y'),
                'firm' => $product->firm,
                'text' => $product->text,
                'tags' => $product->tags,
                'image' => $product->image
            ]
        ])->setStatusCode(201, 'Successful creation');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
