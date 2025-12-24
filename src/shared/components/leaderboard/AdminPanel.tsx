/**
 * AdminPanel - Admin controls for managing users and leaderboard
 */

import { useState, useEffect, useCallback } from 'react';
import { httpsCallable } from 'firebase/functions';
import { getFirebaseFunctions, isFirebaseConfigured } from '../../firebase/config';
import { useNostrAuth } from '../../contexts/NostrAuthContext';
import { shortenNpub } from '../../nostr/utils';

interface AdminLog {
  id: string;
  action: string;
  targetNpub: string;
  adminNpub: string;
  reason?: string;
  timestamp: { seconds: number };
}

interface AdminPanelProps {
  className?: string;
}

export function AdminPanel({ className = '' }: AdminPanelProps) {
  const { isAdmin } = useNostrAuth();
  const [targetNpub, setTargetNpub] = useState('');
  const [reason, setReason] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [logs, setLogs] = useState<AdminLog[]>([]);
  const [showLogs, setShowLogs] = useState(false);

  // Load admin logs
  const loadLogs = useCallback(async () => {
    if (!isFirebaseConfigured() || !isAdmin) return;

    try {
      const functions = getFirebaseFunctions();
      const getAdminLogs = httpsCallable<{ limit: number }, { logs: AdminLog[] }>(
        functions,
        'getAdminLogs'
      );
      const result = await getAdminLogs({ limit: 20 });
      setLogs(result.data.logs);
    } catch (error) {
      console.error('Failed to load admin logs:', error);
    }
  }, [isAdmin]);

  useEffect(() => {
    if (showLogs) {
      loadLogs();
    }
  }, [showLogs, loadLogs]);

  // Ban user
  const handleBan = async () => {
    if (!targetNpub.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid npub' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const banUser = httpsCallable<
        { targetNpub: string; reason?: string },
        { success: boolean }
      >(functions, 'banUser');

      await banUser({ targetNpub: targetNpub.trim(), reason: reason.trim() || undefined });
      setMessage({ type: 'success', text: 'User banned successfully' });
      setTargetNpub('');
      setReason('');
      if (showLogs) loadLogs();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to ban user',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Unban user
  const handleUnban = async () => {
    if (!targetNpub.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid npub' });
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const unbanUser = httpsCallable<{ targetNpub: string }, { success: boolean }>(
        functions,
        'unbanUser'
      );

      await unbanUser({ targetNpub: targetNpub.trim() });
      setMessage({ type: 'success', text: 'User unbanned successfully' });
      setTargetNpub('');
      if (showLogs) loadLogs();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to unban user',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Reset user scores
  const handleResetScores = async () => {
    if (!targetNpub.trim()) {
      setMessage({ type: 'error', text: 'Please enter a valid npub' });
      return;
    }

    if (!confirm('Are you sure you want to reset this user\'s scores? This cannot be undone.')) {
      return;
    }

    setIsLoading(true);
    setMessage(null);

    try {
      const functions = getFirebaseFunctions();
      const resetUserScores = httpsCallable<
        { targetNpub: string; reason?: string },
        { success: boolean }
      >(functions, 'resetUserScores');

      await resetUserScores({ targetNpub: targetNpub.trim(), reason: reason.trim() || undefined });
      setMessage({ type: 'success', text: 'User scores reset successfully' });
      setTargetNpub('');
      setReason('');
      if (showLogs) loadLogs();
    } catch (error) {
      setMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Failed to reset scores',
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Format timestamp
  const formatTimestamp = (timestamp: { seconds: number }) => {
    return new Date(timestamp.seconds * 1000).toLocaleString();
  };

  if (!isAdmin) {
    return null;
  }

  return (
    <div className={`p-5 rounded-2xl bg-dark-800/60 border border-dark-700/50 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-dark-100 flex items-center gap-2">
          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
          Admin Panel
        </h3>
        <span className="text-xs bg-yellow-500/20 text-yellow-400 px-2 py-0.5 rounded">
          Admin
        </span>
      </div>

      {/* Target input */}
      <div className="space-y-3 mb-4">
        <div>
          <label className="block text-xs text-dark-400 mb-1">Target User (npub)</label>
          <input
            type="text"
            value={targetNpub}
            onChange={(e) => setTargetNpub(e.target.value)}
            placeholder="npub1..."
            className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-dark-600 text-dark-100 text-sm font-mono focus:outline-none focus:border-primary-500"
          />
        </div>

        <div>
          <label className="block text-xs text-dark-400 mb-1">Reason (optional)</label>
          <input
            type="text"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Reason for action"
            className="w-full px-3 py-2 rounded-lg bg-dark-900 border border-dark-600 text-dark-100 text-sm focus:outline-none focus:border-primary-500"
          />
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={handleBan}
          disabled={isLoading}
          className="flex-1 px-3 py-2 rounded-lg bg-red-600/20 border border-red-500/30 text-red-400 text-sm font-medium hover:bg-red-600/30 transition-colors disabled:opacity-50"
        >
          Ban User
        </button>
        <button
          onClick={handleUnban}
          disabled={isLoading}
          className="flex-1 px-3 py-2 rounded-lg bg-green-600/20 border border-green-500/30 text-green-400 text-sm font-medium hover:bg-green-600/30 transition-colors disabled:opacity-50"
        >
          Unban User
        </button>
        <button
          onClick={handleResetScores}
          disabled={isLoading}
          className="flex-1 px-3 py-2 rounded-lg bg-orange-600/20 border border-orange-500/30 text-orange-400 text-sm font-medium hover:bg-orange-600/30 transition-colors disabled:opacity-50"
        >
          Reset Scores
        </button>
      </div>

      {/* Message */}
      {message && (
        <div
          className={`p-3 rounded-lg text-sm mb-4 ${
            message.type === 'success'
              ? 'bg-green-500/10 border border-green-500/30 text-green-400'
              : 'bg-red-500/10 border border-red-500/30 text-red-400'
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Admin logs toggle */}
      <button
        onClick={() => setShowLogs(!showLogs)}
        className="w-full text-sm text-dark-400 hover:text-dark-200 transition-colors flex items-center justify-center gap-1"
      >
        {showLogs ? 'Hide' : 'Show'} Admin Logs
        <svg
          className={`w-4 h-4 transition-transform ${showLogs ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Admin logs */}
      {showLogs && (
        <div className="mt-4 pt-4 border-t border-dark-700/50">
          <h4 className="text-sm font-medium text-dark-200 mb-2">Recent Actions</h4>
          {logs.length === 0 ? (
            <p className="text-xs text-dark-500">No admin actions recorded</p>
          ) : (
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {logs.map((log: AdminLog) => (
                <div
                  key={log.id}
                  className="p-2 rounded-lg bg-dark-900/50 text-xs"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span
                      className={`font-medium ${
                        log.action === 'ban'
                          ? 'text-red-400'
                          : log.action === 'unban'
                            ? 'text-green-400'
                            : 'text-orange-400'
                      }`}
                    >
                      {log.action.toUpperCase()}
                    </span>
                    <span className="text-dark-500">{formatTimestamp(log.timestamp)}</span>
                  </div>
                  <div className="text-dark-400">
                    Target: <span className="font-mono">{shortenNpub(log.targetNpub, 8)}</span>
                  </div>
                  {log.reason && (
                    <div className="text-dark-500 mt-1">Reason: {log.reason}</div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
