import { useQuery } from '@tanstack/react-query';

import { getSongsByType } from '@/actions/getSongs';
import { Song } from '@/types/types';

/* React-query */

const useSong = (key: any, type: string, limit?: number) => {
  return useQuery<Song[] | string>({
    // @ts-ignore
    queryKey: key() as readonly string[],
    queryFn: async () => getSongsByType(type, limit)
  });
};

export default useSong;
