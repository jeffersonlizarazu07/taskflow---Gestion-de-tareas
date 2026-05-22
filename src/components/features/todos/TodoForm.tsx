'use client';

import { useState, type FormEvent } from 'react';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/Button';

// ─── Types ────────────────────────────────────────────────────────────────────

interface TodoFormProps {
  onAdd: (text: string) => Promise<boolean>;
}

type FeedbackStatus = 'idle' | 'success' | 'error';

const FEEDBACK_MESSAGES: Record<FeedbackStatus, string> = {
  idle: '',
  success: '✓ Tarea agregada correctamente.',
  error: '✗ No se pudo agregar la tarea. Intenta de nuevo.',
};

// ─── Component ────────────────────────────────────────────────────────────────

export function TodoForm({ onAdd }: TodoFormProps) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<FeedbackStatus>('idle');

  const showFeedback = (status: FeedbackStatus) => {
    setFeedback(status);
    setTimeout(() => setFeedback('idle'), 3000);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedText = text.trim();
    if (!trimmedText) return;

    setIsSubmitting(true);
    const success = await onAdd(trimmedText);
    setIsSubmitting(false);

    if (success) {
      setText('');
      showFeedback('success');
    } else {
      showFeedback('error');
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-gray-50 p-4 shadow-sm dark:border-gray-700 dark:bg-gray-900">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Nueva tarea…"
          disabled={isSubmitting}
          aria-label="Descripción de la nueva tarea"
          className="h-10 flex-1 rounded-lg border border-gray-200 bg-white px-3 text-sm text-gray-900 placeholder-gray-400 transition-all focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 focus:outline-none disabled:opacity-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-100 dark:placeholder-gray-500"
        />
        <Button
          type="submit"
          disabled={!text.trim() || isSubmitting}
          size="md"
          aria-label="Agregar tarea"
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <PlusCircle className="h-4 w-4" />
          <span className="hidden sm:inline">Agregar</span>
        </Button>
      </form>

      {feedback !== 'idle' && (
        <p
          className={`animate-fade-in mt-2 text-xs font-medium ${
            feedback === 'success'
              ? 'text-green-600 dark:text-green-400'
              : 'text-red-500 dark:text-red-400'
          }`}
        >
          {FEEDBACK_MESSAGES[feedback]}
        </p>
      )}
    </div>
  );
}
