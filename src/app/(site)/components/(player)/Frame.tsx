import { HiXMark } from 'react-icons/hi2';
import ReactPlayer from 'react-player';

import CardContent from '@/components/CardContent';
import useFrame from '@/hooks/(player)/useFrame';
import usePlayer from '@/hooks/(player)/usePlayer';
import logger from '@/libs/logger';
import { cn } from '@/libs/utils';

const Frame = () => {
  const { currentSong, list, setPlaying, setPlaylist } = usePlayer();
  const { showFrame, setFrame } = useFrame();
  return (
    <div
      className={cn(
        'bottom-0 z-50 overflow-hidden rounded-md bg-gradient-to-b from-gray-900 to-gray-600 transition-all delay-150 ease-linear',
        showFrame ? 'fixed' : '',
        showFrame ? 'h-full w-full p-5' : 'h-0 w-0'
      )}
    >
      {' '}
      <div className="flex w-full justify-end">
        <div
          onClick={() => {
            setFrame(false);
          }}
          className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-slate-600 hover:bg-slate-400"
        >
          <HiXMark size={30} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-2 overflow-hidden rounded-md bg-slate-600 p-5 lg:grid-cols-3">
        <div className="aspect-video rounded-md lg:col-span-2">
          {showFrame && (
            <ReactPlayer
              playing={showFrame}
              height="100%"
              width="100%"
              onError={(e) => logger.error('Frame error:', e)}
              url={`https://www.youtube.com/embed/${currentSong?.link}`}
              controls
              config={{
                youtube: {
                  playerVars: { info: 0 }
                }
              }}
            />
          )}
        </div>
        <div className="h-52 overflow-hidden overflow-y-auto rounded-md bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 px-20 py-5 lg:col-span-1 lg:h-5/6 lg:px-0 lg:py-0">
          {list?.map((song) => (
            <div
              onClick={(e) => {
                e.stopPropagation();
                setPlaying(song, false);
                setPlaylist(song);
              }}
              key={song.src}
              className={cn(
                'cursor-pointer rounded-md px-2 py-2',
                currentSong?.src === song.src ? 'bg-login' : 'hover:bg-login/40'
              )}
            >
              <CardContent
                isStop
                play
                disabled
                data={song}
                height="h-9"
                className={cn(currentSong?.src === song.src && 'overflow-hidden')}
                classNameTitle={cn(
                  'whitespace-nowrap ',
                  currentSong?.src === song.src && 'animate-run '
                )}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Frame;
