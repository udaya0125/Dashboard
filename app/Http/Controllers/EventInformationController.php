<?php

namespace App\Http\Controllers;

use App\Models\EventInformation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EventInformationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $events = EventInformation::orderBy('date', 'asc')->get();
        return response()->json($events);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'event_name' => 'required|string|max:255',
            'category' => 'required|string|max:255|in:meeting,appointment,reminder,task,birthday,holiday',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $event = EventInformation::create([
            'event_name' => $request->event_name,
            'category' => $request->category,
            'date' => $request->date,
        ]);

        return response()->json([
            'message' => 'Event created successfully.',
            'data' => $event
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'event_name' => 'required|string|max:255',
            'category' => 'required|string|max:255|in:meeting,appointment,reminder,task,birthday,holiday',
            'date' => 'required|date',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors()
            ], 422);
        }

        $event = EventInformation::findOrFail($id);
        $event->update([
            'event_name' => $request->event_name,
            'category' => $request->category,
            'date' => $request->date,
        ]);

        return response()->json([
            'message' => 'Event updated successfully.',
            'data' => $event
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy($id)
    {
        $event = EventInformation::findOrFail($id);
        $event->delete();

        return response()->json([
            'message' => 'Event deleted successfully.'
        ]);
    }
}