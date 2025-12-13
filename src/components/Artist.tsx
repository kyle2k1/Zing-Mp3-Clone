'use client';

import { StaticImageData } from 'next/image';

import useWindowSize from '@/hooks/(utils)/useWindowSize';
import ArtistModal from '@/models/(content)/ArtistModal';

interface ArtistProps {
  image?: StaticImageData;
  singer: string;
  disabled?: boolean;
}
const Artist: React.FC<ArtistProps> = ({ singer, disabled }) => {
  const newSinger = singer.replace(/[.,]/g, '');
  const { width } = useWindowSize();
  return (
    <span className="w-fit text-xs text-contentDesc hover:underline">
      {disabled || (width && width < 768) ? (
        <div className="w-fit cursor-not-allowed hover:no-underline focus:outline-none">{singer}</div>
      ) : (
        <ArtistModal singer={newSinger}> {singer}</ArtistModal>
      )}
    </span>
  );
};

export default Artist;
