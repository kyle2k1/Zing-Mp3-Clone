import { useEffect, useRef } from 'react';

import CardContent from '@/components/CardContent';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';

const Playlist = () => {
  const { currentSong, list, setContinue, setPlaying, setPlaylist } = usePlayer();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    ref?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }, [currentSong]);
  return (
    <div className="h-[calc(100vh-90px-70px)] overflow-hidden overflow-y-auto">
      {list?.map((song) => (
        <div
          ref={song.src === currentSong?.src ? ref : null}
          onClick={(e) => {
            e.stopPropagation();
            if (song.src === currentSong?.src) {
              setContinue();
            } else {
              setPlaying(song, true);
              if (song) {
                setPlaylist(song);
              }
            }
          }}
          key={song.link}
          className={cn(
            'cursor-pointer rounded-md px-2 py-2',
            currentSong?.src === song.src ? 'bg-login' : 'hover:bg-[#40384D]'
          )}
        >
          <CardContent
            play
            disabled
            data={song}
            height="h-9"
            classNameTitle="whitespace-nowrap text-clip"
          />
        </div>
      ))}
    </div>
  );
};

export default Playlist;
