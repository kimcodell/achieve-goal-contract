import { getMyInfo, USER_QUERY_KEY } from '@apis/userApi';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

export default function useMe() {
  const [isLoggedIn, setIsLogedIn] = useState(false);

  const { data: me } = useQuery([USER_QUERY_KEY.GET_MY_INFO], getMyInfo, {
    onSuccess: () => {
      setIsLogedIn(true);
    },
    onError: () => {
      setIsLogedIn(false);
    },
    enabled: !isLoggedIn,
  });

  return { me, isLoggedIn };
}
