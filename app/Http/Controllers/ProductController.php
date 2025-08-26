<?php

namespace App\Http\Controllers;

use App\Models\ProductInformation;
use App\Models\ProductImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{
    public function index()
    {
        $products = ProductInformation::with('images')->get();
        return response()->json($products);
    }

    public function store(Request $request)
{
    Log::info($request->all());
    
    $request->validate([
        'clothes_name' => 'required|string|max:255',
        'actual_price' => 'required|numeric',
        'discount_price' => 'nullable|numeric',
        'category' => 'nullable|string',
        'description' => 'nullable|string',
        'short_description' => 'nullable|string',
        'image' => 'nullable|image|mimes:jpg,jpeg,png,gif|max:2048', // for single image
        'images' => 'nullable|array', // for multiple images
        'images.*' => 'image|mimes:jpg,jpeg,png,gif|max:2048',
    ]);

    // Create product
    $product = ProductInformation::create($request->only([
        'clothes_name',
        'actual_price',
        'discount_price',
        'category',
        'description',
        'short_description'
    ]));

    // Handle image uploads
    $uploadedFiles = [];
    
    // Check for multiple images first
    if ($request->hasFile('images')) {
        $uploadedFiles = $request->file('images');
    }
    // Fallback to single image
    elseif ($request->hasFile('image')) {
        $uploadedFiles = [$request->file('image')];
    }

    // Process uploaded files
    if (!empty($uploadedFiles)) {
        foreach ($uploadedFiles as $image) {
            if ($image && $image->isValid()) {
                try {
                    $path = $image->store('products', 'public');
                    ProductImage::create([
                        'product_information_id' => $product->id,
                        'image_path' => $path
                    ]);
                } catch (\Exception $e) {
                    Log::error('Error storing image: ' . $e->getMessage());
                    // Continue processing other images even if one fails
                }
            }
        }
    }

    return response()->json([
        'message' => 'Product created successfully',
        'product' => $product->load('images')
    ], 201);
}

    public function update(Request $request, $id)
    {
        $request->validate([
            'clothes_name' => 'sometimes|required|string|max:255',
            'actual_price' => 'sometimes|required|numeric',
            'discount_price' => 'nullable|numeric',
            'category' => 'nullable|string',
            'description' => 'nullable|string',
            'short_description' => 'nullable|string',
            'images.*' => 'image|mimes:jpg,jpeg,png,gif|max:2048'
        ]);

        $product = ProductInformation::findOrFail($id);

        $product->update($request->only([
            'clothes_name',
            'actual_price',
            'discount_price',
            'category',
            'description',
            'short_description'
        ]));

        // Replace images if new ones are provided
        if ($request->hasFile('images')) {
            // Delete old images
            foreach ($product->images as $img) {
                Storage::disk('public')->delete($img->image_path);
                $img->delete();
            }

            $files = $request->file('images');
            if (!is_array($files)) {
                $files = [$files];
            }

            foreach ($files as $image) {
                if ($image) {
                    $path = $image->store('products', 'public');
                    ProductImage::create([
                        'product_information_id' => $product->id,
                        'image_path' => $path
                    ]);
                }
            }
        }

        return response()->json([
            'message' => 'Product updated successfully',
            'product' => $product->load('images')
        ]);
    }

    public function destroy($id)
    {
        $product = ProductInformation::findOrFail($id);

        foreach ($product->images as $img) {
            Storage::disk('public')->delete($img->image_path);
            $img->delete();
        }

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
}
