// Browser reload token persistence fix
export class ReloadFix {
  static initializeBrowserReloadFix() {
    if (typeof window === 'undefined') return;

    // Save token to backup immediately when it changes
    const originalSetItem = localStorage.setItem.bind(localStorage);
    localStorage.setItem = function(key: string, value: string) {
      originalSetItem(key, value);
      
      if (key === 'authToken' && value) {
        // Also save to backup
        originalSetItem('authToken_backup', value);
      }
    };

    // Try to restore token on page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        ReloadFix.attemptTokenRecovery();
      }, 100);
    });

    // Handle page visibility change (browser switch)
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => {
          ReloadFix.attemptTokenRecovery();
        }, 100);
      }
    });

    // Handle beforeunload to ensure token is saved
    window.addEventListener('beforeunload', () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        localStorage.setItem('authToken_backup', token);
      }
    });
  }

  static attemptTokenRecovery(): boolean {
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const userData = localStorage.getItem('userData');

    // If main token is missing but backup exists
    if (!mainToken && backupToken) {
      try {
        // Validate backup token
        const parts = backupToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const now = Math.floor(Date.now() / 1000);
          
          if (payload.exp > now) {
            // Backup token is valid, restore it
            localStorage.setItem('authToken', backupToken);
            
            // Also try to restore user data if missing
            if (!userData && payload.user_id) {
              ReloadFix.attemptUserDataRecovery(payload);
            }
            
            return true;
          } else {
            localStorage.removeItem('authToken_backup');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        localStorage.removeItem('authToken_backup');
      }
    }

    // If both tokens exist but user data is missing, try to restore from server

    // If main token exists but is invalid, try to validate and fix
    if (mainToken && !ReloadFix.isTokenValid(mainToken)) {
      try {
        const parts = mainToken.split('.');
        if (parts.length === 3) {
          const payload = JSON.parse(atob(parts[1]));
          const now = Math.floor(Date.now() / 1000);
          
          if (payload.exp > now) {
            // Token is actually valid, just update backup
            localStorage.setItem('authToken_backup', mainToken);
            return true;
          } else {
            localStorage.removeItem('authToken');
            localStorage.removeItem('userData');
          }
        }
      } catch (error) {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }

    return false;
  }

  static attemptUserDataRecovery(tokenPayload: any) {
    // Try to restore basic user info from token payload
    if (tokenPayload.email && tokenPayload.user_id) {
      const basicUserData = {
        id: tokenPayload.user_id,
        email: tokenPayload.email,
        name: tokenPayload.name || 'User',
        // Add other basic fields that might be in token
      };
      
              try {
          localStorage.setItem('userData', JSON.stringify(basicUserData));
          localStorage.setItem('userDataTime', Date.now().toString());
        } catch (error) {
          // Error restoring user data
        }
    }
  }

  static isTokenValid(token: string): boolean {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return false;

      const payload = JSON.parse(atob(parts[1]));
      const now = Math.floor(Date.now() / 1000);
      
      // Token is valid if it expires more than 5 minutes from now
      return payload.exp > (now + 300);
    } catch {
      return false;
    }
  }

  static debugReloadState() {
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const userData = localStorage.getItem('userData');
    
    const token = localStorage.getItem('authToken');
    if (token) {
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        // Token payload available
      } catch (error) {
        // Token parsing error
      }
    }
    
    // User data state
    const userDataTime = localStorage.getItem('userDataTime');
    
    if (userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        // User data available
      } catch (error) {
        // User data parsing error
      }
    }

    // Test authentication endpoints
    ReloadFix.testAuthenticationEndpoints();
  }

  private static async testAuthenticationEndpoints() {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1';
    const token = localStorage.getItem('authToken');
    
    if (!token) {
      return;
    }

    const endpoints = [
      '/auth/profile',
      '/users/orders',
      '/users/favorites'
    ];

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(`${baseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          // Endpoint working
        } else {
          // Endpoint error
        }
      } catch (error: any) {
        // Network error
      }
    }
  }

  static forceTokenRecovery() {
    const recovered = ReloadFix.attemptTokenRecovery();
    if (recovered) {
      // Trigger a page refresh to reinitialize auth
      window.location.reload();
    }
    return recovered;
  }
}

// Auto-initialize in browser
if (typeof window !== 'undefined') {
  ReloadFix.initializeBrowserReloadFix();
}
