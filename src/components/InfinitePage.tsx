'use client';

import { useEffect } from 'react';

import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';

import { Slug } from '@/constants/music';
import useQueryScroll from '@/hooks/(data)/useQueryScroll';
import { useInView } from 'react-intersection-observer';
import CardContent from './CardContent';
import OptionContent from './OptionContent';
interface InfinitePageProps {
  like?: boolean;
}

const slugs: Slug[] = ['/trending', '/favorite', '/new-music', '/top-views'];

const Loader = () => {
  return (
    <div
      className="relative inline-block h-[35px] w-[35px]"
      style={{ animation: 'spin78236 2s infinite linear' }}
    >
      {/* Dot 1 */}
      <div
        className="absolute bottom-[5%] left-0 h-full w-[30%] origin-[50%_85%]"
        style={{ transform: 'rotate(60deg)' }}
      >
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-login"
          style={{
            paddingBottom: '100%',
            animation: 'wobble1 0.8s infinite ease-in-out',
            animationDelay: '-0.24s'
          }}
        />
      </div>
      {/* Dot 2 */}
      <div
        className="absolute bottom-[5%] right-0 h-full w-[30%] origin-[50%_85%]"
        style={{ transform: 'rotate(-60deg)' }}
      >
        <div
          className="absolute bottom-0 left-0 w-full rounded-full bg-login"
          style={{
            paddingBottom: '100%',
            animation: 'wobble1 0.8s infinite ease-in-out',
            animationDelay: '-0.12s'
          }}
        />
      </div>
      {/* Dot 3 */}
      <div
        className="absolute -bottom-[5%] left-0 h-full w-[30%]"
        style={{ transform: 'translateX(116.666%)' }}
      >
        <div
          className="absolute top-0 left-0 w-full rounded-full bg-login"
          style={{
            paddingBottom: '100%',
            animation: 'wobble2 0.8s infinite ease-in-out'
          }}
        />
      </div>
    </div>
  );
};

const InfinitePage: React.FC<InfinitePageProps> = ({ like }) => {
  const { ref, inView } = useInView({ threshold: 0.2 });
  const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isFetchingNextPage } =
    useQueryScroll({
      slug: slugs[0]
    });
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  const { showPlayer, setShowPlayer, setPlaying, setPlaylist, currentSong, setContinue } =
    usePlayer();

  const emptyData =
    (!isFetchingNextPage && !isLoading && !isFetching && !data) || data?.pages.length === 0;
  return (
    <div className="flex flex-col w-full h-fit">
      <div className="flex justify-between pb-2 text-left text-xx font-semibold uppercase text-contentDesc lg:px-2">
        <span>Bài hát</span>
        <span>Thời gian</span>
      </div>
      <div className="flex flex-col">
        {!emptyData && data ? (
          data.pages.map((songs, idx1) => {
            return songs?.map((song, idx2) => {
              const formattedDuration = song.duration.padStart(5, '0');
              return (
                <div
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
                  key={song.songName + idx1 + idx2}
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
                  <div className={cn('flex items-center', like ? 'justify-end' : 'justify-end')}>
                    <div className="group-hover:hidden flex items-center justify-end text-xx font-semibold text-contentDesc lg:px-2 ">
                      {formattedDuration}
                    </div>
                    <OptionContent
                      image={song?.image}
                      like={song?.favorites}
                      className="h-9 w-9 "
                      parentClassName="group-hover:flex hidden"
                      size={20}
                      song={song}
                    />
                  </div>
                </div>
              );
            });
          })
        ) : (
          <div className="text-center text-contentDesc">Không có dữ liệu</div>
        )}
        {/* Loading point */}
        <div ref={ref} />
      </div>

      {/* Loading */}
      {(isLoading || isFetchingNextPage) && (
        <div className="absolute bottom-20 z-50 flex w-full justify-center text-xds text-white">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default InfinitePage;
