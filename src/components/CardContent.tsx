'use client';

import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

import Artist from './Artist';
import Card from './Card';

interface CardContentProps {
  data: Song | undefined;
  height: string;
  width?: string;
  className?: string;
  classNameTitle?: string;
  play?: boolean;
  disabled?: boolean;
  pass?: boolean;
  isStop?: boolean;
  nowrap?: boolean;
  circle?: boolean;
  rotate?: boolean;
}
const CardContent: React.FC<CardContentProps> = ({
  data,
  height,
  width,
  className,
  classNameTitle,
  play,
  isStop,
  disabled,
  pass,
  nowrap,
  circle,
  rotate
}) => {
  const {
    showPlayer,
    setShowPlayer,
    setPlaying,
    setPlaylist,
    currentSong,
    isPlaying,
    setContinue
  } = usePlayer();
  return (
    <div className={cn('flex gap-2', height)}>
      <Card
        onClick={(e) => {
          e.stopPropagation();

          if (!showPlayer) {
            setShowPlayer(true);
          }
          if (data?.src === currentSong?.src) {
            setContinue();
          } else {
            setPlaying(data, true);
            if (data) {
              setPlaylist(data);
            }
          }
        }}
        btnPlay={{
          isPlay: data?.src === currentSong?.src && isPlaying,
          active: data?.src === currentSong?.src && isPlaying,
          size: 20,
          show: play
        }}
        data={data}
        image={data?.image}
        className={cn(height, width)}
        circle={circle}
        rotate={rotate}
      />
      <div className={cn('flex h-full flex-col', className)}>
        <span
          className={cn(
            'w-fit text-[0.78rem] font-bold',
            !pass ? 'text-white' : 'text-white/50',
            classNameTitle,
            nowrap ? 'whitespace-nowrap' : 'sm:whitespace-normal'
          )}
        >
          {data?.songName}
        </span>
        <div className="flex gap-[1px] overflow-hidden md:flex-wrap md:overflow-visible">
          {data?.singers.map((singer, idx) => (
            <Artist
              key={singer}
              singer={data?.singers && idx === data.singers.length - 1 ? singer : `${singer},`}
              disabled={disabled ?? true}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardContent;
