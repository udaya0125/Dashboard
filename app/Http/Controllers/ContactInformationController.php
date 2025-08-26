<?php

namespace App\Http\Controllers;

use App\Models\ContactInformation;
use Illuminate\Http\Request;

class ContactInformationController extends Controller
{
    // Get all contacts
    public function index()
    {
        $contacts = ContactInformation::all();
        return response()->json($contacts);
    }

    // Store a new contact
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:contact_informations,email',
            'tags' => 'nullable|string',
            'project' => 'nullable|string',
            'status' => 'nullable|string',
            'image' => 'nullable|image|max:2048', // optional image upload
        ]);

        $data = $request->all();

        // If image is uploaded
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = $imageName;
        }

        $contact = ContactInformation::create($data);

        return response()->json($contact, 201);
    }

    // Update an existing contact
    public function update(Request $request, $id)
    {
        $contact = ContactInformation::findOrFail($id);

        $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'email' => 'sometimes|required|email|unique:contact_informations,email,' . $contact->id,
            'tags' => 'nullable|string',
            'project' => 'nullable|string',
            'status' => 'nullable|string',
            'image' => 'nullable|image|max:2048',
        ]);

        $data = $request->all();

        // If image is uploaded
        if ($request->hasFile('image')) {
            $imageName = time() . '.' . $request->image->extension();
            $request->image->move(public_path('images'), $imageName);
            $data['image'] = $imageName;
        }

        $contact->update($data);

        return response()->json($contact);
    }

    // Delete a contact
    public function destroy($id)
    {
        $contact = ContactInformation::findOrFail($id);
        $contact->delete();

        return response()->json(['message' => 'Contact deleted successfully.']);
    }
}
