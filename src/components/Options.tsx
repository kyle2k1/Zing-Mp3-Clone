'use client';

import { BsThreeDots } from 'react-icons/bs';

import { cn } from '@/libs/utils';

interface OptionsProps {
  size?: number;
  className?: string;
}
const Options: React.FC<OptionsProps> = ({ size, className }) => {
  return (
    <div
      className={cn(
        'flex h-6 w-6 cursor-pointer items-center justify-center rounded-full hover:bg-slate-100/40',
        className
      )}
    >
      {' '}
      <BsThreeDots size={size || 20} className="font-bold" title="Options" />
    </div>
  );
};

export default Options;
