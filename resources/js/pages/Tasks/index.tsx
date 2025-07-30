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
}

interface Task {
    id: number;
    title: string; // Changed from 'name' to 'title' to match migration
    description?: string;
    due_date?: string;
    status: string;
    priority: string; // Added priority field from migration
    image?: string;
    assigned_user_id: number;
    assigned_user?: User; // Added for the assigned user relationship
    updated_by: number;
    updated_by_user?: User; // Added for the updated by user relationship
    project_id: number;
    project?: Project; // Added for the project relationship
    created_at: string;
    updated_at: string;
}

interface PaginatedTasks {
    data: Task[];
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

// Add proper type for query parameters
interface QueryParams {
    [key: string]: string | undefined;
    title?: string; // Changed from 'name' to 'title'
    status?: string;
    priority?: string; // Added priority filter
    sort_field?: string;
    sort_direction?: 'asc' | 'desc';
}

interface Props {
    Tasks: Task[] | PaginatedTasks;
    queryParams?: QueryParams | null; // Added missing queryParams prop
}

export default function Index({ tasks, queryParams = null }: Props) {
    // Handle both wrapped and unwrapped data structures
    const TasksData: Task[] = Array.isArray(tasks) ? tasks : tasks?.data || [];

    const currentQueryParams: QueryParams = queryParams || {};
    
    const fieldChange = (name: string, value: string): void => {
        if (value) {
            currentQueryParams[name] = value;
        } else {
            delete currentQueryParams[name];
        }
        router.get(route('tasks.index'), currentQueryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    // Replace deprecated onKeyPress with onKeyDown
    const onKeyDown = (name: string, e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            e.preventDefault();
            fieldChange(name, e.currentTarget.value);
        }
    };

    const shortChange = (name: string): void => {
        if (name === currentQueryParams.sort_field) {
            if (currentQueryParams.sort_direction === 'asc') {
                currentQueryParams.sort_direction = 'desc';
            } else {
                currentQueryParams.sort_direction = 'asc';
            }
        } else {
            currentQueryParams.sort_field = name;
            currentQueryParams.sort_direction = 'asc';
        }
        router.get(route('tasks.index'), currentQueryParams, {
            preserveState: true,
            preserveScroll: true,
        });
    };

    const getSortIcon = (field: string): JSX.Element => {
        if (currentQueryParams.sort_field === field) {
            return currentQueryParams.sort_direction === 'asc' ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
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

    const getPriorityColor = (priority: string): string => {
        switch (priority.toLowerCase()) {
            case 'low':
                return 'bg-green-100 text-green-800';
            case 'medium':
                return 'bg-yellow-100 text-yellow-800';
            case 'high':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout>
            <Head title="Tasks" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-2xl font-bold">Tasks</h1>
                    <Link href="/Tasks/create">
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            New Task
                        </Button>
                    </Link>
                </div>

                <div className="overflow-hidden rounded-lg bg-white shadow">
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        onClick={() => shortChange('title')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer"
                                    >
                                        <div className="flex items-center">Title {getSortIcon('title')}</div>
                                    </th>
                                    <th
                                        onClick={() => shortChange('status')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer"
                                    >
                                        <div className="flex items-center">Status {getSortIcon('status')}</div>
                                    </th>
                                    <th
                                        onClick={() => shortChange('priority')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer"
                                    >
                                        <div className="flex items-center">Priority {getSortIcon('priority')}</div>
                                    </th>
                                    <th
                                        onClick={() => shortChange('due_date')}
                                        className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase cursor-pointer"
                                    >
                                        <div className="flex items-center">Due Date {getSortIcon('due_date')}</div>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Assigned To</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">Project</th>
                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        <Input
                                            defaultValue={currentQueryParams?.title}
                                            placeholder="Search by task title"
                                            className="w-full"
                                            onBlur={(e) => fieldChange('title', e.target.value)}
                                            onKeyDown={(e) => onKeyDown('title', e)}
                                        />
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        <select
                                            defaultValue={currentQueryParams?.status}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            onChange={(e) => fieldChange('status', e.target.value)}
                                        >
                                            <option value="">All Statuses</option>
                                            <option value="pending">Pending</option>
                                            <option value="in_progress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase">
                                        <select
                                            defaultValue={currentQueryParams?.priority}
                                            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                                            onChange={(e) => fieldChange('priority', e.target.value)}
                                        >
                                            <option value="">All Priorities</option>
                                            <option value="low">Low</option>
                                            <option value="medium">Medium</option>
                                            <option value="high">High</option>
                                        </select>
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                    <th className="px-6 py-3 text-right text-xs font-medium tracking-wider text-gray-500 uppercase"></th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200 bg-white">
                                {TasksData.length > 0 ? (
                                    TasksData.map((Task: Task) => (
                                        <tr key={Task.id} className="hover:bg-gray-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div>
                                                    <div className="text-sm font-medium text-gray-900">{Task.title}</div>
                                                    {Task.description && (
                                                        <div className="max-w-xs truncate text-sm text-gray-500">{Task.description}</div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={`${getStatusColor(Task.status)} border-0`}>
                                                    {Task.status.replace('_', ' ')}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Badge className={`${getPriorityColor(Task.priority)} border-0`}>
                                                    {Task.priority}
                                                </Badge>
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-900">
                                                {Task.due_date ? new Date(Task.due_date).toLocaleDateString() : 'No due date'}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {Task.assigned_user?.name || 'Unassigned'}
                                            </td>
                                            <td className="px-6 py-4 text-sm whitespace-nowrap text-gray-500">
                                                {Task.project?.name || 'No project'}
                                            </td>
                                            <td className="px-6 py-4 text-right text-sm font-medium whitespace-nowrap">
                                                <div className="flex justify-end gap-2">
                                                    <Link href={`/tasks/${Task.id}`}>
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('tasks.edit', Task.id)}>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={route('tasks.destroy', Task.id)}>
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
                                        <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                            No Tasks found.
                                            <Link href="/tasks/create" className="ml-1 text-blue-600 hover:text-blue-800">
                                                Create your first Task
                                            </Link>
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}