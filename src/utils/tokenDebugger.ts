// Token debugging utility
export class TokenDebugger {
  private static interval: NodeJS.Timeout | null = null;
  
  static startMonitoring() {
    if (typeof window === 'undefined') return;
    
    console.log('🔍 Starting token monitoring...');
    
    // Log current token state
    this.logTokenState();
    
    // Monitor token every 30 seconds
    this.interval = setInterval(() => {
      this.logTokenState();
    }, 30000);
    
    // Monitor localStorage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'authToken') {
        console.log('📢 localStorage change detected:', {
          key: e.key,
          oldValue: e.oldValue ? `${e.oldValue.substring(0, 20)}...` : null,
          newValue: e.newValue ? `${e.newValue.substring(0, 20)}...` : null
        });
      }
    });
  }
  
  static stopMonitoring() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
      console.log('🛑 Token monitoring stopped');
    }
  }
  
  static logTokenState() {
    if (typeof window === 'undefined') return;
    
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const lastValid = localStorage.getItem('lastValidToken');
    
    console.group('📊 Token State Report');
    console.log('Main token:', mainToken ? `${mainToken.substring(0, 30)}... (${mainToken.length} chars)` : 'MISSING');
    console.log('Backup token:', backupToken ? `${backupToken.substring(0, 30)}... (${backupToken.length} chars)` : 'MISSING');
    console.log('Last valid time:', lastValid ? new Date(parseInt(lastValid)).toLocaleString() : 'UNKNOWN');
    
    if (mainToken) {
      try {
        const payload = JSON.parse(atob(mainToken.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = payload.exp - now;
        const hoursUntilExpiry = timeUntilExpiry / 3600;
        
        console.log('Token details:', {
          userId: payload.user_id,
          email: payload.email,
          issuedAt: new Date(payload.iat * 1000).toLocaleString(),
          expiresAt: new Date(payload.exp * 1000).toLocaleString(),
          hoursUntilExpiry: hoursUntilExpiry.toFixed(2),
          isExpired: timeUntilExpiry <= 0
        });
        
        if (timeUntilExpiry <= 0) {
          console.warn('⚠️ TOKEN IS EXPIRED!');
        } else if (timeUntilExpiry < 3600) {
          console.warn('⚠️ TOKEN EXPIRES WITHIN 1 HOUR!');
        }
      } catch (error) {
        console.error('❌ Error parsing token:', error);
      }
    }
    
    console.groupEnd();
  }
  
  static exportTokenInfo() {
    if (typeof window === 'undefined') return null;
    
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const lastValid = localStorage.getItem('lastValidToken');
    
    return {
      hasMainToken: !!mainToken,
      hasBackupToken: !!backupToken,
      lastValidTime: lastValid,
      tokenLength: mainToken?.length || 0,
      timestamp: new Date().toISOString()
    };
  }
}

// Auto-start monitoring in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  TokenDebugger.startMonitoring();
}
