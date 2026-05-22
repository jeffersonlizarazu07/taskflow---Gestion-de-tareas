'use client';

import { CheckSquare } from 'lucide-react';
import { useTodos } from '@/hooks/useTodos';
import { TodoForm } from '@/components/features/todos/TodoForm';
import { TodoFilters } from '@/components/features/todos/TodoFilters';
import { TodoList } from '@/components/features/todos/TodoList';
import { TodoPagination } from '@/components/features/todos/TodoPagination';
import { ModeButton } from '@/components/ui/ModeButton';
import { useTheme } from '@/hooks/useTheme';

// ─── Page ─────────────────────────────────────────────────────────────────────
// This page is intentionally thin — it only composes feature components.
// All business logic lives in the useTodos hook.

export default function HomePage() {
  const {
    todos,
    pagination,
    activeFilter,
    isLoading,
    error,
    loadPage,
    addTodo,
    toggleTodo,
    removeTodo,
    setFilter,
  } = useTodos();
  const { isDark, toggleTheme } = useTheme();
  return (
    <main className="mx-auto my-10 min-h-screen w-full max-w-4xl px-4 sm:px-6">
  <div className="rounded-3xl bg-white p-4 sm:p-6 lg:p-8 shadow-2xl ring-1 ring-gray-200 dark:bg-gray-800 dark:ring-gray-700">
        {/* Header */}
        <header className="mb-8 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 shadow-sm">
            <CheckSquare className="h-5 w-5 text-white" />
          </div>
          <div>
            <h1 className="text-xl leading-tight font-bold text-gray-900 dark:text-gray-100">
              TaskFlow
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">Gestión de tareas</p>
          </div>
          <div className="ml-auto">
            <ModeButton onClick={toggleTheme} isDark={isDark} />
          </div>
        </header>
        
        {/* Add todo */}
        <section aria-label="Agregar tarea" className="mb-6">
          <TodoForm onAdd={addTodo} />
        </section>
        {/* Filters */}
        <section aria-label="Filtros" className="mb-6">
          <TodoFilters activeFilter={activeFilter} onFilterChange={setFilter} />
        </section>
        {/* Task list */}
        <section aria-label="Tareas" className="mb-8">
          <TodoList
            todos={todos}
            isLoading={isLoading}
            error={error}
            onToggle={toggleTodo}
            onDelete={removeTodo}
            onRetry={() => loadPage(pagination.currentPage)}
          />
        </section>
        {/* Pagination */}
        <TodoPagination pagination={pagination} onPageChange={loadPage} isDisabled={isLoading} />
      </div>
    </main>
  );
}
