import { useEffect, useState } from 'react';
import { useGamification, type AchievementNotification } from '../../contexts/GamificationContext';

function Toast({ notification, onDismiss }: { notification: AchievementNotification; onDismiss: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const isLevelUp = notification.type === 'level-up';

  useEffect(() => {
    // Animate in
    const showTimer = setTimeout(() => setIsVisible(true), 50);

    // Auto dismiss after 5 seconds
    const dismissTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onDismiss, 300);
    }, 5000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(dismissTimer);
    };
  }, [onDismiss]);

  return (
    <div
      className={`transform transition-all duration-300 ${
        isVisible ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
      }`}
    >
      <div className={`flex items-center gap-3 p-4 rounded-xl backdrop-blur-xl shadow-lg ${
        isLevelUp
          ? 'bg-gradient-to-r from-primary-500/20 to-cyan-500/10 border border-primary-500/30 shadow-primary-500/10'
          : 'bg-gradient-to-r from-yellow-500/20 to-orange-500/10 border border-yellow-500/30 shadow-yellow-500/10'
      }`}>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl animate-bounce ${
          isLevelUp ? 'bg-primary-500/20' : 'bg-yellow-500/20'
        }`}>
          {notification.icon}
        </div>
        <div className="flex-1">
          <div className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${
            isLevelUp ? 'text-primary-400' : 'text-yellow-400'
          }`}>
            {isLevelUp ? 'Level Up!' : 'Achievement Unlocked!'}
          </div>
          <div className="font-bold text-dark-100">{notification.name}</div>
          <div className="text-sm text-dark-400">{notification.description}</div>
        </div>
        <button
          onClick={() => {
            setIsVisible(false);
            setTimeout(onDismiss, 300);
          }}
          className="p-1 rounded-lg hover:bg-dark-700/50 transition-colors text-dark-500 hover:text-dark-300"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function AchievementToastContainer() {
  const { notifications, dismissNotification } = useGamification();

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-50 flex flex-col gap-3 max-w-sm">
      {notifications.map((notification) => (
        <Toast
          key={notification.id}
          notification={notification}
          onDismiss={() => dismissNotification(notification.id)}
        />
      ))}
    </div>
  );
}
