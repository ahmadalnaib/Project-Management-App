import AppLayout from '@/layouts/app-layout';
import { Head, Link } from '@inertiajs/react';

interface Project {
  id: number;
  name: string;
  description?: string;
  due_date?: string;
  status: string;
  image?: string;
  created_by: number;
  updated_by: number;
  created_at: string;
  updated_at: string;
}

interface ShowProps {
  project: Project;
}

export default function Show({ project }: ShowProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Not set';
    return new Date(dateString).toLocaleDateString();
  };

  const getStatusBadgeClass = (status: string) => {
    const baseClasses = 'px-2 py-1 rounded text-sm font-medium';
    switch (status.toLowerCase()) {
      case 'completed':
        return `${baseClasses} bg-green-100 text-green-800`;
      case 'in_progress':
        return `${baseClasses} bg-blue-100 text-blue-800`;
      case 'pending':
        return `${baseClasses} bg-yellow-100 text-yellow-800`;
      default:
        return `${baseClasses} bg-gray-100 text-gray-800`;
    }
  };

  return (
    <AppLayout>
      <Head title={`Project: ${project.name}`} />
      
      <div className="max-w-4xl mx-auto py-6">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
                <span className={getStatusBadgeClass(project.status)}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>
              {project.image && (
                <img 
                  src={project.image} 
                  alt={project.name}
                  className="w-24 h-24 object-cover rounded-lg"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description */}
              <div className="md:col-span-2">
                <h3 className="text-lg font-medium text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed">
                  {project.description || 'No description provided'}
                </p>
              </div>

              {/* Due Date */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Due Date</h3>
                <p className="text-gray-600">{formatDate(project.due_date)}</p>
              </div>

              {/* Status */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Status</h3>
                <span className={getStatusBadgeClass(project.status)}>
                  {project.status.replace('_', ' ').toUpperCase()}
                </span>
              </div>

              {/* Created Date */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Created</h3>
                <p className="text-gray-600">{formatDate(project.created_at)}</p>
              </div>

              {/* Last Updated */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Last Updated</h3>
                <p className="text-gray-600">{formatDate(project.updated_at)}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex space-x-3">
              <Link
                href={`/projects/${project.id}/edit`}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Edit Project
              </Link>
              <Link
                href="/projects"
                className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors"
              >
                Back to Projects
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}