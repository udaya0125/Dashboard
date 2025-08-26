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
        Schema::create('job_information', function (Blueprint $table) {
            $table->id();
            $table->string('job_title');
            $table->string('company_name');
            $table->string('location');
            $table->string('experience')->nullable();
            $table->string('position');
            $table->string('type');
            $table->enum('status', ['active', 'inactive', 'unavailable']);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('job_information');
    }
};
