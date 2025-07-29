import { Link } from '@inertiajs/react';

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    last_page: number;
    links: PaginationLink[];
    total: number;
    per_page: number;
}

interface PaginationProps {
    meta: PaginationMeta;
}

export default function Pagination({ meta }: PaginationProps) {
    const { links } = meta;

    if (!links || links.length === 0) {
        return null;
    }

    return (
        <div className="flex items-center justify-center gap-2 mt-5">
            {links.map((link, index) => {
                const baseClasses = [
                    'px-4 py-2 text-sm font-medium rounded-md transition-colors duration-150',
                    'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                ];

                const conditionalClasses = link.url 
                    ? link.active
                        ? 'bg-gray-900 text-white hover:bg-gray-700'
                        : 'text-gray-700 bg-white border border-gray-300 hover:bg-gray-50'
                    : 'text-gray-400 bg-gray-100 border border-gray-200 cursor-not-allowed';

                const allClasses = [...baseClasses, conditionalClasses].join(' ');

                return link.url ? (
                    <Link
                    preserveScroll
                        key={`${link.label}-${index}`}
                        href={link.url}
                        className={allClasses}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                ) : (
                    <span
                        key={`${link.label}-${index}`}
                        className={allClasses}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                );
            })}
        </div>
    );
}