<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Project;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\ProjectResource;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $query = Project::query();
        $sortField = request('sort_field', 'created_at');
        $sortDirection = request('sort_direction', 'desc');

  
        if (request()->has('name')) {
            $query->where('name', 'like', '%' . request('name') . '%');
        }

        if (request()->has('status')) {
            $query->where('status', request('status'));
        }

        $projects = $query->orderBy($sortField, $sortDirection)->paginate(10)->onEachSide(1);
        return Inertia::render('Projects/index', [
            'projects' => ProjectResource::collection($projects),
            'queryParams' => request()->query() ?: null,
            'success' => session('success'),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Projects/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        //
        $validatedData = $request->validated();
        $validatedData['created_by'] = auth()->id();
        $validatedData['updated_by'] = auth()->id();
        $project = Project::create($validatedData);
   

        return redirect()->route('projects.index')->with('success', 'Project created successfully.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        //
        return Inertia::render('Projects/Show', [
            'project' => new ProjectResource($project),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        //
    }
}
