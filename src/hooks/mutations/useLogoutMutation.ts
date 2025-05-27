import { useMutation } from '@tanstack/react-query';
import apiClient from '@apis/apiClient';

const userLogout = async () => {
  const response = await apiClient.post('/api/user/logout', null, {
    withCredentials: true,
  });
  return response.data;
};

const useLogoutMutation = () => {
  return useMutation({
    mutationFn: userLogout,
  });
};

export default useLogoutMutation;
