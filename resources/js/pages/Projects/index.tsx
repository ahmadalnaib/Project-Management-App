import Pagination from '@/components/pagination';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router } from '@inertiajs/react';
import { ChevronDown, ChevronUp, Edit, Eye, Plus, Trash2 } from 'lucide-react';

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
    created_by: User; // ← Changed from string to User object
    updated_by: User; // ← Also add this for consistency
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


export default function Index({ projects, success, queryParams = null }: Props) {
    // Handle both wrapped and unwrapped data structures
    const projectsData: Project[] = Array.isArray(projects) ? projects : projects?.data || [];

    queryParams = queryParams || {};
    const fieldChange = (name, value) => {
        if (value) {
            queryParams[name] = value;
        } else {
            delete queryParams[name];
        }
        router.get(route('projects.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const onKeyPress = (name, e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fieldChange(name, e.target.value);
            // Optionally, you can trigger a search or filter function here
        }
    };

    const shortChange = (name) => {
        if (name === queryParams.sort_field) {
            if (queryParams.sort_direction === 'asc') {
                queryParams.sort_direction = 'desc';
            } else {
                queryParams.sort_direction = 'asc';
            }
        } else {
            queryParams.sort_field = name;
            queryParams.sort_direction = 'asc';
        }
        router.get(route('projects.index'), queryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getSortIcon = (field) => {
        if (queryParams.sort_field === field) {
            return queryParams.sort_direction === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
        }
         return <ChevronDown className="ml-1 h-4 w-4 text-gray-300 opacity-50" />;
    };

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
                <div className="flex items-center justify-between">
                    {success && (
                        <div className="text-sm text-green-600">
                            {success}
                        </div>
                    )}
                    <h1 className="text-2xl font-bold">Projects</h1>
                    <Link href="/projects/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Project
                        </Button>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        onClick={(e) => shortChange('name')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        <div className="flex items-center">Project
                                             {getSortIcon('name')}</div>
                                    </th>
                                    <th
                                        onClick={(e) => shortChange('status')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        <div className="flex items-center">Status {getSortIcon('status')}</div>
                                    </th>
                                    <th
                                        onClick={(e) => shortChange('due_date')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"
                                    >
                                        <div className="flex items-center">Due Date {getSortIcon('due_date')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Created by</th>

                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        <Input
                                            defaultValue={queryParams?.name}
                                            placeholder="Search by project name"
                                            className="w-full"
                                            onBlur={(e) => fieldChange('name', e.target.value)}
                                            onKeyPress={(e) => onKeyPress('name', e)}
                                        />
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        {/* <Select  onChange={e => fieldChange('status', e.target.value)} >
                                      <option value="">All Statuses</option>
                                      <option value="pending">Pending</option>
                                      <option value="in_progress">In Progress</option>
                                      <option value="completed">Completed</option>
                                    </Select> */}
                                        <select
                                            defaultValue={queryParams?.status}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            onChange={(e) => fieldChange('status', e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="active">Active</option>
                                            <option value="on hold">On Hold</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>

                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {projectsData.length > 0 ? (
                                    projectsData.map((project: Project) => (
                                        <tr key={project.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">
                                                        <Link href={route('projects.show', project.id)} className="hover:underline">
                                                        {project.name}
                                                        </Link>
                                                    </div>
                                                  
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={`${getStatusColor(project.status)} border-0`}>
                                                    {project.status.replace('_', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                {project.due_date ? new Date(project.due_date).toLocaleDateString() : 'No due date'}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">{project.created_by?.name}</td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/projects/${project.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('projects.edit', project.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('projects.destroy', project.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            <Trash2 className="h-4 w-4" />
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
                                            <Link href="/projects/create" className="ml-1 text-blue-600 hover:text-blue-800">
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
