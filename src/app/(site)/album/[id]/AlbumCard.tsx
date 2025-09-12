import Artist from '@/components/Artist';
import Card from '@/components/Card';
import OptionContent from '@/components/OptionContent';
import Play from '@/components/Play';
import usePlayer from '@/hooks/(player)/usePlayer';
import { Thumbnail } from '@/types/types';

interface AlbumCardProps {
  thumbnails: Thumbnail | undefined;
  active?: boolean;
}
const AlbumCard: React.FC<AlbumCardProps> = ({ thumbnails, active }) => {
  const { isPlaying, setContinue } = usePlayer();
  return (
    /* Card */
    <div className="flex gap-4 lg:w-64 lg:flex-col">
      <Card
        btnPlay={{
          isPlay: isPlaying && active,
          circle: true,
          show: true
        }}
        onClick={() => setContinue()}
        data={thumbnails?.song}
        image={thumbnails?.image}
        className="w-46 lg:w-64"
      />
      <div className="flex h-46 w-auto flex-col justify-between gap-3 lg:h-auto lg:w-64 lg:items-center">
        <div className="flex w-full flex-col gap-1 lg:items-center">
          <h2 className="w-fit text-center text-lg font-bold text-white">
            {thumbnails?.title || 'Title'}
          </h2>
          <div className="flex w-full gap-[1px] md:flex-wrap lg:justify-center">
            {thumbnails?.singers?.map((singer, idx) => (
              <Artist
                key={singer}
                singer={
                  idx === (thumbnails?.singers?.length ?? 0) - 1 ? `${singer}.` : `${singer},`
                }
              />
            ))}
          </div>
          <span className="hidden text-xs text-contentDesc hover:underline sm:block">
            {thumbnails?.favorites ? `${thumbnails?.favorites} người yêu thích` : '(Empty) follows'}
          </span>
        </div>
        <div className="flex gap-2 lg:flex-col lg:items-center">
          <div className="flex items-center">
            <div className="flex h-8 cursor-pointer items-center justify-center rounded-full bg-login px-2 py-1.5 text-white hover:opacity-80 md:px-4">
              <div onClick={() => setContinue()} className="flex items-center gap-1">
                <Play btnPlay={{ isPlay: isPlaying, size: 17, show: true }} />
                <span className="hidden text-xds font-medium leading-6 tracking-wider md:block">
                  TIẾP TỤC PHÁT
                </span>
              </div>
            </div>
          </div>

          <div className="flex h-8 gap-2">
            <div className="flex w-8 items-center justify-center rounded-full bg-search">
              {' '}
              <OptionContent
                image={thumbnails?.image}
                song={thumbnails?.song}
                size={16}
                className="h-8 w-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    /* List */
  );
};

export default AlbumCard;
