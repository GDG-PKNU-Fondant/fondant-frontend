import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import apiClient from '@apis/apiClient';

const userLogout = async () => {
  const response = await apiClient.post('/api/user/logout', null, {
    withCredentials: true,
  });
  return response.data;
};

const useLogoutMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: userLogout,
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      queryClient.clear();
      navigate('/login');
    },
  });
};

export default useLogoutMutation;
