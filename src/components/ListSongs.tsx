'use client';

import { User } from '@prisma/client';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';

import useUploadModal from '@/hooks/(header)/useUploadModal';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import { Song } from '@/types/types';

import CardContent from './CardContent';
import Like from './Like';
import OptionContent from './OptionContent';

interface ListSongsProps {
  data: Song[] | undefined;
  className?: string;
  currentUser?: User | undefined;
  like?: boolean;
  ref?: any;
}
const ListSongs: React.FC<ListSongsProps> = ({ data, className, currentUser, like, ref }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(-1);
  const { setLike } = useUploadModal();
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist, currentSong, setContinue } =
    usePlayer();
  const handleLike = (src: string) => {
    setIsLoading(true);
    setLike('');
    axios
      .post('/api/user', {
        userId: currentUser?.id,
        songSrc: src,
        liked: currentUser?.liked
      })
      .then(() => {
        toast.success('Successfully!');
        router.refresh();
      })
      .catch((err) => {
        toast.error(err.message);
      })
      .finally(() => {
        setIsLoading(false);
        setLike('liked');
      });
  };

  return (
    <div
      className={cn(
        className || 'h-screen w-full overflow-hidden overflow-y-auto lg:w-[calc(100%-256px)]'
      )}
    >
      <div className="flex flex-col">
        <div className="flex justify-between pb-2 text-left text-xx font-semibold uppercase text-contentDesc lg:px-2">
          <span>Bài hát</span>
          <span>Thời gian</span>
        </div>
        <div className="flex flex-col">
          {data?.map((song, idx) => {
            return (
              <div
                ref={idx === data.length - 1 ? ref : null}
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
                onMouseEnter={() => setIsOpen(idx)}
                onMouseLeave={() => setIsOpen(-1)}
                key={song.songName}
                className={cn(
                  'group grid cursor-pointer grid-cols-4 rounded-md border-t border-contentDesc/10 px-2 py-2 hover:bg-sidebarActive md:grid-cols-3',
                  song.src === currentSong?.src && 'bg-sidebarActive'
                )}
              >
                <div className="col-span-3 overflow-hidden sm:overflow-visible md:col-span-2">
                  <CardContent disabled={false} play data={song} width="w-9" height="h-9" nowrap />
                </div>
                <div className={cn('flex items-center', like ? 'justify-between' : 'justify-end')}>
                  {like && (
                    <Like
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(song.src);
                      }}
                      liked={currentUser?.liked.includes(song.src)}
                      isLoading={isLoading}
                      className="h-9 w-9"
                    />
                  )}

                  <div className="flex items-center">
                    {isOpen !== idx && (
                      <div className="flex items-center justify-end text-xx font-semibold text-contentDesc lg:px-2">
                        {`0${song.duration}`}
                      </div>
                    )}
                    {isOpen === idx && (
                      <OptionContent
                        image={song?.image}
                        like={song?.favorites}
                        className="h-9 w-9"
                        size={20}
                        song={song}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ListSongs;
