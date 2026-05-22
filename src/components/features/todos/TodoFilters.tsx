'use client';

import { TODO_STATUS_LABELS } from '@/constants/todos';
import { cn } from '@/lib/utils';
import type { TodoStatus } from '@/types/todo';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TodoFiltersProps {
  activeFilter: TodoStatus;
  onFilterChange: (filter: TodoStatus) => void;
}

const FILTER_OPTIONS: TodoStatus[] = ['all', 'completed', 'pending'];

// ─── Component ────────────────────────────────────────────────────────────────

export function TodoFilters({ activeFilter, onFilterChange }: TodoFiltersProps) {
  return (
    <div
      role="tablist"
      aria-label="Filtrar tareas"
      className="flex gap-1 rounded-lg border border-gray-200 bg-gray-100 p-1 dark:border-gray-700 dark:bg-gray-900"
    >
      {FILTER_OPTIONS.map((filter) => (
        <button
          key={filter}
          role="tab"
          aria-selected={activeFilter === filter}
          onClick={() => onFilterChange(filter)}
          className={cn(
            'flex-1 rounded-md px-3 py-1.5 text-sm font-medium transition-all duration-150',
            activeFilter === filter
              ? 'bg-white text-gray-900 shadow-sm dark:bg-gray-700 dark:text-gray-100'
              : 'text-gray-400 hover:text-gray-700 dark:text-gray-500 dark:hover:text-gray-300'
          )}
        >
          {TODO_STATUS_LABELS[filter]}
        </button>
      ))}
    </div>
  );
}
