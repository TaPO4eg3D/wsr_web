<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Comment extends Model
{
    public function product() {
        $this->belongsTo('App\Product');
    }
}
