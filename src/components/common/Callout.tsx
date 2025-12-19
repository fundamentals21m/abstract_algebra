import type { ReactNode } from 'react';

type CalloutType = 'info' | 'success' | 'warning' | 'error' | 'definition' | 'theorem' | 'example';

interface CalloutProps {
  type?: CalloutType;
  title?: string;
  children: ReactNode;
  className?: string;
}

const calloutStyles: Record<CalloutType, { bg: string; border: string; text: string; icon: string }> = {
  info: {
    bg: 'bg-blue-950/30',
    border: 'border-blue-500',
    text: 'text-blue-200',
    icon: 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  success: {
    bg: 'bg-green-950/30',
    border: 'border-green-500',
    text: 'text-green-200',
    icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  warning: {
    bg: 'bg-amber-950/30',
    border: 'border-amber-500',
    text: 'text-amber-200',
    icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z',
  },
  error: {
    bg: 'bg-red-950/30',
    border: 'border-red-500',
    text: 'text-red-200',
    icon: 'M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z',
  },
  definition: {
    bg: 'bg-purple-950/30',
    border: 'border-purple-500',
    text: 'text-purple-200',
    icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
  },
  theorem: {
    bg: 'bg-indigo-950/30',
    border: 'border-indigo-500',
    text: 'text-indigo-200',
    icon: 'M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z',
  },
  example: {
    bg: 'bg-teal-950/30',
    border: 'border-teal-500',
    text: 'text-teal-200',
    icon: 'M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z',
  },
};

const defaultTitles: Record<CalloutType, string> = {
  info: 'Note',
  success: 'Success',
  warning: 'Warning',
  error: 'Error',
  definition: 'Definition',
  theorem: 'Theorem',
  example: 'Example',
};

export function Callout({ type = 'info', title, children, className = '' }: CalloutProps) {
  const styles = calloutStyles[type];
  const displayTitle = title ?? defaultTitles[type];

  return (
    <div
      className={`rounded-lg border-l-4 p-4 my-6 ${styles.bg} ${styles.border} ${className}`}
    >
      <div className="flex items-start gap-3">
        <svg
          className={`w-5 h-5 mt-0.5 flex-shrink-0 ${styles.text}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={styles.icon}
          />
        </svg>
        <div className="flex-1">
          {displayTitle && (
            <h4 className={`font-semibold mb-1 ${styles.text}`}>{displayTitle}</h4>
          )}
          <div className={`text-sm ${styles.text} opacity-90`}>{children}</div>
        </div>
      </div>
    </div>
  );
}
