<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{

    protected $fillable = ['title', 'firm', 'text', 'tags', 'image'];

    public function comments(){
        $this->hasMany('App\Comment');
    }
}
