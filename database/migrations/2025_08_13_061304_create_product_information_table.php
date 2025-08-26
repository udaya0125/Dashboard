<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('product_information', function (Blueprint $table) {
            $table->id();
            $table->string('clothes_name');
            $table->decimal('actual_price', 10, 2);
            $table->decimal('discount_price', 10, 2)->nullable();
            $table->string('category');
            $table->longText('description')->nullable();
            $table->string('short_description')->nullable();
            $table->string('slug');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('product_information');
    }
};
