import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from '@inertiajs/react';
import { Eye, Edit, Trash2, Plus } from 'lucide-react';
import Pagination from '@/components/pagination';

interface User {
    id: number;
    name: string;
    email?: string;
}

interface Project {
    id: number;
    name: string;
    description?: string;
    due_date?: string;
    status: string;
    image?: string;
    created_by: User;  // ← Changed from string to User object
    updated_by: User;  // ← Also add this for consistency
    created_at: string;
}


interface PaginatedProjects {
    data: Project[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: Array<{
        url: string | null;
        label: string;
        active: boolean;
    }>;
}

interface Props {
    projects: Project[] | PaginatedProjects;
}

export default function Index({ projects }: Props) {
    // Handle both wrapped and unwrapped data structures
    const projectsData: Project[] = Array.isArray(projects) ? projects : (projects?.data || []);
    
    const getStatusColor = (status: string): string => {
        switch (status.toLowerCase()) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'in_progress':
                return 'bg-blue-100 text-blue-800';
            case 'completed':
                return 'bg-green-100 text-green-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Projects" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex justify-between items-center">
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <Link href="/projects/create">
                        <Button>
                            <Plus className="w-4 h-4 mr-2" />
                            New Project
                        </Button>
                    </Link>
                </div>

                <div className="bg-white rounded-lg shadow overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project image
                                    </th>
                                  
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Project
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Due Date
                                    </th>
                             
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                              <thead className="bg-gray-50">
                                <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       
                                    </th>
                                  
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                       
                                    </th>
                             
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {projectsData.length > 0 ? (
                                    projectsData.map((project: Project) => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                  <div>
                                                    {project.image ? (                                                        <img 
                                                            src={project.image} 
                                                            alt={project.name} 
                                                            className="w-10 h-10 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <span className="text-gray-500">No Image</span>
                                                        </div>
                                                    )}
                                                  </div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        {project.name}
                                                    </div>
                                                    {project.description && (
                                                        <div className="text-sm text-gray-500 truncate max-w-xs">
                                                            {project.description}
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge 
                                                    className={`${getStatusColor(project.status)} border-0`}
                                                >
                                                    {project.status.replace('_', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                {project.due_date 
                                                    ? new Date(project.due_date).toLocaleDateString()
                                                    : 'No due date'
                                                }
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                             {project.created_by?.name}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/projects/${project.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('projects.edit', project.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('projects.destroy', project.id)}  >
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                            No projects found. 
                                            <Link href="/projects/create" className="text-blue-600 hover:text-blue-800 ml-1">
                                                Create your first project
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                      
                        <Pagination meta={projects.meta} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}