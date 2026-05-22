import { ClipboardList } from 'lucide-react';
import type { ReactNode } from 'react';

// ─── Types ────────────────────────────────────────────────────────────────────

interface EmptyStateProps {
  title: string;
  description: string;
  icon?: ReactNode;
}

// ─── Component ────────────────────────────────────────────────────────────────

export function EmptyState({
  title,
  description,
  icon = <ClipboardList className="text-surface-200 h-10 w-10" />,
}: EmptyStateProps) {
  return (
    <div className="animate-fade-in flex flex-col items-center justify-center gap-3 py-16 text-center">
      {icon}
      <p className="text-surface-800 text-base font-semibold">{title}</p>
      <p className="text-sm text-gray-400">{description}</p>
    </div>
  );
}
