<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class JobInformation extends Model
{
    protected $fillable = [
        'job_title', 'company_name', 'location', 'experience', 'position', 'type', 'status', 'slug','vacancy','jobtype','posted_date','close_date','description','responsibilities','requirements','qualification','skill_and_experience','programming_languages',                                                                                                              
    ];

    protected static function boot()
    {
        parent::boot();

        // Create slug on creating
        static::creating(function ($job) {
            // Generate a temporary slug without ID first
            $slug = Str::slug($job->job_title);
            $job->slug = $slug; // ID not available yet, will update after creation
        });

        // Update slug after creation with ID
        static::created(function ($job) {
            $slug = Str::slug($job->job_title) . '-' . $job->id;
            $job->slug = $slug;
            $job->saveQuietly(); // save without triggering events again
        });

        // Update slug when job_title changes
        static::updating(function ($job) {
            if ($job->isDirty('job_title')) {
                $slug = Str::slug($job->job_title) . '-' . $job->id;
                $job->slug = $slug;
            }
        });
    }
}
