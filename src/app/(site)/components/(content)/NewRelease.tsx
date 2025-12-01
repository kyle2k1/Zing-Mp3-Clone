'use client';

import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { BsChevronRight, BsThreeDots } from 'react-icons/bs';

import { typeMusic } from '@/actions/getSongs';
import RankingCard from '@/components/RankingCard';
import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useList from '@/hooks/(data)/useList';
import useSong from '@/hooks/(data)/useSong';
import usePlayer from '@/hooks/(player)/usePlayer';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';
import { ranking } from '@/store/queryKeys';
import { Song } from '@/types/types';

export const categories = ['Tất cả', 'Việt Nam', 'Quốc tế'];

const RankingLoading = () => {
  return (
    <div className="flex flex-col gap-3">
      <div className="h-8 w-full animate-pulse rounded-md bg-slate-600" />
      <div className="h-90 w-full animate-pulse rounded-md bg-slate-600" />
    </div>
  );
};

const RankingTabs = () => {
  const { setNavigation } = useNavigation();

  const router = useRouter();
  const breakpoints = getBreakpoint([1, 1, 2, 2, 3, 3]);
  const [lists, setLists] = useState<(Song[] | undefined)[] | undefined>(undefined);

  const { getRankingList } = useList();
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const { isLoading, data } = useSong(
    ranking.rankings,
    typeMusic[Math.round(Math.random() * 3)],
    item * 4 * 3
  );
  const { currentSong } = usePlayer();
  const active = 'bg-login focus:outline-none';

  useEffect(() => {
    if (data) {
      const lists = getRankingList(ranking.rankings, data as Song[], item);
      if (lists && lists.length !== 0) {
        setLists(lists);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item, isLoading, data]);

  return (
    <div className="w-full px-2 sm:px-0">
      {isLoading ? (
        <RankingLoading />
      ) : (
        <Tab.Group>
          <Tab.List className="flex w-full space-x-2 bg-transparent text-white">
            <div className="flex w-full justify-between">
              <div className="flex gap-2 sm:gap-4">
                {categories.map((category) => {
                  return (
                    <Tab
                      key={category}
                      className={({ selected }) => {
                        return cn(
                          'flex h-6 w-18 items-center justify-center rounded-full border border-slate-100/10 text-xxx font-medium sm:w-20 sm:text-xs',
                          selected && active
                        );
                      }}
                    >
                      <span className="text-xs uppercase leading-6">{category}</span>
                    </Tab>
                  );
                })}
              </div>
              <div
                onClick={() => setNavigation(() => router.push('/ranking'))}
                className="flex cursor-pointer items-center gap-2 text-xx font-semibold uppercase leading-3 text-contentDesc hover:text-textPrimary"
              >
                <span className="hidden sm:block">Tất cả</span>
                <BsChevronRight className="translate-x-full text-base sm:translate-x-0 sm:text-inherit" />
              </div>
            </div>
          </Tab.List>
          <Tab.Panels>
            {lists?.map((list, index) => {
              return (
                <Tab.Panel key={index} className={cn('py-4', className)}>
                  {list?.map((song) => (
                    <div key={song.src}>
                      <RankingCard
                        active={song.src === currentSong?.src}
                        key={song.src}
                        options={BsThreeDots}
                        className="h-18 w-80"
                        data={song}
                      />
                    </div>
                  ))}
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
        </Tab.Group>
      )}
    </div>
  );
};

const NewRelease = () => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-3">
        {' '}
        <h2 className="text-lg font-bold text-white">Mới phát hành</h2>
      </div>
      <div className="flex justify-between">
        <RankingTabs />
      </div>
    </div>
  );
};

export default NewRelease;
