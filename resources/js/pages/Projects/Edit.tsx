import AppLayout from '@/layouts/app-layout';
import { Head, useForm } from '@inertiajs/react';

export default function Edit({ project }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: project.name,
        description: project.description,
        due_date: project.due_date,
        status: project.status,
        image: '',
  
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('projects.store'), {
            onSuccess: () => reset(),
            onError: (errors) => console.error(errors),
        });
    };

    return (
        <AppLayout>
            <Head title="Create Project" />

            <div className="py-6">
                <div className="overflow-hidden rounded-lg bg-white shadow">
                    {/* Header */}
                    <div className="border-b border-gray-200 px-6 py-4">
                        <h1 className="text-2xl font-bold text-gray-900">Edit Project {project.name}</h1>
                    </div>

                    {/* Form */}
                    <div className="p-6">
                        <form onSubmit={onSubmit} className="space-y-4">
                            <div className="mb-4">
                                {project.image && (
                                    <img src={`/storage/${project.image}`} alt={project.name} className="h-24 w-24 rounded-lg object-cover" />
                                )}
                                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="image">
                                    Project Image
                                </label>
                                <input
                                    type="file"
                                    id="image"
                                    name="image"
                                    accept="image/*"
                                    onChange={(e) => setData('image', e.target.files[0])}
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.image && <p className="mt-1 text-sm text-red-600">{errors.image}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="name">
                                    Project Name
                                </label>
                                <input
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                    required
                                />
                                {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="description">
                                    Description
                                </label>
                                <textarea
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    rows={4}
                                    id="description"
                                    name="description"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="due_date">
                                    Due Date
                                </label>
                                <input
                                    value={data.due_date}
                                    onChange={(e) => setData('due_date', e.target.value)}
                                    type="date"
                                    id="due_date"
                                    name="due_date"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                />
                                {errors.due_date && <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>}
                            </div>

                            <div className="mb-4">
                                <label className="mb-2 block text-sm font-medium text-gray-700" htmlFor="status">
                                    Status
                                </label>
                                <select
                                    value={data.status}
                                    onChange={(e) => setData('status', e.target.value)}
                                    id="status"
                                    name="status"
                                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                                >
                                    <option value="pending">Pending</option>
                                    <option value="in_progress">In Progress</option>
                                    <option value="completed">Completed</option>
                                </select>
                                {errors.status && <p className="mt-1 text-sm text-red-600">{errors.status}</p>}
                            </div>

                            <button
                                type="submit"
                                disabled={processing}
                                className="rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
                            >
                                {processing ? 'Creating...' : 'Create Project'}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
