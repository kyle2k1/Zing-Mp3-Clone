import { useQuery } from '@tanstack/react-query';

import { getSinger } from '@/actions/getSinger';
import { artist } from '@/store/queryKeys';

const useSinger = (name: string) => {
  const trimmedName = name.trim();
  const queryKey = artist.artist(trimmedName);

  return useQuery({
    queryKey,
    queryFn: async () => await getSinger(trimmedName),
    enabled: trimmedName.length > 0 && queryKey.length > 0
  });
};

export default useSinger;
