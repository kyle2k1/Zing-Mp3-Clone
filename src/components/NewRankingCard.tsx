'use client';

import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

import Artist from './Artist';
import Card from './Card';

interface NewRankingCardProps {
  rank: number;
  song: Song;
}
const NewRankingCard: React.FC<NewRankingCardProps> = ({ rank, song }) => {
  const {
    currentSong,
    isPlaying,
    showPlayer,
    setShowPlayer,
    setPlaying,
    setContinue,
    setPlaylist
  } = usePlayer();
  return (
    <div className="flex h-full w-full items-center rounded-md bg-sidebarActive p-3">
      <div className="flex h-28 w-full gap-2">
        {/* Image */}
        <div className="h-28 w-28 overflow-hidden rounded-md">
          <Card
            btnPlay={{
              isPlay: song?.src === currentSong?.src && isPlaying,
              active: song?.src === currentSong?.src,
              show: true
            }}
            onClick={(e) => {
              e.stopPropagation();

              if (!showPlayer) {
                setShowPlayer(true);
              }
              if (song?.src === currentSong?.src) {
                setContinue();
              } else {
                setPlaying(song, true);
                if (song) {
                  setPlaylist(song);
                }
              }
            }}
            data={song}
            image={song?.image}
            className="h-28 w-28"
          />
        </div>
        {/* Info */}
        <div className="flex w-[calc(100%-126px)] flex-col items-start justify-between">
          {/* Artist info */}
          <div className="hidden flex-col gap-1 overflow-hidden text-white sm:flex">
            <h2
              className={cn(
                'text-clip text-xds font-semibold',
                song?.src === currentSong?.src && isPlaying && 'animate-run'
              )}
            >
              {song?.songName}
            </h2>
            <span className="text-xx text-contentDesc">
              {song?.singers.map((singer, idx) => (
                <Artist
                  key={singer}
                  singer={idx === (song?.singers.length ?? 0) - 1 ? singer : `${singer},`}
                />
              ))}
            </span>
          </div>
          {/* Ranking */}
          <div className="flex w-full justify-between gap-2">
            <h2 className="font-roboto text-4xl font-bold shadow-contentDesc drop-shadow-sm">
              #{rank}
            </h2>
            <span className="hidden items-end pb-[3px] text-xds font-semibold text-contentDesc md:flex">
              01.01.2001
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewRankingCard;
