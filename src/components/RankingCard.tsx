'use client';

import { IconType } from 'react-icons';

import Artist from '@/components/Artist';
import Card from '@/components/Card';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import RankingModal from '@/models/(content)/RankingModal';
import { Song } from '@/types/types';

interface RankingCardProps {
  options: IconType;
  className: string;
  data?: Song;
  active?: boolean;
}
const RankingCard: React.FC<RankingCardProps> = ({ options: Options, className, data, active }) => {
  const {
    isPlaying,
    showPlayer,
    currentSong,
    setShowPlayer,
    setContinue,
    setPlaying,
    setPlaylist
  } = usePlayer();
  return (
    <div
      className={cn(
        'group flex justify-between rounded-md p-2',
        className,
        active ? 'bg-sidebarActive' : 'hover:bg-sidebarActive'
      )}
    >
      <div className="flex gap-2">
        <Card
          onClick={(e) => {
            e.stopPropagation();
            if (data?.src === currentSong?.src) {
              setContinue();
            } else {
              setPlaying(data, true);
              if (data) {
                setPlaylist(data);
              }
            }
            if (!showPlayer) {
              setShowPlayer(true);
            }
          }}
          data={data}
          btnPlay={{
            show: true,
            active,
            isPlay: isPlaying && active
          }}
          image={data?.image}
          className="h-14 w-14"
        />
        <div className="flex flex-col gap-1">
          <h2 className="text-clip whitespace-nowrap text-xds font-bold text-white sm:whitespace-normal">
            {data?.songName}
          </h2>
          <span className="flex flex-wrap gap-[1px] text-xx text-contentDesc">
            {data?.singers.map((singer, idx) => (
              <Artist
                key={singer}
                singer={idx === (data?.singers.length ?? 0) - 1 ? singer : `${singer},`}
              />
            ))}
          </span>
        </div>
      </div>

      <div className="flex h-full items-center opacity-0 group-hover:opacity-100">
        <RankingModal image={data?.image} song={data}>
          <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full font-medium hover:bg-slate-100/20">
            {' '}
            <Options size={18} />
          </div>
        </RankingModal>
      </div>
    </div>
  );
};

export default RankingCard;
