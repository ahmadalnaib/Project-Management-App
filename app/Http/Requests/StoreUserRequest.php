<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            //
            'name' => 'required|string|max:255',
            'status' => 'required',
            'description' => 'nullable|string|max:1000',
            'due_date' => 'nullable|date|after_or_equal:today',
            'priority' => 'nullable|in:low,medium,high',
            'assigned_to' => 'nullable|exists:users,id',
        ];
    }


}
