'use client';

// @ts-ignore
import CircularSlider from '@fseehawer/react-circular-slider';
import Image from 'next/image';
import { useCallback } from 'react';

import useCircleSlider from '@/hooks/(content)/useCircleSlider';
import usePlayer from '@/hooks/(player)/usePlayer';
import useResizeObserver from '@/hooks/(utils)/useResizeObserver';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

import Card from './Card';

interface RadioCardProps {
  song: Song;
}

const CircleSlider = () => {
  const { width } = useCircleSlider();
  return (
    <CircularSlider
      dataIndex={Math.floor(Math.random() * 360)}
      width={width}
      progressColorFrom="#ff4b4a"
      progressColorTo="#ff4b4a"
      progressSize={4}
      trackColor="#ffffff33"
      trackSize={4}
      hideKnob
      hideLabelValue
    />
  );
};

const RadioCard: React.FC<RadioCardProps> = ({ song }) => {
  const {
    isPlaying,
    currentSong,
    showPlayer,
    setContinue,
    setPlaying,
    setPlaylist,
    setShowPlayer
  } = usePlayer();
  const { setWidth } = useCircleSlider();
  const onResize = useCallback((_target: HTMLDivElement) => {
    setWidth();
  }, []);

  const ref = useResizeObserver(onResize);
  return (
    <div className="flex w-full flex-col gap-1">
      {/* Image */}
      <div ref={ref} id="card" className="relative w-full rounded-full">
        <div className="relative">
          <Card
            image={song?.image}
            btnPlay={{}}
            className={cn(
              'w-full',
              song.src === currentSong?.src ? 'opacity-90 shadow-2xl shadow-[#ff4b4a]' : ''
            )}
            circle
            notFit
          />
        </div>
        <div className="absolute left-0 top-0">
          {' '}
          <CircleSlider />
        </div>
        <div className="absolute left-0 top-0 h-full w-full">
          {' '}
          <div className="flex h-full w-full items-end justify-center">
            <Image
              alt="Live"
              src="/images/sidebar/live.svg"
              width={38}
              height={17}
              className="absolute bottom-0 left-1/3 z-10 ml-2 hidden opacity-100 lg:inline-flex"
            />
          </div>
          <div className="-translate-y-1/translate-x-1/4 absolute bottom-0 right-0 z-10 shadow-lg">
            <Card
              image={song.image || 'bmw.jpg'}
              onClick={(e) => {
                e.stopPropagation();
                if (song?.src === currentSong?.src) {
                  setContinue();
                } else {
                  setPlaying(song);
                  if (song) setPlaylist(song);
                }
                if (!showPlayer) setShowPlayer(true);
              }}
              data={song}
              btnPlay={{
                show: true,
                active: song.src === currentSong?.src,
                isPlay: isPlaying && song.src === currentSong?.src
              }}
              className={cn(
                'sha border-2 border-fuchsia-600 transition-all duration-500',
                song.src === currentSong?.src ? 'w-14' : 'w-11'
              )}
              circle
              notFit
            />
          </div>
        </div>
      </div>
      {/* Info */}
      <div className="flex w-full flex-col items-center">
        <div className="flex flex-col items-center gap-0.5 text-white">
          <h2 className="text-clip whitespace-nowrap text-sm font-semibold">{song.singers[0]}</h2>
          <span className="text-xs text-contentDesc">{song.favorites}</span>
        </div>
      </div>
    </div>
  );
};

export default RadioCard;
