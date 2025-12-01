'use client';

import usePlayer from '@/hooks/(player)/usePlayer';
import useSidebar from '@/hooks/(sidebar)/useSidebar';
import { cn } from '@/libs/utils';

const Content = ({ children }: { children: React.ReactNode }) => {
  const { showSidebar } = useSidebar();
  const { showPlayer } = usePlayer();
  return (
    <div
      className={cn(
        'overflow-hidden bg-content ',
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
        {children}
      </div>
    </div>
  );
};

export default Content;
