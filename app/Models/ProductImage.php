<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProductImage extends Model
{
    protected $fillable = [
        'product_information_id', // foreign key
        'image_path',              // path or URL to the image
    ];

    // Relationship to ProductInformation
    public function product()
    {
        return $this->belongsTo(ProductInformation::class, 'product_information_id');
    }
}
