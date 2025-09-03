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
    console.log(`🧪 Orders 401 simulation: ${enable ? 'ENABLED' : 'DISABLED'}`);
  }

  static enableWishlistError(enable: boolean = true) {
    this.simulateApiErrors.wishlist401 = enable;
    console.log(`🧪 Wishlist 401 simulation: ${enable ? 'ENABLED' : 'DISABLED'}`);
  }

  static enableProfileError(enable: boolean = true) {
    this.simulateApiErrors.profile401 = enable;
    console.log(`🧪 Profile 401 simulation: ${enable ? 'ENABLED' : 'DISABLED'}`);
  }

  static shouldSimulateError(endpoint: string): boolean {
    if (endpoint.includes('/users/orders') && this.simulateApiErrors.orders401) {
      console.log('🧪 Simulating 401 error for orders endpoint');
      return true;
    }
    if (endpoint.includes('/users/favorites') && this.simulateApiErrors.wishlist401) {
      console.log('🧪 Simulating 401 error for wishlist endpoint');
      return true;
    }
    if (endpoint.includes('/auth/profile') && this.simulateApiErrors.profile401) {
      console.log('🧪 Simulating 401 error for profile endpoint');
      return true;
    }
    return false;
  }

  static logTokenState() {
    const token = localStorage.getItem('authToken');
    const backup = localStorage.getItem('authToken_backup');
    console.log('🔍 Token Debug State:', {
      hasMainToken: !!token,
      hasBackupToken: !!backup,
      mainTokenLength: token ? token.length : 0,
      backupTokenLength: backup ? backup.length : 0,
    });
  }

  static async testAuthAPI() {
    const { apiClient } = await import('@/services/api');
    
    console.log('🧪 Testing API Authentication:');
    console.log('Token state:', this.logTokenState());
    
    // Test debug endpoints
    console.log('Testing auth debug endpoint...');
    const authTest = await apiClient.debugAuth();
    console.log('Auth test result:', authTest);
    
    console.log('Testing protected endpoint...');
    const protectedTest = await apiClient.debugProtectedCall();
    console.log('Protected test result:', protectedTest);

    console.log('Testing login format...');
    const loginFormat = await apiClient.debugLoginFormat();
    console.log('Login format result:', loginFormat);
    
    return { authTest, protectedTest, loginFormat };
  }

  static testAuthFlow() {
    console.log('🧪 Testing authentication flow scenarios:');
    console.log('1. Call AuthDebugger.enableOrdersError() to test orders tab');
    console.log('2. Call AuthDebugger.enableWishlistError() to test wishlist tab');
    console.log('3. Call AuthDebugger.enableProfileError() to test actual logout');
    console.log('4. Call AuthDebugger.logTokenState() to check token status');
    console.log('5. Call AuthDebugger.testAuthAPI() to test API endpoints');
  }
}

// Token debugging utility
export class TokenDebugger {
  private static interval: NodeJS.Timeout | null = null;
  private static recoveryAttempts = 0;
  private static maxRecoveryAttempts = 3;

  static startMonitoring() {
    if (typeof window === 'undefined') return;

    console.log('🔍 Starting token monitoring...');

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
        console.log('📢 localStorage change detected:', {
          key: e.key,
          oldValue: e.oldValue ? `${e.oldValue.substring(0, 20)}...` : null,
          newValue: e.newValue ? `${e.newValue.substring(0, 20)}...` : null,
        });
      }
    });

    // Monitor page visibility changes
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        console.log('👁️ Page became visible, checking token state...');
        this.logTokenState();
        this.checkTokenHealth();
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
    console.log(
      'Main token:',
      mainToken
        ? `${mainToken.substring(0, 30)}... (${mainToken.length} chars)`
        : 'MISSING'
    );
    console.log(
      'Backup token:',
      backupToken
        ? `${backupToken.substring(0, 30)}... (${backupToken.length} chars)`
        : 'MISSING'
    );
    console.log(
      'Last valid time:',
      lastValid ? new Date(parseInt(lastValid)).toLocaleString() : 'UNKNOWN'
    );

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
          isExpired: timeUntilExpiry <= 0,
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

  static checkTokenHealth() {
    if (typeof window === 'undefined') return;

    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');

    // Check if main token is missing but backup exists
    if (!mainToken && backupToken) {
      console.warn('⚠️ Main token missing but backup exists, attempting recovery...');
      this.attemptTokenRecovery();
    }

    // Check if both tokens are missing
    if (!mainToken && !backupToken) {
      console.error('🚨 CRITICAL: Both main and backup tokens are missing!');
      this.recoveryAttempts++;
      
      if (this.recoveryAttempts <= this.maxRecoveryAttempts) {
        console.log(`🔄 Recovery attempt ${this.recoveryAttempts}/${this.maxRecoveryAttempts}`);
        // Could implement additional recovery logic here
      } else {
        console.error('💀 Max recovery attempts reached, token state is corrupted');
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
            console.log('✅ Token recovery successful');
            this.recoveryAttempts = 0;
            return;
          } else {
            console.warn('⚠️ Backup token is expired, removing both tokens');
            localStorage.removeItem('authToken');
            localStorage.removeItem('authToken_backup');
          }
        }
      } catch (error) {
        console.error('❌ Error during token recovery:', error);
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
    console.log('🔄 Recovery attempts reset');
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