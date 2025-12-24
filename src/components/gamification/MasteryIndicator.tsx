import type { MasteryLevel } from '../../types/gamification';
import { MASTERY_CONFIG } from '../../types/gamification';

interface MasteryIndicatorProps {
  level: MasteryLevel;
  size?: 'sm' | 'md';
  showLabel?: boolean;
}

export function MasteryIndicator({ level, size = 'sm', showLabel = false }: MasteryIndicatorProps) {
  const config = MASTERY_CONFIG[level];

  const sizeClasses = size === 'sm' ? 'w-4 h-4 text-xs' : 'w-6 h-6 text-sm';

  return (
    <div className="flex items-center gap-1.5" title={config.label}>
      <span className={`${sizeClasses} ${config.color} flex items-center justify-center`}>
        {config.icon}
      </span>
      {showLabel && (
        <span className={`text-xs ${config.color}`}>{config.label}</span>
      )}
    </div>
  );
}
