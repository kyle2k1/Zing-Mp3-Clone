'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import Artist from '@/components/Artist';
import Card from '@/components/Card';
import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useSong from '@/hooks/(data)/useSong';
import usePlayer from '@/hooks/(player)/usePlayer';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';
import { favorite } from '@/store/queryKeys';
import { List, Song, Thumbnail } from '@/types/types';

interface ContentProps {
  className: string;
  thumbnails: Thumbnail[] | undefined;
  songsData: Song[] | undefined;
}

const Content = ({ className, thumbnails, songsData }: ContentProps & { songsData: Song[] | undefined }) => {
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist } = usePlayer();
  const router = useRouter();
  const { setNavigation } = useNavigation();
  const queryClient = useQueryClient();
  return (
    <div className={cn(className)}>
      {thumbnails?.map((thumbnail, index) => (
        <div key={thumbnail.favorites}>
          <Card
            onClick={() => {
              // Transform data to List format and store in cache
              if (songsData) {
                const albumData: List = {
                  data: songsData,
                  thumbnails: thumbnail,
                };
                queryClient.setQueryData<List>(favorite.favorite(index + 1), albumData);
              }
              setNavigation(() => router.push(`album/${index + 1}`));
              setPlaying(thumbnail.song);
              setPlaylist(thumbnail.song);
              if (!showPlayer) setShowPlayer(true);
            }}
            like
            btnPlay={{ circle: true, show: true }}
            image={thumbnail.image}
            title={thumbnail.title}
            className="h-36 w-36 md:h-40 md:w-40 lg:h-44 lg:w-44 xl:h-46 xl:w-46 2xl:h-46 2xl:w-46"
          />
          <div className="flex w-36 flex-wrap gap-[1px] md:w-40 lg:w-44 xl:w-46 2xl:w-46">
            {thumbnail.singers?.map((singer, idx) => (
              <Artist
                key={`${idx}@${singer}`}
                singer={idx === thumbnail.singers.length - 1 ? singer : `${singer},`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const Suggestion = ({ songs, category }: { songs: Song[]; category: string }) => {
  const breakpoints = getBreakpoint([1, 2, 3, 4, 5, 5]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);

  /* React query */
  const { data } = useSong({
    key: favorite.favorites(),
    type: category,
    initialData: songs,
  });
  // Use data from React Query, fallback to songs prop if data is not ready yet
  const songsData = data || songs;
  const thumbnails = songsData?.slice(0, item).map((song) => {
    return {
      image: song.image,
      title: song.songName,
      singers: song.singers,
      song: song,
      favorites: song.favorites,
    };
  });
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">Có thể bạn muốn nghe</h2>
      </div>
      <Content
        className={className}
        songsData={songsData}
        thumbnails={thumbnails}
      />
    </div>
  );
};

export default Suggestion;
