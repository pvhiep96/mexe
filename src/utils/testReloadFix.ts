// Test script for reload fix
export class ReloadFixTester {
  static testReloadFix() {
    if (typeof window === 'undefined') {
      return;
    }

    // Test 1: Check if ReloadFix is initialized
    
    // Test 2: Check token backup
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');

    // Test 3: Check user data
    const userData = localStorage.getItem('userData');

    // Test 4: Simulate token recovery
    if (!mainToken && backupToken) {
      const { ReloadFix } = require('@/utils/reloadFix');
      ReloadFix.attemptTokenRecovery();
    }

    // Test 5: Check localStorage events
  }

  static simulateReload() {
    // Save current state
    const currentToken = localStorage.getItem('authToken');
    const currentUserData = localStorage.getItem('userData');
    
    // Simulate token loss (like in real reload)
    localStorage.removeItem('authToken');
    
    // Attempt recovery
    const { ReloadFix } = require('@/utils/reloadFix');
    ReloadFix.attemptTokenRecovery();
    
    // Restore original state
    if (currentToken) {
      localStorage.setItem('authToken', currentToken);
    }
    if (currentUserData) {
      localStorage.setItem('userData', currentUserData);
    }
  }

  static debugCurrentState() {
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    const userData = localStorage.getItem('userData');
    const userDataTime = localStorage.getItem('userDataTime');
    
    if (mainToken) {
      try {
        const payload = JSON.parse(atob(mainToken.split('.')[1]));
        // Token payload available
      } catch (error) {
        // Token parsing error
      }
    }
    
    if (userData) {
      try {
        const parsed = JSON.parse(userData);
        // User data content available
      } catch (error) {
        // User data parsing error
      }
    }
  }

  static testTokenRecovery() {
    // Check current state
    const mainToken = localStorage.getItem('authToken');
    const backupToken = localStorage.getItem('authToken_backup');
    
    if (mainToken && backupToken) {
      // Both tokens exist - good state
    } else if (mainToken && !backupToken) {
      // Main token exists but no backup - creating backup
      localStorage.setItem('authToken_backup', mainToken);
    } else if (!mainToken && backupToken) {
      // Main token missing, attempting recovery
      const { ReloadFix } = require('@/utils/reloadFix');
      ReloadFix.attemptTokenRecovery();
    } else {
      // No tokens found - need to login
    }
  }
}

// Auto-run tests in development
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  setTimeout(() => {
    ReloadFixTester.testReloadFix();
  }, 3000);
}
