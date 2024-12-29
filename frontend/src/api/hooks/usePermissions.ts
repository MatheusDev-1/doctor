import api from '@/api';
import { useQuery } from '@tanstack/react-query';

const fetchPermissions = async (role: string) => {
  const response = await api.get(`/permissions/?role=${role}`);
  if (!response.data) {
    throw new Error('Failed to fetch permissions');
  }
  return response.data;
};

export const usePermissionsHook = (role: string) => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: () => fetchPermissions(role),
    retry: 1,
    staleTime: 0,
  });
};
