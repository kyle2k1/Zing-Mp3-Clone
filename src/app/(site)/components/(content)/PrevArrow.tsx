// @ts-nocheck
import { BsChevronLeft } from 'react-icons/bs';
import { CustomArrowProps } from 'react-slick';

import { cn } from '@/libs/utils';

interface PrevArrowProps {
  props?: CustomArrowProps;
  customClassName?: string;
}
const PrevArrow: React.FC<PrevArrowProps> = (props) => {
  const { style, onClick, currentSlide, customClassName } = props;

  const disabled = currentSlide === 0 ? 'bg-rose-500' : '';

  return (
    <div
      className={cn('absolute left-0 top-0 z-10 h-full w-20 -translate-x-full bg-[#170F23]')}
      style={{ ...style }}
    >
      <div className="flex h-full w-full items-center justify-end bg-transparent">
        {!disabled && (
          <div
            onClick={onClick}
            className={cn(
              'flex h-9 w-9 translate-x-full cursor-pointer items-center justify-center rounded-full bg-white opacity-60 hover:bg-white hover:opacity-100',
              customClassName && customClassName
            )}
          >
            <BsChevronLeft size={18} className="rounded-full text-black" />
          </div>
        )}
      </div>
    </div>
  );
};

export default PrevArrow;
