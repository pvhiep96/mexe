// Orders API testing utility
export class OrdersTester {
  private static testResults: any[] = [];

  static async testOrdersAPI() {
    this.testResults = [];

    try {
      await this.testTokenState();
      await this.testOrdersEndpoint();
      await this.testAuthenticationFlow();
      
      this.printTestResults();
    } catch (error) {
    }
  }

  static async testTokenState() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Token State', 'SKIPPED', 'Server-side rendering');
        return;
      }

      const token = localStorage.getItem('authToken');
      const backupToken = localStorage.getItem('authToken_backup');
      
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = payload.exp - now;
            
            if (timeUntilExpiry > 0) {
              this.addTestResult('Token State', 'PASSED', `Token valid, expires in ${(timeUntilExpiry / 3600).toFixed(2)}h`);
            } else {
              this.addTestResult('Token State', 'FAILED', 'Token expired');
            }
          } else {
            this.addTestResult('Token State', 'FAILED', 'Invalid token format');
          }
        } catch (error) {
          this.addTestResult('Token State', 'ERROR', 'Token parsing failed');
        }
      } else {
        this.addTestResult('Token State', 'FAILED', 'No token found');
      }

      if (backupToken) {
        this.addTestResult('Backup Token', 'PASSED', 'Backup token exists');
      } else {
        this.addTestResult('Backup Token', 'FAILED', 'No backup token');
      }
    } catch (error) {
      this.addTestResult('Token State', 'ERROR', error.message);
    }
  }

  static async testOrdersEndpoint() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Orders Endpoint', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test the orders endpoint directly
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1';
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        this.addTestResult('Orders Endpoint', 'FAILED', 'No token available');
        return;
      }

      const response = await fetch(`${baseUrl}/users/orders`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        this.addTestResult('Orders Endpoint', 'PASSED', `Successfully fetched ${data.length || 0} orders`);
      } else if (response.status === 401) {
        this.addTestResult('Orders Endpoint', 'FAILED', '401 Unauthorized - Token may be invalid');
      } else if (response.status === 403) {
        this.addTestResult('Orders Endpoint', 'FAILED', '403 Forbidden - Access denied');
      } else {
        this.addTestResult('Orders Endpoint', 'FAILED', `HTTP ${response.status}: ${response.statusText}`);
      }
    } catch (error) {
      this.addTestResult('Orders Endpoint', 'ERROR', error.message);
    }
  }

  static async testAuthenticationFlow() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Authentication Flow', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test profile endpoint to verify token
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1';
      const token = localStorage.getItem('authToken');
      
      if (!token) {
        this.addTestResult('Authentication Flow', 'FAILED', 'No token available');
        return;
      }

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
          this.addTestResult('Authentication Flow', 'PASSED', `User authenticated: ${data.user.email}`);
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
  }

  static async debugOrdersIssue() {
    
    try {
      if (typeof window === 'undefined') {
        return;
      }

      const token = localStorage.getItem('authToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://47.129.168.239/api/v1';
      
      console.group('🔍 Orders API Debug Info');
      
      if (token) {
        try {
          const parts = token.split('.');
          const payload = JSON.parse(atob(parts[1]));
        } catch (error) {
        }
      }
      
      console.groupEnd();

      // Test orders endpoint with detailed logging
      if (token) {
        
        try {
          const response = await fetch(`${baseUrl}/users/orders`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          
          if (response.ok) {
            const data = await response.json();
          } else {
            const errorData = await response.text();
          }
        } catch (error) {
        }
      }
    } catch (error) {
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
    console.group('📊 Orders API Test Results');
    
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
    OrdersTester.testOrdersAPI();
  }, 3000);
}
