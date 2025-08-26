<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('customer_information', function (Blueprint $table) {
            $table->id();
            $table->string('customer_name');
            $table->string('image')->nullable();
            $table->string('email');
            $table->string('phone');
            $table->text('address');
            $table->enum('gender', ['male', 'female', 'other'])->nullable();
            $table->date('date_of_birth')->nullable();
            $table->enum('status', ['active', 'inactive', 'unavailable']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('customer_information');
    }
};
