'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { apiClient } from '@/services/api';

interface AuthStatusProps {
  showDebug?: boolean;
}

const AuthStatus: React.FC<AuthStatusProps> = ({ showDebug = false }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [tokenInfo, setTokenInfo] = useState<any>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  useEffect(() => {
    const updateTokenInfo = () => {
      const token = apiClient.getToken();
      if (token) {
        try {
          const parts = token.split('.');
          if (parts.length === 3) {
            const payload = JSON.parse(atob(parts[1]));
            const now = Math.floor(Date.now() / 1000);
            const timeUntilExpiry = payload.exp - now;
            
            setTokenInfo({
              userId: payload.user_id,
              email: payload.email,
              issuedAt: new Date(payload.iat * 1000),
              expiresAt: new Date(payload.exp * 1000),
              timeUntilExpiry,
              hoursUntilExpiry: (timeUntilExpiry / 3600).toFixed(2),
              isExpired: timeUntilExpiry <= 0,
              tokenLength: token.length
            });
          }
        } catch (error) {
          console.error('Error parsing token:', error);
          setTokenInfo({ error: 'Invalid token format' });
        }
      } else {
        setTokenInfo(null);
      }
      setLastUpdate(new Date());
    };

    updateTokenInfo();
    const interval = setInterval(updateTokenInfo, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  if (!showDebug) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 bg-white border border-gray-300 rounded-lg shadow-lg p-4 max-w-sm z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-gray-700">Auth Status</h3>
        <button
          onClick={() => setLastUpdate(new Date())}
          className="text-xs text-blue-500 hover:text-blue-700"
        >
          Refresh
        </button>
      </div>
      
      <div className="space-y-2 text-xs">
        <div className="flex justify-between">
          <span className="text-gray-600">Status:</span>
          <span className={`font-medium ${isAuthenticated ? 'text-green-600' : 'text-red-600'}`}>
            {isLoading ? 'Loading...' : isAuthenticated ? 'Authenticated' : 'Not Authenticated'}
          </span>
        </div>
        
        {user && (
          <div className="flex justify-between">
            <span className="text-gray-600">User:</span>
            <span className="font-medium text-gray-800">{user.email}</span>
          </div>
        )}
        
        {tokenInfo && !tokenInfo.error && (
          <>
            <div className="flex justify-between">
              <span className="text-gray-600">Token:</span>
              <span className={`font-medium ${tokenInfo.isExpired ? 'text-red-600' : 'text-green-600'}`}>
                {tokenInfo.isExpired ? 'Expired' : 'Valid'}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Expires in:</span>
              <span className={`font-medium ${tokenInfo.timeUntilExpiry < 3600 ? 'text-orange-600' : 'text-gray-800'}`}>
                {tokenInfo.hoursUntilExpiry}h
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Issued:</span>
              <span className="font-medium text-gray-800">
                {tokenInfo.issuedAt.toLocaleTimeString()}
              </span>
            </div>
          </>
        )}
        
        <div className="flex justify-between">
          <span className="text-gray-600">Last update:</span>
          <span className="font-medium text-gray-800">
            {lastUpdate.toLocaleTimeString()}
          </span>
        </div>
      </div>
      
      <div className="mt-3 pt-2 border-t border-gray-200">
        <button
          onClick={() => {
            if (isAuthenticated) {
              apiClient.getProfile().then(console.log).catch(console.error);
            }
          }}
          className="w-full text-xs bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
        >
          Test API Call
        </button>
      </div>
    </div>
  );
};

export default AuthStatus;
