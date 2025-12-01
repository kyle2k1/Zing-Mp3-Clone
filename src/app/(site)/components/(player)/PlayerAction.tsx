'use client';

import { useEffect, useRef, useState } from 'react';
import { BsFillSkipEndFill, BsFillSkipStartFill, BsRepeat } from 'react-icons/bs';
import { LiaRandomSolid } from 'react-icons/lia';
import ReactPlayer from 'react-player';
import { OnProgressProps } from 'react-player/base';

import Play from '@/components/Play';
import getDuration from '@/helpers/getDuration';
import useFrame from '@/hooks/(player)/useFrame';
import usePlayer from '@/hooks/(player)/usePlayer';
import useVolume from '@/hooks/(player)/useVolume';
import { cn } from '@/libs/utils';

interface OptionsProps {
  onNext: () => void;
  onPrev: () => void;
  onPlay: () => void;
  onRandom: () => void;
  onRepeat: () => void;
}

const options = ({ onPrev, onNext, onPlay, onRepeat, onRandom }: OptionsProps) => [
  {
    icon: LiaRandomSolid,
    label: 'random',
    onClick: onRandom,
    size: 22
  },
  {
    icon: BsFillSkipStartFill,
    label: 'prev',
    onClick: onPrev,
    size: 25
  },
  {
    icon: LiaRandomSolid,
    play: Play,
    label: 'play',
    onClick: onPlay,
    size: 27
  },
  {
    icon: BsFillSkipEndFill,
    label: 'next',
    onClick: onNext,
    size: 25
  },
  {
    icon: BsRepeat,
    label: 'repeat',
    onClick: onRepeat,
    size: 22
  }
];

const PlayerAction = () => {
  const {
    currentSong,
    isPlaying,
    isLoad,
    isFirst,
    typeRepeat,
    isRandom,
    setContinue,
    setLoad,
    setFirst,
    setPrev,
    setNext,
    setRepeat,
    setRandom
  } = usePlayer();
  const { volume, mute, change } = useVolume();
  const { showFrame } = useFrame();
  const [seconds, setSeconds] = useState<number>(0);
  const [seeking, setSeeking] = useState<boolean>(false);
  const [loop, setLoop] = useState<boolean>(false);
  const ref = useRef<ReactPlayer>(null);
  const getBackgroundSize = () => {
    return {
      backgroundSize: `${ref?.current ? seconds * 100 : '0'}% 100%`
    };
  };
  useEffect(() => {
    if (typeRepeat === 1) setLoop(true);
    else setLoop(false);
  }, [typeRepeat]);
  /* Function */
  const onProgress = (value: OnProgressProps) => {
    if (!seeking && !change) setSeconds(value.played);
  };
  const onNext = () => {
    setNext();
  };
  const onPrev = () => {
    setPrev();
  };

  const onRepeat = () => {
    setRepeat();
  };
  const onRandom = () => {
    setRandom();
  };
  const onPlay = () => {
    setContinue();
  };
  const onReady = () => {
    setLoad(false);
    if (!isFirst) {
      setFirst(true);
    }
  };
  const onEnded = () => {
    if (!loop) {
      setContinue(false);
    }
  };
  const onDurationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    ref?.current?.seekTo(Number.parseFloat(e.target.value));
  };
  const actions = options({
    onPrev,
    onNext,
    onPlay,
    onRepeat,
    onRandom
  });
  return (
    <div className="col-span-3 flex h-20 flex-col justify-center py-3 sm:col-span-1">
      {/* Options */}
      <div className="flex h-full w-full items-center justify-center gap-4 text-white">
        {actions.map((action) => {
          return action.play ? (
            <div
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
              key={action.label}
              className="hover:text-textPrimary"
            >
              <action.play
                btnPlay={{
                  circle: true,
                  size: action.size,
                  isPlay: isPlaying && !isLoad
                }}
                className="hover:border-textPrimary hover:bg-transparent"
              />
            </div>
          ) : (
            <div
              key={action.label}
              className={cn(
                action.label === 'repeat' && typeRepeat !== 0 && 'text-textPrimary',
                action.label === 'random' && isRandom && 'text-textPrimary',
                'relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-full hover:bg-playerFocus'
              )}
              onClick={(e) => {
                e.stopPropagation();
                action.onClick();
              }}
            >
              <action.icon
                size={action.size}
                title={action.label.charAt(0).toUpperCase() + action.label.slice(1)}
              />
              {action.label === 'repeat' && typeRepeat === 1 && (
                <span className="absolute flex w-full items-center justify-center text-[8px]">
                  1
                </span>
              )}
            </div>
          );
        })}
      </div>
      {/* Range */}
      <div className="leading-none">
        <ReactPlayer
          ref={ref}
          muted={mute}
          loop={loop}
          volume={volume}
          url={currentSong?.src}
          playing={isPlaying && isFirst && !showFrame}
          onError={(e) => console.log(e)}
          onReady={onReady}
          onEnded={onEnded}
          onProgress={onProgress}
          config={{ file: { forceAudio: true } }}
          style={{ display: 'none' }}
        />
        <div className="flex items-center gap-2 text-xx font-semibold tracking-wide text-contentDesc">
          <span>{ref?.current ? getDuration(ref?.current?.getCurrentTime()) : '00:00'}</span>
          <input
            id="player"
            type="range"
            step="any"
            min={0}
            max={1}
            value={seconds}
            onMouseDown={() => setSeeking(true)}
            onChange={onDurationChange}
            onMouseUp={() => setSeeking(false)}
            className="h-[3px] w-full cursor-pointer bg-contentDesc transition"
            style={getBackgroundSize()}
          />
          <span className={cn(currentSong && 'text-white')}>
            {currentSong ? currentSong.duration : 'NaN:NaN'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerAction;
