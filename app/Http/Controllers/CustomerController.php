<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\CustomerInformation;
use Illuminate\Support\Facades\Storage;

class CustomerController extends Controller
{
    //
    public function index()
    {
        $customers = CustomerInformation::all();
        return response()->json($customers);
    }

    /**
     * Store a newly created customer.
     */
    public function store(Request $request)
    {
        $request->validate([
            'customer_name' => 'required|string|max:255',
            'email'         => 'required|email|unique:customer_informations,email',
            'phone'         => 'required|string|max:20',
            'address'       => 'nullable|string|max:255',
            'gender'        => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'status'        => 'required|in:active,inactive,unavailable',
            'image'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = null;
        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')->store('customers', 'public');
        }

        $customer = CustomerInformation::create([
            'customer_name' => $request->customer_name,
            'email'         => $request->email,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'gender'        => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'status'        => $request->status,
            'image'         => $imagePath,
        ]);

        return response()->json([
            'message' => 'Customer created successfully',
            'data'    => $customer
        ]);
    }

    /**
     * Update the specified customer.
     */
    public function update(Request $request, $id)
    {
        $customer = CustomerInformation::findOrFail($id);

        $request->validate([
            'customer_name' => 'required|string|max:255',
            'email'         => 'required|email|unique:customer_informations,email,' . $customer->id,
            'phone'         => 'required|string|max:20',
            'address'       => 'nullable|string|max:255',
            'gender'        => 'nullable|in:male,female,other',
            'date_of_birth' => 'nullable|date',
            'status'        => 'required|in:active,inactive,unavailable',
            'image'         => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        $imagePath = $customer->image;
        if ($request->hasFile('image')) {
            if ($imagePath && Storage::disk('public')->exists($imagePath)) {
                Storage::disk('public')->delete($imagePath);
            }
            $imagePath = $request->file('image')->store('customers', 'public');
        }

        $customer->update([
            'customer_name' => $request->customer_name,
            'email'         => $request->email,
            'phone'         => $request->phone,
            'address'       => $request->address,
            'gender'        => $request->gender,
            'date_of_birth' => $request->date_of_birth,
            'status'        => $request->status,
            'image'         => $imagePath,
        ]);

        return response()->json([
            'message' => 'Customer updated successfully',
            'data'    => $customer
        ]);
    }

    /**
     * Remove the specified customer.
     */
    public function destroy($id)
    {
        $customer = CustomerInformation::findOrFail($id);

        if ($customer->image && Storage::disk('public')->exists($customer->image)) {
            Storage::disk('public')->delete($customer->image);
        }

        $customer->delete();

        return response()->json([
            'message' => 'Customer deleted successfully'
        ]);
    }
}
