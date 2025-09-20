// Reload page testing utility
export class ReloadTester {
  private static testResults: any[] = [];

  static async testReloadIssue() {
    this.testResults = [];

    try {
      await this.testTokenPersistence();
      await this.testUserDataPersistence();
      await this.testAuthenticationFlow();
      await this.testLocalStorageState();
      
      this.printTestResults();
    } catch (error) {
    }
  }

  static async testTokenPersistence() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Token Persistence', 'SKIPPED', 'Server-side rendering');
        return;
      }

      const mainToken = localStorage.getItem('authToken');
      const backupToken = localStorage.getItem('authToken_backup');
      const lastValidTime = localStorage.getItem('lastValidToken');

      if (mainToken) {
        try {
          const parts = mainToken.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = payload.exp - now;
            
            if (timeUntilExpiry > 0) {
              this.addTestResult('Token Persistence', 'PASSED', `Main token valid, expires in ${(timeUntilExpiry / 3600).toFixed(2)}h`);
            } else {
              this.addTestResult('Token Persistence', 'FAILED', 'Main token expired');
            }
          } else {
            this.addTestResult('Token Persistence', 'FAILED', 'Invalid main token format');
          }
        } catch (error) {
          this.addTestResult('Token Persistence', 'ERROR', 'Main token parsing failed');
        }
      } else {
        this.addTestResult('Token Persistence', 'FAILED', 'No main token found');
      }

      if (backupToken) {
        this.addTestResult('Backup Token', 'PASSED', 'Backup token exists');
      } else {
        this.addTestResult('Backup Token', 'FAILED', 'No backup token');
      }

      if (lastValidTime) {
        const age = Date.now() - parseInt(lastValidTime);
        const ageHours = (age / (1000 * 60 * 60)).toFixed(2);
        this.addTestResult('Last Valid Time', 'PASSED', `Token was valid ${ageHours}h ago`);
      } else {
        this.addTestResult('Last Valid Time', 'FAILED', 'No last valid time recorded');
      }
    } catch (error) {
      this.addTestResult('Token Persistence', 'ERROR', error.message);
    }
  }

  static async testUserDataPersistence() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('User Data Persistence', 'SKIPPED', 'Server-side rendering');
        return;
      }

      const userData = localStorage.getItem('userData');
      const userDataTime = localStorage.getItem('userDataTime');

      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
          if (parsedUserData.email && parsedUserData.name) {
            this.addTestResult('User Data Persistence', 'PASSED', `User data exists: ${parsedUserData.email}`);
          } else {
            this.addTestResult('User Data Persistence', 'FAILED', 'User data incomplete');
          }
        } catch (error) {
          this.addTestResult('User Data Persistence', 'ERROR', 'User data parsing failed');
        }
      } else {
        this.addTestResult('User Data Persistence', 'FAILED', 'No user data found');
      }

      if (userDataTime) {
        const age = Date.now() - parseInt(userDataTime);
        const ageHours = (age / (1000 * 60 * 60)).toFixed(2);
        this.addTestResult('User Data Age', 'PASSED', `User data is ${ageHours}h old`);
      } else {
        this.addTestResult('User Data Age', 'FAILED', 'No user data timestamp');
      }
    } catch (error) {
      this.addTestResult('User Data Persistence', 'ERROR', error.message);
    }
  }

  static async testAuthenticationFlow() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Authentication Flow', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test the authentication flow
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1';
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        this.addTestResult('Authentication Flow', 'FAILED', 'No token available');
        return;
      }

      // Test profile endpoint
      try {
        const response = await fetch(`${baseUrl}/auth/profile`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          if (data.success && data.user) {
            this.addTestResult('Authentication Flow', 'PASSED', `Profile verified: ${data.user.email}`);
          } else {
            this.addTestResult('Authentication Flow', 'FAILED', 'Profile response invalid');
          }
        } else if (response.status === 401) {
          this.addTestResult('Authentication Flow', 'FAILED', '401 Unauthorized - Token invalid');
        } else {
          this.addTestResult('Authentication Flow', 'FAILED', `HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        this.addTestResult('Authentication Flow', 'ERROR', error.message);
      }
    } catch (error) {
      this.addTestResult('Authentication Flow', 'ERROR', error.message);
    }
  }

  static async testLocalStorageState() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('LocalStorage State', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Check all relevant localStorage items
      const localStorageItems = [
        'authToken',
        'authToken_backup',
        'lastValidToken',
        'userData',
        'userDataTime'
      ];

      let foundItems = 0;
      let totalSize = 0;

      localStorageItems.forEach(key => {
        const value = localStorage.getItem(key);
        if (value) {
          foundItems++;
          totalSize += value.length;
        } else {
        }
      });

      if (foundItems > 0) {
        this.addTestResult('LocalStorage State', 'PASSED', `${foundItems}/${localStorageItems.length} items found, total size: ${totalSize} chars`);
      } else {
        this.addTestResult('LocalStorage State', 'FAILED', 'No authentication data found');
      }

      // Check localStorage quota
      try {
        const testKey = 'test_quota';
        const testValue = 'x'.repeat(1000);
        localStorage.setItem(testKey, testValue);
        localStorage.removeItem(testKey);
        this.addTestResult('LocalStorage Quota', 'PASSED', 'LocalStorage is accessible');
      } catch (error) {
        this.addTestResult('LocalStorage Quota', 'FAILED', 'LocalStorage quota exceeded or not accessible');
      }
    } catch (error) {
      this.addTestResult('LocalStorage State', 'ERROR', error.message);
    }
  }

  static debugReloadIssue() {
    
    try {
      if (typeof window === 'undefined') {
        return;
      }

      console.group('🔍 Reload Issue Debug Info');
      
      // Token state
      const mainToken = localStorage.getItem('authToken');
      const backupToken = localStorage.getItem('authToken_backup');
      
      if (mainToken) {
        try {
          const parts = mainToken.split('.');
          const payload = JSON.parse(atob(parts[1]));
        } catch (error) {
        }
      }
      
      // User data state
      const userData = localStorage.getItem('userData');
      const userDataTime = localStorage.getItem('userDataTime');
      
      if (userData) {
        try {
          const parsedUserData = JSON.parse(userData);
        } catch (error) {
        }
      }
      
      console.groupEnd();

      // Test authentication endpoints
      this.testAuthenticationEndpoints();
    } catch (error) {
    }
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
          const data = await response.json();
        } else {
          const errorText = await response.text();
        }
      } catch (error) {
      }
    }
  }

  private static addTestResult(testName: string, status: 'PASSED' | 'FAILED' | 'ERROR' | 'SKIPPED', message: string) {
    this.testResults.push({
      test: testName,
      status,
      message,
      timestamp: new Date().toISOString()
    });
  }

  private static printTestResults() {
    console.group('📊 Reload Test Results');
    
    const passed = this.testResults.filter(r => r.status === 'PASSED').length;
    const failed = this.testResults.filter(r => r.status === 'FAILED').length;
    const errors = this.testResults.filter(r => r.status === 'ERROR').length;
    const skipped = this.testResults.filter(r => r.status === 'SKIPPED').length;
    
    
    this.testResults.forEach(result => {
      const icon = {
        'PASSED': '✅',
        'FAILED': '❌',
        'ERROR': '💥',
        'SKIPPED': '⏭️'
      }[result.status];
      
    });
    
    console.groupEnd();
    
    return {
      total: this.testResults.length,
      passed,
      failed,
      errors,
      skipped,
      results: this.testResults
    };
  }

  static getTestResults() {
    return this.testResults;
  }

  static clearTestResults() {
    this.testResults = [];
  }
}

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  // Run tests after a delay to ensure everything is loaded
  setTimeout(() => {
    ReloadTester.testReloadIssue();
  }, 2000);
}
