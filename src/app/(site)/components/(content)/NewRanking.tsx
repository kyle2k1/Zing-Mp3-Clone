'use client';

import { useEffect, useState } from 'react';
import Slider from 'react-slick';

import { typeMusic } from '@/actions/getSongs';
import NewRankingCard from '@/components/NewRankingCard';
import getBreakpoint from '@/helpers/getBreakpoint';
import useSong from '@/hooks/(data)/useSong';
import { billboard } from '@/store/queryKeys';
import { Song } from '@/types/types';

import NextArrow from './NextArrow';
import PrevArrow from './PrevArrow';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';

const breakpoints = getBreakpoint([1, 1, 2, 2, 3, 3]);
const settings = {
  speed: 500,
  infinite: false,
  slidesToShow: 1,

  nextArrow: <NextArrow breakpoints={breakpoints} />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 640,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 1289,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2
      }
    },
    {
      breakpoint: 1920,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3
      }
    }
  ]
};

const NewRanking = ({ songs }: { songs: Song[] }) => {
  const randomType = typeMusic[Math.round(Math.random() * 3)];
  const [list, setList] = useState<Song[] | undefined>(undefined);
  const { isLoading, data } = useSong({
    key: billboard.billboards(),
    type: songs[0]?.category || randomType,
    limit: 9,
    initialData: songs
  });

  useEffect(() => {
    if (data) {
      setList(data as Song[]);
    }
  }, [isLoading, data]);
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex justify-between">
        {' '}
        <h2 className="text-lg font-bold text-white">BXH Nhạc Mới</h2>
      </div>
      {list && (
        <Slider {...settings}>
          {(list as Song[])?.map((song, index) => (
            <div
              key={song.src}
              className="h-36 w-full px-3 sm:h-36 sm:w-full md:h-36 md:w-1/2 xl:h-36 xl:w-1/3 2xl:h-36 2xl:w-1/3"
            >
              {' '}
              <NewRankingCard rank={index + 1} song={song} />
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default NewRanking;
