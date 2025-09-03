// Orders API testing utility
export class OrdersTester {
  private static testResults: any[] = [];

  static async testOrdersAPI() {
    console.log('🧪 Testing Orders API...');
    this.testResults = [];

    try {
      await this.testTokenState();
      await this.testOrdersEndpoint();
      await this.testAuthenticationFlow();
      
      this.printTestResults();
    } catch (error) {
      console.error('❌ Orders test suite failed:', error);
    }
  }

  static async testTokenState() {
    console.log('🔑 Testing Token State...');
    
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
    console.log('📋 Testing Orders Endpoint...');
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Orders Endpoint', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test the orders endpoint directly
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api/v1';
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
    console.log('🔐 Testing Authentication Flow...');
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Authentication Flow', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test profile endpoint to verify token
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api/v1';
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
    console.log('🐛 Debugging Orders Issue...');
    
    try {
      if (typeof window === 'undefined') {
        console.log('❌ Cannot debug on server-side');
        return;
      }

      const token = localStorage.getItem('authToken');
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005/api/v1';
      
      console.group('🔍 Orders API Debug Info');
      console.log('Base URL:', baseUrl);
      console.log('Token exists:', !!token);
      console.log('Token length:', token?.length || 0);
      
      if (token) {
        try {
          const parts = token.split('.');
          const payload = JSON.parse(atob(parts[1]));
          console.log('Token payload:', payload);
          console.log('User ID:', payload.user_id);
          console.log('Email:', payload.email);
          console.log('Issued at:', new Date(payload.iat * 1000));
          console.log('Expires at:', new Date(payload.exp * 1000));
          console.log('Current time:', new Date());
          console.log('Time until expiry:', (payload.exp - Math.floor(Date.now() / 1000)) / 3600, 'hours');
        } catch (error) {
          console.error('Token parsing error:', error);
        }
      }
      
      console.groupEnd();

      // Test orders endpoint with detailed logging
      if (token) {
        console.log('🧪 Testing orders endpoint...');
        
        try {
          const response = await fetch(`${baseUrl}/users/orders`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          console.log('Response status:', response.status);
          console.log('Response headers:', Object.fromEntries(response.headers.entries()));
          
          if (response.ok) {
            const data = await response.json();
            console.log('Response data:', data);
          } else {
            const errorData = await response.text();
            console.log('Error response:', errorData);
          }
        } catch (error) {
          console.error('Fetch error:', error);
        }
      }
    } catch (error) {
      console.error('Debug error:', error);
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
    
    console.log(`✅ Passed: ${passed}`);
    console.log(`❌ Failed: ${failed}`);
    console.log(`💥 Errors: ${errors}`);
    console.log(`⏭️ Skipped: ${skipped}`);
    
    console.log('\n📋 Detailed Results:');
    this.testResults.forEach(result => {
      const icon = {
        'PASSED': '✅',
        'FAILED': '❌',
        'ERROR': '💥',
        'SKIPPED': '⏭️'
      }[result.status];
      
      console.log(`${icon} ${result.test}: ${result.status} - ${result.message}`);
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
    console.log('🚀 Auto-running orders tests...');
    OrdersTester.testOrdersAPI();
  }, 3000);
}
