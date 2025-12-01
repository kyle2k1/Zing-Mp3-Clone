'use client';

import { ElementRef, useEffect, useRef, useState } from 'react';

import { Slug } from '@/actions/getSongs';
import InfinitePage from '@/components/InfinitePage';
import UseQueryScroll from '@/hooks/(data)/useQueryScroll';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

const slugs: Slug[] = ['/trending', '/favorite', '/new-music', '/top-views'];
const ZingChart = () => {
  const [isMounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  const { showPlayer } = usePlayer();
  const { data, fetchNextPage, isLoading, isFetching, isFetchingNextPage } = UseQueryScroll({
    slug: slugs[0]
  });

  const root = useRef<ElementRef<'div'>>(null);

  if (!isMounted) return null;
  return (
    <section className="relative mt-sidebarHeight h-screen overflow-hidden bg-content">
      <div
        ref={root}
        className={cn(
          'gap-10 overflow-hidden overflow-y-auto px-12 pt-8 lg:flex',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20'
        )}
      >
        <InfinitePage data={data?.pages as Song[][]} fetchNextPage={fetchNextPage} root={root} />
      </div>
      {(isFetching || isLoading || isFetchingNextPage) && (
        <div className="absolute bottom-28 z-50 flex w-full justify-center text-xds text-white">
          <div className="border-3 m-auto h-8 w-8 animate-spin rounded-full border-t-4 border-gray-200 border-t-fuchsia-500 shadow-md transition" />
        </div>
      )}
    </section>
  );
};

export default ZingChart;
