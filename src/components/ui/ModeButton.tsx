import { cn } from '@/lib/utils';

interface ModeButtonProps {
  onClick: () => void;
  isDark: boolean;
  className?: string;
}

export const ModeButton = ({ onClick, isDark, className }: ModeButtonProps) => {
  return (
    <button
      className={cn(
        'bg-surface-100 hover:bg-surface-200 focus:ring-brand-500 rounded-md p-2 focus:ring-2 focus:ring-offset-2 focus:outline-none',
        className
      )}
      onClick={onClick}
      aria-label={isDark ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
    >
      <svg
        className="text-surface-800 ml-auto h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        {isDark ? (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        ) : (
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"
          />
        )}
      </svg>
    </button>
  );
};
