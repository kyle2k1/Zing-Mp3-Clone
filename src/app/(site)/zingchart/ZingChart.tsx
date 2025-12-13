'use client';

import InfinitePage from '@/components/InfinitePage';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';

const ZingChart = () => {
  const { showPlayer } = usePlayer();

  return (
    <section className="relative mt-sidebarHeight h-screen overflow-hidden bg-content">
      <div
        className={cn(
          'gap-10 overflow-hidden overflow-y-auto px-12 pt-8 lg:flex',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20'
        )}
      >
        <InfinitePage like={true} />
      </div>
    </section>
  );
};

export default ZingChart;
