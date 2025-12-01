'use client';
import RadioCard from '@/components/RadioCard';
import getBreakpoint from '@/helpers/getBreakpoint';
import useSong from '@/hooks/(data)/useSong';
import { radio } from '@/store/queryKeys';
import { Song } from '@/types/types';
import Slider from 'react-slick';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const breakpoints = getBreakpoint([1, 3, 4, 5, 7, 7]);
const settings = {
  speed: 500,
  infinite: false,
  slidesToShow: 2,

  nextArrow: <NextArrow breakpoints={breakpoints} customClassName="-translate-y-1/2" />,
  prevArrow: <PrevArrow customClassName="-translate-y-1/2" />,
  responsive: [
    {
      breakpoint: 550,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 639,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 4
      }
    },
    {
      breakpoint: 1023,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 1279,
      settings: {
        slidesToShow: 5,
        slidesToScroll: 5
      }
    },
    {
      breakpoint: 1535,
      settings: {
        slidesToShow: 6,
        slidesToScroll: 6
      }
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 7,
        slidesToScroll: 7
      }
    }
  ]
};

const Radio = ({ songs, category }: { songs: Song[]; category: string }) => {
  const { data } = useSong({
    key: radio.radios(),
    type: category,
    limit: 9,
    initialData: songs
  });

  return (
    <div id="radio" className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold text-white">Radio Nổi Bật</h2>
      </div>
      <Slider {...settings}>
        {data?.map((song) => (
          <div
            key={song.src}
            className="w-full px-8 sm:w-1/3 sm:px-3 md:w-1/4 lg:w-1/5 xl:w-1/6 2xl:w-1/7"
          >
            <RadioCard song={song} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Radio;
