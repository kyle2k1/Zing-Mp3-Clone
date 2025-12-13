'use client';

import { cn } from '@/libs/utils';
import RankingModal from '@/models/(content)/RankingModal';
import { Song } from '@/types/types';

import Options from './Options';

interface OptionContentProps {
  image?: string;
  like?: string | number;
  size?: number;
  className?: string;
  parentClassName?: string;
  song?: Song;
}
const OptionContent: React.FC<OptionContentProps> = ({
  image,
  like,
  size,
  className,
  parentClassName,
  song
}) => {
  return (
    <div className={parentClassName}>
      <RankingModal image={image} like={like} song={song}>
        <div
          className={cn(
            'h flex h-9 w-9 cursor-pointer items-center justify-center rounded-full font-medium'
          )}
        >
          <Options size={size || 16} className={className} />{' '}
        </div>
      </RankingModal>
    </div>
  );
};

export default OptionContent;
