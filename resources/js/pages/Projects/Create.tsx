import { Head, useForm } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

export default function Create() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    description: '',
    due_date: '',
    status: 'pending',
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
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-gray-900">Create New Project</h1>
          </div>

          {/* Form */}
          <div className="p-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="image">
                  Project Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  accept="image/*"
                  onChange={(e) => setData('image', e.target.files[0])}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.image && (
                  <p className="mt-1 text-sm text-red-600">{errors.image}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="name">
                  Project Name
                </label>
                <input 
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  type="text" 
                  id="name" 
                  name="name" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="description">
                  Description
                </label>
                <textarea 
                  value={data.description}
                  onChange={(e) => setData('description', e.target.value)}
                  rows={4}
                  id="description" 
                  name="description" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.description && (
                  <p className="mt-1 text-sm text-red-600">{errors.description}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="due_date">
                  Due Date
                </label>
                <input 
                  value={data.due_date}
                  onChange={(e) => setData('due_date', e.target.value)}
                  type="date" 
                  id="due_date" 
                  name="due_date" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {errors.due_date && (
                  <p className="mt-1 text-sm text-red-600">{errors.due_date}</p>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="status">
                  Status
                </label>
                <select
                  value={data.status}
                  onChange={(e) => setData('status', e.target.value)}
                  id="status"
                  name="status"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="pending">Pending</option>
                  <option value="in_progress">In Progress</option>
                  <option value="completed">Completed</option>
                </select>
                {errors.status && (
                  <p className="mt-1 text-sm text-red-600">{errors.status}</p>
                )}
              </div>

              <button 
                type="submit" 
                disabled={processing}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
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