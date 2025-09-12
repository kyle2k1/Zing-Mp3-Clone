'use client';

import { BiLoader } from 'react-icons/bi';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { BtnPlay } from '@/types/types';

interface PlayProps {
  btnPlay: BtnPlay;
  className?: string;
}
const Play: React.FC<PlayProps> = ({ btnPlay, className }) => {
  const { isLoad } = usePlayer();
  return (
    <div
      className={cn(
        'relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full border bg-transparent',
        btnPlay.circle ? 'border-white' : 'border-transparent',
        btnPlay.circle ? 'hover:bg-slate-100/40' : '',
        className
      )}
    >
      {btnPlay.isPlay ? (
        <BsPauseFill
          size={btnPlay.size ? btnPlay.size : 35}
          className="cursor-pointer hover:opacity-80"
        />
      ) : isLoad ? (
        <BiLoader
          size={btnPlay.size ? btnPlay.size : 35}
          className="animate-spin cursor-pointer duration-300 hover:opacity-80"
        />
      ) : (
        <BsPlayFill
          size={btnPlay.size ? btnPlay.size : 35}
          className="cursor-pointer hover:opacity-80"
        />
      )}
    </div>
  );
};

export default Play;
