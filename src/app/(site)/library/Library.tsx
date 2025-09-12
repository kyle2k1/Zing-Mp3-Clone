'use client';

import EmptyState from '@/components/EmptyState';
import ListSongs from '@/components/ListSongs';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';

import LibraryCard from './LibraryCard';

const Library = () => {
  const { list, showPlayer, currentSong } = usePlayer();

  return (
    <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
      <div
        className={cn(
          'gap-10 overflow-hidden overflow-y-auto px-12 pt-8 lg:flex',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20'
        )}
      >
        {!currentSong && list.length === 0 ? (
          <EmptyState text="Hiện tại bạn chưa nghe bài hát nào cả." home />
        ) : (
          <>
            <LibraryCard />
            <ListSongs data={list} className="h-fit w-full" />
          </>
        )}
      </div>
    </section>
  );
};

export default Library;
