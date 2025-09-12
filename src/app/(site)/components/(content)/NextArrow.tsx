// @ts-nocheck
import { BsChevronRight } from 'react-icons/bs';
import { CustomArrowProps } from 'react-slick';

import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import { cn } from '@/libs/utils';

interface NextArrowProps {
  props?: CustomArrowProps;
  breakpoints: Array<object>;
  customClassName?: string;
}
const NextArrow: React.FC<NextArrowProps> = (props) => {
  const { style, onClick, currentSlide, slideCount, breakpoints, customClassName } = props;

  const item = useBreakpoint(breakpoints);
  const disabled = currentSlide && (slideCount as number) - item === currentSlide;

  return (
    <div
      className={cn('absolute right-0 top-0 h-full w-20 translate-x-full bg-[#170F23]')}
      style={{ ...style }}
    >
      <div className="flex h-full w-full items-center bg-transparent">
        {!disabled && (
          <div
            onClick={onClick}
            className={cn(
              'flex h-9 w-9 -translate-x-full cursor-pointer items-center justify-center rounded-full bg-white opacity-60 hover:bg-white hover:opacity-100',
              customClassName && customClassName
            )}
          >
            <BsChevronRight size={18} className="rounded-full text-black" />
          </div>
        )}
      </div>
    </div>
  );
};

export default NextArrow;
