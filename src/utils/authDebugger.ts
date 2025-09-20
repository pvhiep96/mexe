// Debug utility for testing authentication scenarios
export class AuthDebugger {
  static simulateApiErrors = {
    orders401: false,
    wishlist401: false,
    profile401: false,
  };

  // Simulate API error for testing
  static enableOrdersError(enable: boolean = true) {
    this.simulateApiErrors.orders401 = enable;
  }

  static enableWishlistError(enable: boolean = true) {
    this.simulateApiErrors.wishlist401 = enable;
  }

  static enableProfileError(enable: boolean = true) {
    this.simulateApiErrors.profile401 = enable;
  }

  static shouldSimulateError(endpoint: string): boolean {
    if (endpoint.includes('/users/orders') && this.simulateApiErrors.orders401) {
      return true;
    }
    if (endpoint.includes('/users/favorites') && this.simulateApiErrors.wishlist401) {
      return true;
    }
    if (endpoint.includes('/auth/profile') && this.simulateApiErrors.profile401) {
      return true;
    }
    return false;
  }

  static logTokenState() {
    const token = localStorage.getItem('authToken');
    const backup = localStorage.getItem('authToken_backup');
      hasMainToken: !!token,
      hasBackupToken: !!backup,
      mainTokenLength: token ? token.length : 0,
      backupTokenLength: backup ? backup.length : 0,
    });
  }

  static async testAuthAPI() {
    const { apiClient } = await import('@/services/api');
    
    
    // Test debug endpoints
    const authTest = await apiClient.debugAuth();
    
    const protectedTest = await apiClient.debugProtectedCall();

    const loginFormat = await apiClient.debugLoginFormat();
    
    return { authTest, protectedTest, loginFormat };
  }

  static testAuthFlow() {
  }
}

// Token debugging utility
export class TokenDebugger {
  private static interval: NodeJS.Timeout | null = null;
  private static recoveryAttempts = 0;
  private static maxRecoveryAttempts = 3;

  static startMonitoring() {
    if (typeof window === 'undefined') return;


    // Log current token state
    this.logTokenState();

    // Monitor token every 30 seconds
    this.interval = setInterval(() => {
      this.logTokenState();
      this.checkTokenHealth();
    }, 30000);

    // Monitor localStorage changes
    window.addEventListener('storage', (e) => {
      if (e.key === 'authToken') {
          key: e.key,
          oldValue: e.oldValue ? `${e.oldValue.substring(0, 20)}...` : null,
          newValue: e.newValue ? `${e.newValue.substring(0, 20)}...` : null,
        });
      }
    });

    // Monitor page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        this.logTokenState();
        this.checkTokenHealth();
      }
    });
  }

  static stopMonitoring() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null;
    }
  }

  static logTokenState() {
    if (typeof window === 'undefined') return;

    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const lastValid = localStorage.getItem('lastValidToken');

    console.group('📊 Token State Report');
      'Main token:',
      mainToken
        ? `${mainToken.substring(0, 30)}... (${mainToken.length} chars)`
        : 'MISSING'
    );
      'Backup token:',
      backupToken
        ? `${backupToken.substring(0, 30)}... (${backupToken.length} chars)`
        : 'MISSING'
    );
      'Last valid time:',
      lastValid ? new Date(parseInt(lastValid)).toLocaleString() : 'UNKNOWN'
    );

    if (mainToken) {
      try {
        const payload = JSON.parse(atob(mainToken.split('.')[1]));
        const now = Math.floor(Date.now() / 1000);
        const timeUntilExpiry = payload.exp - now;
        const hoursUntilExpiry = timeUntilExpiry / 3600;

          userId: payload.user_id,
          email: payload.email,
          issuedAt: new Date(payload.iat * 1000).toLocaleString(),
          expiresAt: new Date(payload.exp * 1000).toLocaleString(),
          hoursUntilExpiry: hoursUntilExpiry.toFixed(2),
          isExpired: timeUntilExpiry <= 0,
        });

        if (timeUntilExpiry <= 0) {
        } else if (timeUntilExpiry < 3600) {
        }
      } catch (error) {
      }
    }

    console.groupEnd();
  }

  static checkTokenHealth() {
    if (typeof window === 'undefined') return;

    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');

    // Check if main token is missing but backup exists
    if (!mainToken && backupToken) {
      this.attemptTokenRecovery();
    }

    // Check if both tokens are missing
    if (!mainToken && !backupToken) {
      this.recoveryAttempts++;
      
      if (this.recoveryAttempts <= this.maxRecoveryAttempts) {
        // Could implement additional recovery logic here
      } else {
      }
    }
  }

  static attemptTokenRecovery() {
    if (typeof window === 'undefined') return;

    const backupToken = localStorage.getItem('authToken_backup');
    if (backupToken) {
      try {
        // Validate backup token
        const parts = backupToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const now = Math.floor(Date.now() / 1000);
          
          if (payload.exp > now) {
            // Backup token is valid, restore it
            localStorage.setItem('authToken', backupToken);
            this.recoveryAttempts = 0;
            return;
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('authToken_backup');
          }
        }
      } catch (error) {
        // Remove corrupted tokens
        localStorage.removeItem('authToken');
        localStorage.removeItem('authToken_backup');
      }
    }
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
      recoveryAttempts: this.recoveryAttempts,
      timestamp: new Date().toISOString(),
    };
  }

  static resetRecoveryAttempts() {
    this.recoveryAttempts = 0;
  }
}

// Make it available globally in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).AuthDebugger = AuthDebugger;
}

// // Auto-start monitoring in development
// if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
//   TokenDebugger.startMonitoring();
// }