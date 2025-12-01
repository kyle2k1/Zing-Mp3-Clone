'use client';

import usePlayer from '@/hooks/(player)/usePlayer';
import useDocumentTitle from '@/hooks/(utils)/useDocumentTitle';
import { cn } from '@/libs/utils';

import Frame from './(player)/Frame';
import PlayerAction from './(player)/PlayerAction';
import PlayerCard from './(player)/PlayerCard';
import PlayerOptions from './(player)/PlayerOptions';

const Player = () => {
  const { showPlayer } = usePlayer();
  useDocumentTitle();
  return (
    showPlayer && (
      <>
        <div
          className={cn(
            'fixed bottom-0 z-10 h-20 w-full bg-playerBackground px-4 transition-all delay-150 ease-linear',
          )}
        >
          {/* Player */}
          <div className="grid h-full grid-cols-5 sm:grid-cols-3">
            <PlayerCard />
            <PlayerAction />
            <PlayerOptions />
          </div>
        </div>
        {/* Frame */}
        <Frame />
      </>
    )
  );
};

export default Player;
