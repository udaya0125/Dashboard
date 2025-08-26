<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class ProductInformation extends Model
{
    protected $fillable = [
        'clothes_name',
        'actual_price',
        'discount_price',
        'category',
        'description',
        'short_description',
        'slug'
    ];

    public function images()
    {
        return $this->hasMany(ProductImage::class, 'product_information_id');
    }

    protected static function boot()
    {
        parent::boot();

        // Before creating, generate a temporary slug from clothes_name
        static::creating(function ($product) {
            $product->slug = Str::slug($product->clothes_name);
        });

        // After created, append ID to make it unique
        static::created(function ($product) {
            $product->slug = Str::slug($product->clothes_name) . '-' . $product->id;
            $product->saveQuietly(); // Prevents triggering events again
        });

        // Before updating, regenerate slug if clothes_name changes
        static::updating(function ($product) {
            if ($product->isDirty('clothes_name')) {
                $product->slug = Str::slug($product->clothes_name) . '-' . $product->id;
            }
        });
    }
}
