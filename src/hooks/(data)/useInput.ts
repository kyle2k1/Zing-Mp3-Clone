import { useQuery } from '@tanstack/react-query';

import { getSongsByWordSearch } from '@/actions/getSongs';

const useInput = (key: string[]) => {
  return useQuery({
    queryKey: key,
    queryFn: async () => getSongsByWordSearch(key[2]),

    enabled: !!key
  });
};

export default useInput;
