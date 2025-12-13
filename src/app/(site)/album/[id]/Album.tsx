'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import EmptyState from '@/components/EmptyState';
import ListSongs from '@/components/ListSongs';
import { typeMusic } from '@/constants/music';
import useSong from '@/hooks/(data)/useSong';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { favorite } from '@/store/queryKeys';
import { List, Thumbnail } from '@/types/types';

import AlbumCard from './AlbumCard';

interface AlbumProps {
  params: string;
}
const Album: React.FC<AlbumProps> = ({ params }) => {
  const { showPlayer } = usePlayer();
  const queryClient = useQueryClient();
  const cachedData = queryClient.getQueryData<List>(favorite.favorite(+params));

  // If cache miss, try to get a random album from favorites
  const randomCategory = useMemo(() => typeMusic[Math.floor(Math.random() * typeMusic.length)], []);
  const { data: favoritesData, isLoading } = useSong({
    key: favorite.favorites(),
    type: randomCategory
  });

  // Create a random album from favorites if cache is missed
  const data = useMemo(() => {
    if (cachedData) return cachedData;

    if (favoritesData && favoritesData.length > 0) {
      // Pick a random song as thumbnail
      const randomIndex = Math.floor(Math.random() * favoritesData.length);
      const randomSong = favoritesData[randomIndex];

      const thumbnail: Thumbnail = {
        image: randomSong.image,
        title: randomSong.songName,
        singers: randomSong.singers,
        song: randomSong,
        favorites: randomSong.favorites
      };

      return {
        data: favoritesData,
        thumbnails: thumbnail
      } as List;
    }

    return null;
  }, [cachedData, favoritesData]);

  // Show loading while fetching favorites data
  if (!data && isLoading) {
    return (
      <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
        <div
          className={cn(
            'flex h-full items-center justify-center',
            showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen'
          )}
        >
          <div className="border-3 m-auto h-8 w-8 animate-spin rounded-full border-t-4 border-gray-200 border-t-fuchsia-500 shadow-md transition" />
        </div>
      </section>
    );
  }

  // Show empty state if no data available
  if (!data) {
    return (
      <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
        <div
          className={cn(
            'flex h-full items-center justify-center',
            showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen'
          )}
        >
          <EmptyState text="Album không tìm thấy. Vui lòng quay lại trang chủ." home />
        </div>
      </section>
    );
  }

  return (
    <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
      <div
        className={cn(
          'gap-10 overflow-hidden overflow-y-auto px-12 pt-8 lg:flex',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20'
        )}
      >
        <AlbumCard
          thumbnails={data.thumbnails}
          active={data.data?.some((song) => song.src === data.thumbnails?.song?.src)}
        />
        <ListSongs data={data.data} className="h-fit w-full" />
      </div>
    </section>
  );
};

export default Album;
