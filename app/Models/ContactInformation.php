<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ContactInformation extends Model
{
    //
    protected $fillable=[
        'name','email','tags','project','status','image'
    ];
}
