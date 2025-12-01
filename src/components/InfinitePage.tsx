'use client';

import { User } from '@prisma/client';
import { useEffect, useRef, useState } from 'react';

import usePlayer from '@/hooks/(player)/usePlayer';
import { useInView } from '@/hooks/(utils)/useInView';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

import CardContent from './CardContent';
import OptionContent from './OptionContent';

interface InfinitePageProps {
  data: Song[][];
  className?: string;
  currentUser?: User | undefined;
  like?: boolean;
  fetchNextPage: () => void;
  root: any;
}
const InfinitePage: React.FC<InfinitePageProps> = ({ data, like, fetchNextPage, root }) => {
  const ref = useRef<HTMLDivElement>(null);
  // @ts-ignore
  const { isIntersecting } = useInView(ref, {
    root: root.current,
    threshold: 1,
    rootMargin: '300px'
  });
  useEffect(() => {
    if (isIntersecting) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage]);
  const [isOpen, setIsOpen] = useState(-1);
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist, currentSong, setContinue } =
    usePlayer();

  return (
    <div className={cn('w-full')}>
      <div className="flex flex-col">
        <div className="flex justify-between pb-2 text-left text-xx font-semibold uppercase text-contentDesc lg:px-2">
          <span>Bài hát</span>
          <span>Thời gian</span>
        </div>
        <div className="flex flex-col">
          {data?.map((songs) => {
            return songs.map((song, idx) => {
              return (
                <div
                  ref={idx === songs.length - 1 ? ref : null}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (song?.src === currentSong?.src) {
                      setContinue();
                    } else {
                      setPlaying(song);
                      setPlaylist(song);
                    }
                    if (!showPlayer) {
                      setShowPlayer(true);
                    }
                  }}
                  onMouseEnter={() => setIsOpen(idx)}
                  onMouseLeave={() => setIsOpen(-1)}
                  key={song.songName}
                  className={cn(
                    'group grid cursor-pointer grid-cols-4 rounded-md border-t border-contentDesc/10 px-2 py-2 hover:bg-sidebarActive md:grid-cols-3',
                    song.src === currentSong?.src && 'bg-sidebarActive'
                  )}
                >
                  <div className="col-span-3 overflow-hidden sm:overflow-visible md:col-span-2">
                    <CardContent
                      play
                      data={song}
                      width="w-9"
                      height="h-9"
                      nowrap
                      disabled={false}
                    />
                  </div>
                  <div
                    className={cn('flex items-center', like ? 'justify-between' : 'justify-end')}
                  >
                    <div className="flex items-center">
                      {isOpen !== idx && (
                        <div className="flex items-center justify-end text-xx font-semibold text-contentDesc lg:px-2">
                          {`0${song.duration}`}
                        </div>
                      )}
                      {isOpen === idx && (
                        <OptionContent
                          image={song?.image}
                          like={song?.favorites}
                          className="h-9 w-9"
                          size={20}
                          song={song}
                        />
                      )}
                    </div>
                  </div>
                </div>
              );
            });
          })}
        </div>
      </div>
    </div>
  );
};

export default InfinitePage;
