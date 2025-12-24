/**
 * NostrConnectButton - Button to connect/disconnect Nostr wallet
 */

import { useNostrAuth } from '../../contexts/NostrAuthContext';
import { shortenNpub } from '../../nostr/utils';

interface NostrConnectButtonProps {
  className?: string;
  showDisplayName?: boolean;
}

export function NostrConnectButton({
  className = '',
  showDisplayName = true,
}: NostrConnectButtonProps) {
  const {
    isAuthenticated,
    isConnecting,
    npub,
    displayName,
    hasExtension,
    extensionChecked,
    error,
    connect,
    disconnect,
    clearError,
  } = useNostrAuth();

  // Show loading while checking for extension
  if (!extensionChecked) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="w-4 h-4 border-2 border-dark-400 border-t-transparent rounded-full animate-spin" />
        <span className="text-dark-400 text-sm">Checking...</span>
      </div>
    );
  }

  // Not authenticated - show connect button
  if (!isAuthenticated) {
    return (
      <div className={`flex flex-col items-center gap-2 ${className}`}>
        <button
          onClick={() => {
            console.log('[NostrConnectButton] Button clicked!');
            connect();
          }}
          disabled={isConnecting || !hasExtension}
          className={`
            flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
            transition-all duration-200
            ${
              !hasExtension
                ? 'bg-dark-700 text-dark-400 cursor-not-allowed'
                : isConnecting
                  ? 'bg-primary-600 text-white opacity-70 cursor-wait'
                  : 'bg-primary-600 hover:bg-primary-500 text-white shadow-lg shadow-primary-600/25'
            }
          `}
        >
          {isConnecting ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Connecting...
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
              Connect with Nostr
            </>
          )}
        </button>

        {!hasExtension && (
          <p className="text-xs text-dark-400 text-center max-w-xs">
            Install a Nostr extension like{' '}
            <a
              href="https://github.com/nickytonline/nos2x"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:underline"
            >
              nos2x
            </a>{' '}
            or{' '}
            <a
              href="https://getalby.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-400 hover:underline"
            >
              Alby
            </a>{' '}
            to connect
          </p>
        )}

        {error && (
          <div className="flex items-center gap-2 text-xs text-red-400">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="text-dark-400 hover:text-dark-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        )}
      </div>
    );
  }

  // Authenticated - show user info and disconnect
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex items-center gap-2">
        {/* Avatar/identicon placeholder */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
          {displayName?.[0]?.toUpperCase() || npub?.[5]?.toUpperCase() || '?'}
        </div>

        <div className="flex flex-col">
          {showDisplayName && displayName && (
            <span className="text-sm font-medium text-dark-100">{displayName}</span>
          )}
          <span className="text-xs text-dark-400 font-mono">
            {npub ? shortenNpub(npub, 6) : '...'}
          </span>
        </div>
      </div>

      <button
        onClick={disconnect}
        className="p-1.5 rounded-lg text-dark-400 hover:text-dark-200 hover:bg-dark-700/50 transition-colors"
        title="Disconnect"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
      </button>
    </div>
  );
}
