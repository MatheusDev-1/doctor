'use client';
import { useSettingsHook } from '@/api/hooks/useSettings';
import { parseCookies } from 'nookies';
import React, {
  createContext,
  useContext,
  ReactNode,
  useCallback,
  useState,
  useEffect,
} from 'react';

type Settings = {
  [key: string]: boolean;
};

type SettingsContextType = {
  settings: any;
  refetchSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const cookies = parseCookies();
  const isLoggedIn = cookies.accessToken;
  const {
    data: initialSettings = {},
    refetchSettings,
    isLoading,
  } = isLoggedIn ? useSettingsHook() : { data: {}, refetch: () => {} };

  const [settings, setSettings] = useState(initialSettings);
  const [updatedPermissions, setUpdatedPermissions] = useState([]);

  useEffect(() => {
    setSettings(initialSettings);
  }, [initialSettings]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        setSettings,
        isLoading,
        refetchSettings,
        updatedPermissions,
        setUpdatedPermissions,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};
