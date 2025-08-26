<?php

namespace App\Http\Controllers;

use App\Models\JobInformation;
use Illuminate\Http\Request;

class JobInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        // Fetch all job records
        $jobs = JobInformation::all();
        return response()->json($jobs);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate incoming request
        $validatedData = $request->validate([
            'job_title'             => 'required|string|max:255',
            'company_name'          => 'required|string|max:255',
            'location'              => 'required|string|max:255',
            'experience'             => 'required|string|max:255',
            'position'              => 'required|string|max:255',
            'type'                   => 'required|string|max:255',
            'status'                 => 'required|string|in:active,inactive,unavailable',
            // 'slug'                  => 'sometimes|string|max:255|unique:job_information',
            'vacancy'               => 'sometimes|integer',
            'jobtype'               => 'sometimes|string|max:255',
            'posted_date'           => 'sometimes|date',
            'close_date'            => 'sometimes|date|after_or_equal:posted_date',
            'description'           => 'sometimes|string',
            'responsibilities'      => 'sometimes|string',
            'requirements'          => 'sometimes|string',
            'qualification'         => 'sometimes|string',
            'skill_and_experience'  => 'sometimes|string',
            'programming_languages' => 'sometimes|string',
        ]);

        // Create a new job record
        $job = JobInformation::create($validatedData);

        return response()->json([
            'message' => 'Job created successfully',
            'data'    => $job
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $job = JobInformation::findOrFail($id);
        return response()->json($job);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $job = JobInformation::findOrFail($id);

        // Validate updated data
        $validatedData = $request->validate([
            'job_title'             => 'sometimes|string|max:255',
            'company_name'          => 'sometimes|string|max:255',
            'location'              => 'sometimes|string|max:255',
            'experience'           => 'sometimes|string|max:255',
            'position'              => 'sometimes|string|max:255',
            'type'                 => 'sometimes|string|max:255',
            'status'                => 'sometimes|string|in:active,inactive,unavailable',
            // 'slug'                  => 'sometimes|string|max:255|unique:job_information,slug,'.$id,
            'vacancy'               => 'sometimes|integer',
            'jobtype'               => 'sometimes|string|max:255',
            'posted_date'           => 'sometimes|date',
            'close_date'            => 'sometimes|date|after_or_equal:posted_date',
            'description'          => 'sometimes|string',
            'responsibilities'      => 'sometimes|string',
            'requirements'          => 'sometimes|string',
            'qualification'         => 'sometimes|string',
            'skill_and_experience'  => 'sometimes|string',
            'programming_languages' => 'sometimes|string',
        ]);

        $job->update($validatedData);

        return response()->json([
            'message' => 'Job updated successfully',
            'data'    => $job
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $job = JobInformation::findOrFail($id);
        $job->delete();

        return response()->json([
            'message' => 'Job deleted successfully'
        ]);
    }
}