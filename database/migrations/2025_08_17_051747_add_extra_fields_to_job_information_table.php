<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('job_information', function (Blueprint $table) {       
            $table->integer('vacancy')->nullable();
            $table->string('jobtype')->nullable();
            $table->date('posted_date')->nullable();
            $table->date('close_date')->nullable();
            $table->longText('description')->nullable();
            $table->longText('responsibilities')->nullable();
            $table->longText('requirements')->nullable();
            $table->string('qualification')->nullable();
            $table->longText('skill_and_experience')->nullable();
            $table->string('programming_languages')->nullable();
        });
    }

    public function down(): void
    {
        Schema::table('job_information', function (Blueprint $table) {
            $table->dropColumn([       
                'vacancy',
                'jobtype',
                'posted_date',
                'close_date',
                'description',
                'responsibilities',
                'requirements',
                'qualification',
                'skill_and_experience',
                'programming_languages',
            ])->after('status');
        });
    }
};
