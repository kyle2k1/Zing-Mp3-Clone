'use client';

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
import { Song, Thumbnail } from '@/types/types';

interface ContentProps {
  className: string;
  thumbnails: Thumbnail[] | undefined;
}

const Content = ({ className, thumbnails }: ContentProps) => {
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist } = usePlayer();
  const router = useRouter();
  const { setNavigation } = useNavigation();

  return (
    <div className={cn(className)}>
      {thumbnails?.map((thumbnail, index) => (
        <div key={thumbnail.favorites}>
          <Card
            onClick={() => {
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
                singer={idx === thumbnail.singers.length - 1 ? `${singer}...` : `${singer},`}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

const title = 'Có thể bạn muốn nghe';
const Suggestion = ({ songs }: { songs: Song[] }) => {
  const breakpoints = getBreakpoint([1, 2, 3, 4, 5, 5]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  /* React query */
  const { data } = useSong({
    key: favorite.favorites(),
    type: songs[0].category,
    initialData: songs
  });
  const thumbnails = data?.slice(0, item).map((song) => {
    return {
      image: song.image,
      title: song.songName,
      singers: song.singers,
      song: song,
      favorites: song.favorites
    };
  });
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        {' '}
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      <Content className={className} thumbnails={thumbnails} />
    </div>
  );
};

export default Suggestion;
