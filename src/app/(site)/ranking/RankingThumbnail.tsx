import Artist from '@/components/Artist';
import Card from '@/components/Card';
import Options from '@/components/Options';
import Play from '@/components/Play';
import usePlayer from '@/hooks/(player)/usePlayer';
import { Song } from '@/types/types';

interface RankingThumbnailProps {
  song: Song | undefined;
}
const RankingThumbnail: React.FC<RankingThumbnailProps> = ({ song }) => {
  const { isPlaying, setContinue } = usePlayer();
  return (
    /* Card */
    <div className="flex gap-4 lg:w-64 lg:flex-col">
      <Card
        btnPlay={{
          isPlay: isPlaying,
          circle: true,
          show: true
        }}
        onClick={() => setContinue()}
        data={song}
        image={song?.image}
        className="w-46 lg:w-64"
      />
      <div className="flex h-46 w-auto flex-col justify-between gap-3 lg:h-auto lg:w-64 lg:items-center">
        <div className="flex w-full flex-col gap-1 lg:items-center">
          <h2 className="w-fit text-center text-lg font-bold text-white">
            {song?.songName || 'Title'}
          </h2>
          <div className="flex w-full flex-wrap gap-[1px] lg:justify-center">
            {song?.singers?.map((singer, idx) => (
              <Artist
                key={singer}
                singer={idx === (song?.singers?.length ?? 0) - 1 ? `${singer}.` : `${singer},`}
              />
            ))}
          </div>
          <span className="text-xs text-contentDesc hover:underline">
            {song?.favorites ? `${song?.favorites} người yêu thích` : '(Empty) follows'}
          </span>
        </div>
        <div className="flex gap-2 lg:flex-col lg:items-center">
          <div className="flex items-center">
            <div className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-login px-4 py-1.5 text-white hover:opacity-80">
              <div onClick={() => setContinue()} className="flex items-center gap-1">
                <Play btnPlay={{ isPlay: isPlaying, size: 17, show: true }} />
                <span className="text-xds font-medium leading-6 tracking-wider">TIẾP TỤC PHÁT</span>
              </div>
            </div>
          </div>

          <div className="flex h-8 gap-2">
            <div className="flex w-8 cursor-pointer items-center justify-center rounded-full bg-search hover:opacity-80">
              {' '}
              <Options size={16} className="h-8 w-8" />
            </div>
          </div>
        </div>
      </div>
    </div>
    /* List */
  );
};

export default RankingThumbnail;
