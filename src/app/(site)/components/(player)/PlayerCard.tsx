'use client';

import CardContent from '@/components/CardContent';
import OptionContent from '@/components/OptionContent';
import usePlayer from '@/hooks/(player)/usePlayer';

const PlayerCard = () => {
  const { currentSong } = usePlayer();
  return (
    <div className="col-span-1 flex h-20 items-center justify-between gap-5 pr-10">
      <CardContent
        height="h-14"
        data={currentSong}
        className="hidden w-28 justify-center overflow-hidden md:flex"
        classNameTitle="animate-run whitespace-nowrap "
        play
        disabled
        nowrap
        circle
        rotate
      />
      <div className="hidden items-center gap-2 lg:flex">
        <OptionContent
          image={currentSong?.image}
          like={currentSong?.favorites}
          size={20}
          className="h-8 w-8 hover:bg-playerFocus"
          song={currentSong}
        />
      </div>
    </div>
  );
};

export default PlayerCard;
