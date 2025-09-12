'use client';

import useSearch from '@/hooks/(header)/useSearch';
import usePlayer from '@/hooks/(player)/usePlayer';
import useSidebar from '@/hooks/(sidebar)/useSidebar';
import { cn } from '@/libs/utils';

import Gallery from './(content)/Gallery';
import NewRanking from './(content)/NewRanking';
import NewRelease from './(content)/NewRelease';
import Partner from './(content)/Partner';
import Radio from './(content)/Radio';
import Suggestion from './(content)/Suggestion';

const Content = () => {
  const { setShowSearch } = useSearch();
  const { showSidebar } = useSidebar();
  const { showPlayer } = usePlayer();
  return (
    <div
      onClick={() => {
        setShowSearch(false);
      }}
      className={cn(
        'overflow-hidden bg-content',
        showSidebar ? 'mt-sidebarHeight pl-sidebarHeight' : 'mt-sidebarHeight'
      )}
    >
      <div
        className={cn(
          'flex flex-col gap-12 overflow-y-auto overflow-x-hidden px-12 pt-8',
          showPlayer ? 'h-[calc(100vh-70px)]' : 'h-screen',
          showPlayer ? 'pb-24' : 'pb-20'
        )}
      >
        <Gallery />
        <Suggestion />
        <NewRelease />
        <NewRanking />
        <Radio />
        <Partner />
      </div>
    </div>
  );
};

export default Content;
