<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class CustomerInformation extends Model
{
    //
    protected $fillable=[
        'customer_name','image','email','phone','address','gender','date_of_birth','status'
    ];

}
