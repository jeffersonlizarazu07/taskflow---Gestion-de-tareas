'use client';

import { useState } from 'react';
import { Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { ConfirmDialog } from '@/components/ui/ConfirmDialog';
import { cn } from '@/lib/utils';
import type { Todo } from '@/types/todo';

interface TodoItemProps {
  todo: Todo;
  onToggle: (todo: Todo) => Promise<void>;
  onDelete: (id: number, isLocal?: boolean) => Promise<boolean>;
}

export function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isToggling, setIsToggling] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleToggle = async () => {
    setIsToggling(true);
    await onToggle(todo);
    setIsToggling(false);
  };

  const handleDeleteConfirmed = async () => {
    setShowConfirm(false);
    setIsDeleting(true);
    const success = await onDelete(todo.id, todo.isLocal);
    if (!success) setIsDeleting(false);
  };

  return (
    <>
      <div
        className={cn(
          'group animate-slide-up flex items-center gap-3 rounded-xl border p-3 shadow-sm transition-all duration-200 hover:shadow-md',
          isDeleting && 'pointer-events-none opacity-50',
          todo.completed
            ? 'border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-800/50'
            : 'border-orange-200 bg-white hover:border-orange-300 dark:border-gray-600 dark:bg-gray-800 dark:hover:border-orange-500/50'
        )}
      >
        {/* Toggle switch */}
        <button
          type="button"
          role="switch"
          aria-checked={todo.completed}
          aria-label={`Marcar "${todo.todo}" como ${todo.completed ? 'pendiente' : 'completada'}`}
          onClick={handleToggle}
          disabled={isToggling}
          className={cn(
            'relative h-6 w-11 shrink-0 rounded-full border-2 transition-all duration-300 focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:outline-none disabled:opacity-60',
            todo.completed
              ? 'border-orange-500 bg-orange-500'
              : 'border-gray-300 bg-gray-100 hover:border-orange-400 dark:border-gray-600 dark:bg-gray-700'
          )}
        >
          <span
            className={cn(
              'absolute top-0.5 left-0.5 h-4 w-4 rounded-full shadow-sm transition-transform duration-300',
              todo.completed ? 'translate-x-5 bg-white' : 'bg-white dark:bg-gray-400',
              isToggling && 'bg-white'
            )}
          />
        </button>

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p
              className={cn(
                'text-sm leading-snug font-medium transition-all duration-200 wrap-break-words min-w-0',
                todo.completed
                  ? 'text-gray-400 line-through dark:text-gray-500'
                  : 'text-gray-900 dark:text-gray-100'
              )}
            >
              {todo.todo}
            </p>

            {/* Status badge */}
            <span
              className={cn(
                'w-20 shrink-0 rounded-md px-2 py-0.5 text-center text-xs font-medium',
                todo.completed
                  ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-orange-50 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300'
              )}
            >
              {todo.completed ? 'Completada' : 'Pendiente'}
            </span>
          </div>

          {todo.isLocal && (
            <span className="mt-0.5 inline-block rounded-full bg-orange-50 px-2 py-0.5 text-xs text-orange-600 dark:bg-orange-900/20 dark:text-orange-400">
              Tu
            </span>
          )}
        </div>

        {/* Delete button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setShowConfirm(true)}
          aria-label="Eliminar tarea"
          disabled={isDeleting}
          className="shrink-0 opacity-100 transition-opacity sm:opacity-0 sm:group-hover:opacity-100"
        >
          <Trash2 className="h-4 w-4 text-red-400 dark:text-red-500" />
        </Button>
      </div>

      <ConfirmDialog
        isOpen={showConfirm}
        title="Eliminar tarea"
        description={`"${todo.todo}" será eliminada permanentemente.`}
        confirmLabel="Eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleDeleteConfirmed}
        onCancel={() => setShowConfirm(false)}
      />
    </>
  );
}
