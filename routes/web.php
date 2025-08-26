<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;  // Products
use App\Models\ProductInformation;
use App\Http\Controllers\CustomerController;
use App\Http\Controllers\EventInformationController;
use App\Http\Controllers\JobInformationController;
use App\Models\JobInformation;
use App\Http\Controllers\ContactInformationController;




Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {

    Route::get('/', function () {
    return Inertia::render('Welcome');
});
    //  for the Ecommerce products

Route::get('/ecommerce/products',function(){
    return  Inertia::render ('MainComponents/Products');
});

// FAQ Pages


Route::get('ecommerces/faq',function(){
    return Inertia::render('MainComponents/FAQPages');
});

// routes for the customers

Route::get('ecommerces/customers',function(){
    return Inertia::render('MainComponents/CustomersTable');
});

// calender
Route::get('/calendar',function(){
    return Inertia::render('MainComponents/MyCalendar');
});


// routes for the Invoices table

Route::get('invoices/list',function(){
    return Inertia::render('MainComponents/InvoicesTable');
});



// routes for the chat

Route::get('/chat',function(){
    return Inertia::render("ChatBot/Chat");
});


// jobTable

Route::get('jobs/list',function(){
    return Inertia::render('MainComponents/JobsTable');
});



// route for the contacts
ROute::get('/contacts/profile',function(){
    return Inertia::render("MainComponents/ContactTable");
});
   
});




Route::get('/product', [ProductController::class, 'index'])->name('product.index');
Route::post('/product', [ProductController::class, 'store'])->name('product.store');
Route::delete('/product/{id}', [ProductController::class, 'destroy'])->name('product.destroy');
Route::put('/product/{id}', [ProductController::class, 'update'])->name('product.update');

Route::get('/ecommerce/{slug}', function($slug) {
    $product = ProductInformation::with('images') 
        ->where('slug', $slug)
        ->firstOrFail(); 
    
    return Inertia::render('MainComponents/OrderList', [
        'product' => $product
    ]);
});





Route::get('auth/login',function(){
    return Inertia::render('Authentication/LoginPage');
});

// Route::get('auth/register',function(){
//     return Inertia::render('Authentication/Register');
// });


// Route::get('auth/forgot-password',function(){
//     return Inertia::render('Authentication/ForgetPassword');
// });




Route::get('/customers', [CustomerController::class, 'index'])->name('customers.index');
Route::post('/customers', [CustomerController::class, 'store'])->name('customers.store');
Route::put('/customers/{id}', [CustomerController::class, 'update'])->name('customers.update');
Route::delete('/customers/{id}', [CustomerController::class, 'destroy'])->name('customers.destroy');




Route::get('/event', [EventInformationController::class, 'index'])->name('event.index');
Route::post('/event', [EventInformationController::class, 'store'])->name('event.store');
Route::put('/event/{id}', [EventInformationController::class, 'update'])->name('event.update');
Route::delete('/event/{id}', [EventInformationController::class, 'destroy'])->name('event.destroy');





Route::get('/jobs', [JobInformationController::class, 'index'])->name('jobs.index');
Route::post('/jobs', [JobInformationController::class, 'store'])->name('jobs.store');
Route::put('/jobs/{id}', [JobInformationController::class, 'update'])->name('jobs.update');
Route::delete('/jobs/{id}', [JobInformationController::class, 'destroy'])->name('jobs.destroy');


// routes/web.php
Route::get('/jobs/{slug}', function ($slug) {
    $job = JobInformation::where('slug', $slug)->firstOrFail();
    return Inertia::render('DetailsPage/JobDetails', ['job' => $job]);
})->name('jobs.show'); // Add this name





Route::get('/contacts', [ContactInformationController::class, 'index'])->name('contacts.index');
Route::post('/contacts', [ContactInformationController::class, 'store'])->name('contacts.store');
Route::put('/contacts/{id}', [ContactInformationController::class, 'update'])->name('contacts.update');
Route::delete('/contacts/{id}', [ContactInformationController::class, 'destroy'])->name('contacts.destroy');








require __DIR__.'/auth.php';
