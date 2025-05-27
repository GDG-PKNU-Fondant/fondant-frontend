import { useQuery } from '@tanstack/react-query';
import apiClient from '@apis/apiClient';
import { User } from '@type/User';

const fetchUserInformation = async () => {
  const response = await apiClient.get('/api/user');
  return response.data.content as User;
};

const useUserInfoQuery = () => {
  return useQuery({
    queryKey: ['userInformation'],
    queryFn: fetchUserInformation,
    enabled: true,
  });
};

export default useUserInfoQuery;
