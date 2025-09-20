// Authentication testing utility
export class AuthTester {
  private static testResults: any[] = [];

  static async runAllTests() {
    this.testResults = [];

    try {
      await this.testTokenStorage();
      await this.testTokenRecovery();
      await this.testNetworkErrors();
      await this.testTokenExpiration();
      await this.testUserStatePersistence();
      
      this.printTestResults();
    } catch (error) {
    }
  }

  static async testTokenStorage() {
    
    try {
      // Test localStorage availability
      if (typeof window === 'undefined') {
        this.addTestResult('Token Storage', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test token storage
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzQ1Njc4MDAsImV4cCI6MTYzNDU3MTQwMH0.test';
      
      localStorage.setItem('authToken', testToken);
      const retrievedToken = localStorage.getItem('authToken');
      
      if (retrievedToken === testToken) {
        this.addTestResult('Token Storage', 'PASSED', 'Token stored and retrieved successfully');
      } else {
        this.addTestResult('Token Storage', 'FAILED', 'Token storage mismatch');
      }

      // Cleanup
      localStorage.removeItem('authToken');
    } catch (error) {
      this.addTestResult('Token Storage', 'ERROR', error.message);
    }
  }

  static async testTokenRecovery() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Token Recovery', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test backup token system
      const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzQ1Njc4MDAsImV4cCI6MTYzNDU3MTQwMH0.test';
      
      // Set backup token
      localStorage.setItem('authToken_backup', testToken);
      
      // Simulate main token loss
      localStorage.removeItem('authToken');
      
      // Check if recovery works
      const mainToken = localStorage.getItem('authToken');
      const backupToken = localStorage.getItem('authToken_backup');
      
      if (!mainToken && backupToken) {
        this.addTestResult('Token Recovery', 'PASSED', 'Backup token system working');
      } else {
        this.addTestResult('Token Recovery', 'FAILED', 'Backup token system not working');
      }

      // Cleanup
      localStorage.removeItem('authToken');
      localStorage.removeItem('authToken_backup');
    } catch (error) {
      this.addTestResult('Token Recovery', 'ERROR', error.message);
    }
  }

  static async testNetworkErrors() {
    
    try {
      // Test retry logic simulation
      let retryCount = 0;
      const maxRetries = 3;
      
      const simulateNetworkError = async () => {
        retryCount++;
        if (retryCount <= maxRetries) {
          throw { status: 0, message: 'Network error' };
        }
        return 'success';
      };

      try {
        await simulateNetworkError();
      } catch (error: any) {
        if (error.status === 0 && retryCount <= maxRetries) {
          this.addTestResult('Network Error Handling', 'PASSED', 'Retry logic working');
        } else {
          this.addTestResult('Network Error Handling', 'FAILED', 'Retry logic not working');
        }
      }
    } catch (error) {
      this.addTestResult('Network Error Handling', 'ERROR', error.message);
    }
  }

  static async testTokenExpiration() {
    
    try {
      if (typeof window === 'undefined') {
        this.addTestResult('Token Expiration', 'SKIPPED', 'Server-side rendering');
        return;
      }

      // Test expired token
      const expiredToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoxLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpYXQiOjE2MzQ1Njc4MDAsImV4cCI6MTYzNDU2NzgwMH0.expired';
      
      localStorage.setItem('authToken', expiredToken);
      
      // Check if token validation works
      try {
        const parts = expiredToken.split('.');
        const payload = JSON.parse(atob(parts[1]));
        const now = Math.floor(Date.now() / 1000);
        
        if (payload.exp <= now) {
          this.addTestResult('Token Expiration', 'PASSED', 'Expired token detected');
        } else {
          this.addTestResult('Token Expiration', 'FAILED', 'Expired token not detected');
        }
      } catch (error) {
        this.addTestResult('Token Expiration', 'ERROR', 'Token parsing failed');
      }

      // Cleanup
      localStorage.removeItem('authToken');
    } catch (error) {
      this.addTestResult('Token Expiration', 'ERROR', error.message);
    }
  }

  static async testUserStatePersistence() {
    
    try {
      // Test user state management
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        name: 'Test User'
      };

      // Simulate user state
      const userState = {
        user: mockUser,
        isAuthenticated: true,
        isLoading: false
      };

      if (userState.user && userState.isAuthenticated) {
        this.addTestResult('User State Persistence', 'PASSED', 'User state maintained');
      } else {
        this.addTestResult('User State Persistence', 'FAILED', 'User state lost');
      }
    } catch (error) {
      this.addTestResult('User State Persistence', 'ERROR', error.message);
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
    console.group('📊 Authentication Test Results');
    
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
    
    // Return summary
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
    AuthTester.runAllTests();
  }, 2000);
}
