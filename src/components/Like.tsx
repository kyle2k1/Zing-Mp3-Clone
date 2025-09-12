'use client';

import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';

import { cn } from '@/libs/utils';

interface LikeProps {
  size?: number;
  className?: string;
  onClick: (e: any) => void;
  liked?: boolean;
  isLoading?: boolean;
}
const Like: React.FC<LikeProps> = ({ size, className, onClick, liked, isLoading }) => {
  return (
    <div
      onClick={(e) => {
        if (!isLoading) {
          onClick(e);
        }
      }}
      className={cn(
        'flex h-6 w-6 items-center justify-center rounded-full hover:bg-slate-100/40',
        className,
        isLoading ? 'cursor-progress' : 'cursor-pointer'
      )}
    >
      {' '}
      {liked ? (
        <AiTwotoneHeart size={size || 23} className="font-bold" />
      ) : (
        <AiOutlineHeart size={size || 23} className="font-bold" />
      )}
    </div>
  );
};

export default Like;
