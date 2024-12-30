import api from '@/api';
import { useMutation, useQuery } from '@tanstack/react-query';
import { parseCookies } from 'nookies';

const fetchPermissions = async () => {
  const cookies = parseCookies();
  const { role } = JSON.parse(cookies.user);

  const response = await api.get(`/permissions/?role=${role}`);
  if (!response.data) {
    throw new Error('Failed to fetch permissions');
  }
  return response.data;
};

const updatePermissions = async (permissions: any) => {
  const response = await api.post('/permissions/', permissions);

  if (!response.data) {
    throw new Error('Failed to update permissions');
  }

  return response.data;
};

export const usePermissionsHook = () => {
  return useQuery({
    queryKey: ['permissions'],
    queryFn: fetchPermissions,
    retry: 1,
    staleTime: 0,
  });
};

export const useUpdatePermissionMutation = (options = {}) => {
  return useMutation({
    mutationFn: updatePermissions,
    ...options,
  });
};
