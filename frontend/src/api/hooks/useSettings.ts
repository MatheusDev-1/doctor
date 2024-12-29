import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const fetchSettings = async () => {
  const response = await api.get('/permissions');
  if (!response.data) {
    throw new Error('Failed to fetch settings');
  }
  return response.data;
};

export const useSettingsHook = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
    retry: 1,
    staleTime: 0,
  });
};
