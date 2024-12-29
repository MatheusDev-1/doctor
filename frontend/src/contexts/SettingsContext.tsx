'use client';
import { useSettingsHook } from '@/api/hooks/useSettings';
import { parseCookies } from 'nookies';
import React, { createContext, useContext, ReactNode } from 'react';

type Settings = {
  [key: string]: boolean;
};

type SettingsContextType = {
  settings: Settings;
  setSettings: () => void;
};

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider = ({ children }: { children: ReactNode }) => {
  const cookies = parseCookies();
  const isLoggedIn = cookies.accessToken;
  const { data: settings = {}, refetch: setSettings } = isLoggedIn
    ? useSettingsHook()
    : { data: {}, refetch: () => {} };

  return (
    <SettingsContext.Provider value={{ settings, setSettings }}>
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
