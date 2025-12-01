import { useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';

import { Song } from '@/types/types';

const useList = () => {
  const queryClient = useQueryClient();
  const getFavoriteList = useCallback(
    (key: any, data: Song[], item: number) => {
      const ids = [1, 2, 3, 4, 5];
      const lists = ids.map((id) => {
        return queryClient.setQueryData([...key(), id], () => {
          const newData = data.slice((id - 1) * 5, id * 5);
          return {
            data: newData,
            thumbnails: {
              image: newData[0].image,
              title: newData[0].songName,
              singers: [...newData[0].singers, ...newData[1].singers],
              song: newData[0],
              favorites: newData[0].favorites
            }
          };
        });
      });
      if (!lists) return [];
      return lists
        .slice(0, item)
        .filter(Boolean)
        .map((list) => {
          if (!list) return [];
          return list.thumbnails;
        });
    },
    [queryClient]
  );
  const getRankingList = useCallback(
    (key: any, data: Song[], item: number) => {
      if (data) {
        const ids = [1, 2, 3];
        const props = ids.map((id) => {
          return queryClient.setQueryData([...key(), id], () => {
            if (!data) return [];
            const newData = data.slice((id - 1) * 4 * item, id * 4 * item);

            return newData;
          });
        });
        if (props) return props;
      }
    },
    [queryClient]
  );

  return { getFavoriteList, getRankingList };
};

export default useList;
