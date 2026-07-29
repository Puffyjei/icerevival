import { useState, useEffect } from 'react';

interface ServerStatusProps {
  mode: 'badge' | 'panel';
}

interface ServerStatusData {
  online: boolean;
  players?: {
    online: number;
    max: number;
    list?: Array<{ name: string; uuid: string }>;
  };
}

export function ServerStatus({ mode }: ServerStatusProps) {
  const [status, setStatus] = useState<ServerStatusData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastChecked, setLastChecked] = useState<Date | null>(null);

  const fetchStatus = async () => {
    try {
      setLoading(true);
      setError(false);
      const response = await fetch('https://api.mcsrvstat.us/3/icerevival.aternos.me');
      const data = await response.json();
      setStatus(data);
      setLastChecked(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch server status:', err);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      fetchStatus();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  // Calculate seconds since last check
  const [secondsAgo, setSecondsAgo] = useState(0);
  useEffect(() => {
    if (!lastChecked) return;
    
    const updateTimer = () => {
      setSecondsAgo(Math.floor((Date.now() - lastChecked.getTime()) / 1000));
    };
    
    updateTimer();
    const interval = setInterval(updateTimer, 1000);
    return () => clearInterval(interval);
  }, [lastChecked]);

  if (mode === 'badge') {
    return (
      <div 
        className="inline-flex items-center gap-2 bg-black/30 backdrop-blur-sm border-2 border-white/20 px-4 py-2"
        data-testid="server-status-badge"
      >
        {loading ? (
          <>
            <div className="w-2 h-2 rounded-full bg-gray-400" data-testid="status-indicator-loading" />
            <span 
              className="text-sm text-blue-200"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Checking...
            </span>
          </>
        ) : error ? (
          <>
            <div className="w-2 h-2 rounded-full bg-gray-400" data-testid="status-indicator-error" />
            <span 
              className="text-sm text-blue-200"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Unknown
            </span>
          </>
        ) : status?.online ? (
          <>
            <div 
              className="w-2 h-2 rounded-full bg-green-500 animate-pulse" 
              data-testid="status-indicator-online"
            />
            <span 
              className="text-sm text-green-300"
              style={{ fontFamily: 'Minecraft, monospace' }}
              data-testid="text-online-count"
            >
              Online · {status.players?.online || 0}/{status.players?.max || 20}
            </span>
          </>
        ) : (
          <>
            <div className="w-2 h-2 rounded-full bg-red-500" data-testid="status-indicator-offline" />
            <span 
              className="text-sm text-red-300"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Offline
            </span>
          </>
        )}
      </div>
    );
  }

  // Panel mode
  return (
    <div 
      className="bg-card border-4 border-[#3a2a1a] p-6"
      style={{
        borderTopColor: '#6a5a4a',
        borderLeftColor: '#6a5a4a',
        borderRightColor: '#2a1a0a',
        borderBottomColor: '#2a1a0a',
      }}
      data-testid="server-status-panel"
    >
      <h3 
        className="text-2xl font-bold mb-4 text-primary"
        style={{ fontFamily: 'Minecraft, monospace' }}
      >
        Server Status
      </h3>

      {loading ? (
        <div className="flex items-center gap-3 mb-4">
          <div className="w-4 h-4 rounded-full bg-gray-400" />
          <p 
            className="text-lg text-muted-foreground"
            style={{ fontFamily: 'Minecraft, monospace' }}
          >
            Checking server...
          </p>
        </div>
      ) : error ? (
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-4 h-4 rounded-full bg-gray-400" />
            <p 
              className="text-lg text-muted-foreground"
              style={{ fontFamily: 'Minecraft, monospace' }}
            >
              Unable to check status
            </p>
          </div>
          <p className="text-sm text-muted-foreground ml-7">
            The status API may be temporarily unavailable.
          </p>
        </div>
      ) : status?.online ? (
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-4 h-4 rounded-full bg-green-500 animate-pulse" />
            <p 
              className="text-lg text-green-400 font-bold"
              style={{ fontFamily: 'Minecraft, monospace' }}
              data-testid="text-server-online"
            >
              Online - {status.players?.online || 0}/{status.players?.max || 20} players
            </p>
          </div>

          {status.players?.list && status.players.list.length > 0 && (
            <div className="ml-7 space-y-2">
              <p 
                className="text-sm text-muted-foreground mb-2"
                style={{ fontFamily: 'Minecraft, monospace' }}
              >
                Players online:
              </p>
              <div className="space-y-1">
                {status.players.list.map((player, idx) => (
                  <div 
                    key={player.uuid}
                    className="bg-background/50 border-2 border-primary/20 px-3 py-1 inline-block mr-2"
                    data-testid={`player-tag-${idx}`}
                  >
                    <span 
                      className="text-sm text-foreground"
                      style={{ fontFamily: 'Minecraft, monospace' }}
                    >
                      {player.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-4 h-4 rounded-full bg-red-500" />
            <p 
              className="text-lg text-red-400 font-bold"
              style={{ fontFamily: 'Minecraft, monospace' }}
              data-testid="text-server-offline"
            >
              Offline
            </p>
          </div>
          <p className="text-sm text-muted-foreground ml-7">
            The server may be sleeping. Use the Wake button to start it.
          </p>
        </div>
      )}

      {lastChecked && (
        <p 
          className="text-xs text-muted-foreground mt-4 pt-4 border-t border-border"
          data-testid="text-last-checked"
        >
          Last checked: {secondsAgo === 0 ? 'just now' : `${secondsAgo} second${secondsAgo !== 1 ? 's' : ''} ago`}
        </p>
      )}
    </div>
  );
}
