<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use Validator;

class TaskController extends Controller
{
    public function __construct() {
        $this->middleware('auth:api');
    }

    public function index() {
        $tasks = auth()->user()->tasks()->get();
        return response()->json($tasks);
    }

    public function store(Request $request) {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'required|integer|between:1,5',
            'due_date' => 'nullable|date',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task = auth()->user()->tasks()->create($validator->validated());

        return response()->json($task, 201);
    }

    public function show($id) {
        $task = auth()->user()->tasks()->find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }
        return response()->json($task);
    }

    public function update(Request $request, $id) {
        $task = auth()->user()->tasks()->find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'title' => 'sometimes|string|max:255',
            'description' => 'nullable|string',
            'priority' => 'sometimes|integer|between:1,5',
            'due_date' => 'nullable|date',
            'is_completed' => 'sometimes|boolean',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $task->update($validator->validated());

        return response()->json($task);
    }

    public function destroy($id) {
        $task = auth()->user()->tasks()->find($id);
        if (!$task) {
            return response()->json(['error' => 'Task not found'], 404);
        }

        $task->delete();

        return response()->json(['message' => 'Task deleted successfully']);
    }
}