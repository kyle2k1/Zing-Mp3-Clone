import { useQuery } from '@tanstack/react-query';

import { getSongsByType } from '@/actions/getSongs';
import { Song } from '@/types/types';

const useSong = ({
  key,
  type,
  limit,
  initialData
}: { key: readonly string[]; type: string; limit?: number; initialData?: Song[] }) => {
  console.log({ type, data: initialData });
  return useQuery({
    queryKey: key,
    queryFn: async () => await getSongsByType(type, limit),
    initialData
  });
};

export default useSong;
