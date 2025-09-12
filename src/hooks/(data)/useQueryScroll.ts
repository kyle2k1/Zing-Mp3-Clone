'use client';

import { useInfiniteQuery } from '@tanstack/react-query';

import getInfiniteSongs, { Slug } from '@/actions/getSongs';

const LIMIT = 10;
const UseQueryScroll = ({ slug }: { slug: Slug }) => {
  return useInfiniteQuery({
    queryKey: ['songs'],
    queryFn: ({ pageParam }) => getInfiniteSongs({ pageParam, slug }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.length === LIMIT ? pages.length + 1 : undefined;
    }
  });
};

export default UseQueryScroll;
