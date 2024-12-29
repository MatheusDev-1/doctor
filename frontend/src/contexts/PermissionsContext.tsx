'use client';
import { usePermissionsHook } from '@/api/hooks/usePermissions';
import { parseCookies } from 'nookies';
import React, { createContext, useContext, ReactNode } from 'react';

type Permissions = {
  [key: string]: boolean;
};

type PermissionsContextType = {
  permissions: Permissions;
  setPermissions: () => void;
};

const PermissionsContext = createContext<PermissionsContextType | undefined>(undefined);

export const PermissionsProvider = ({ children }: { children: ReactNode }) => {
  const cookies = parseCookies();
  const isLoggedIn = cookies.accessToken;
  const { data: permissions = {}, refetch: setPermissions } = isLoggedIn
    ? usePermissionsHook('')
    : { data: {}, refetch: () => {} };

  return (
    <PermissionsContext.Provider value={{ permissions, setPermissions }}>
      {children}
    </PermissionsContext.Provider>
  );
};

export const usePermissions = () => {
  const context = useContext(PermissionsContext);
  if (!context) {
    throw new Error('usePermissions must be used within a PermissionsProvider');
  }
  return context;
};
