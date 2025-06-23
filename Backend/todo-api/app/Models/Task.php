<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Task extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     * Add all fields you want to be fillable here
     */
    protected $fillable = [
        'user_id',     // Required for user association
        'title',       // Required field from your error
        'description', // Optional description
        'priority',    // Priority level (1-5)
        'due_date',    // Optional due date
        'is_completed' // Completion status
    ];

    /**
     * The attributes that should be cast to native types.
     */
    protected $casts = [
        'due_date' => 'datetime',
        'is_completed' => 'boolean',
        'priority' => 'integer'
    ];

    /**
     * Relationship to the User model
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}