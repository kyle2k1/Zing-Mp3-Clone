'use client';

import { useQueryClient } from '@tanstack/react-query';

import ListSongs from '@/components/ListSongs';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import LoadingModal from '@/models/(content)/LoadingModal';
import { favorite } from '@/store/queryKeys';
import { List } from '@/types/types';

import AlbumCard from './AlbumCard';

interface AlbumProps {
  params: string;
}
const Album: React.FC<AlbumProps> = ({ params }) => {
  const { showPlayer } = usePlayer();
  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<List>(favorite.favorite(+params));

  return (
    <>
      {!data && <LoadingModal />}
      <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
        <div
          className={cn(
            'gap-10 overflow-hidden overflow-y-auto px-12 pt-8 lg:flex',
            showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
            showPlayer ? 'pb-24' : 'pb-20'
          )}
        >
          <AlbumCard
            thumbnails={data?.thumbnails}
            active={data?.data.includes(data?.thumbnails?.song)}
          />
          <ListSongs data={data?.data} className="h-fit w-full" />
        </div>
      </section>
    </>
  );
};

export default Album;
