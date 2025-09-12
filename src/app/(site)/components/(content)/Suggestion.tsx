/* eslint-disable react-hooks/exhaustive-deps */

'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { typeMusic } from '@/actions/getSongs';
import Artist from '@/components/Artist';
import Card from '@/components/Card';
import Loading from '@/components/Loading';
import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useList from '@/hooks/(data)/useList';
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
        <div className="" key={thumbnail.favorites}>
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
                key={singer}
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
const Suggestion = () => {
  const breakpoints = getBreakpoint([1, 2, 3, 4, 5, 5]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const [thumbnails, setThumbnails] = useState<Thumbnail[]>();
  /* React query */
  const { isLoading, data } = useSong(favorite.favorites, typeMusic[Math.round(Math.random() * 3)]);
  const { getFavoriteList } = useList();
  useEffect(() => {
    if (data) {
      const list = getFavoriteList(favorite.favorites, data as Song[], item);
      if (list) setThumbnails(list as Thumbnail[]);
    }
  }, [item, isLoading, data]);
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        {' '}
        <h2 className="text-lg font-bold text-white">{title}</h2>
      </div>
      {isLoading ? <Loading /> : <Content className={className} thumbnails={thumbnails} />}
    </div>
  );
};

export default Suggestion;
