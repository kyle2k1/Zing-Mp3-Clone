import { useQuery } from '@tanstack/react-query';

import { getSongsByWordSearch } from '@/actions/getSongs';

const useSearchSong = (search: string) => {
  const trimmedSearch = search.trim();
  const hasSearch = trimmedSearch.length > 0;

  return useQuery({
    queryKey: ['search', trimmedSearch] as const,
    queryFn: async () => {
      const result = await getSongsByWordSearch(trimmedSearch);
      return result;
    },
    enabled: hasSearch
  });
};

export default useSearchSong;
