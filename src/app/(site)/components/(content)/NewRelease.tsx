'use client';

import RankingCard from '@/components/RankingCard';
import getBreakpoint from '@/helpers/getBreakpoint';
import getClassName from '@/helpers/getClassName';
import useSong from '@/hooks/(data)/useSong';
import usePlayer from '@/hooks/(player)/usePlayer';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';
import { ranking } from '@/store/queryKeys';
import { Song } from '@/types/types';
import { Tab } from '@headlessui/react';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';
import { BsChevronRight, BsThreeDots } from 'react-icons/bs';

export const categories = ['Tất cả', 'Việt Nam', 'Quốc tế'];

const RankingTabs = ({ songs, category }: { songs: Song[]; category: string }) => {
  const { setNavigation } = useNavigation();
  const router = useRouter();
  const breakpoints = getBreakpoint([1, 1, 2, 2, 3, 3]);
  const className = getClassName(breakpoints);
  const item = useBreakpoint(breakpoints);
  const { data } = useSong({
    key: ranking.rankings(),
    type: category,
    limit: item * 4 * 3,
    initialData: songs
  });
  const { currentSong } = usePlayer();
  const active = 'bg-login focus:outline-none';

  // Split data into 3 lists for the 3 tabs
  const lists = useMemo(() => {
    if (!data) return undefined;
    const chunkSize = 4 * item;
    return [
      data.slice(0, chunkSize),
      data.slice(chunkSize, chunkSize * 2),
      data.slice(chunkSize * 2, chunkSize * 3)
    ];
  }, [data, item]);

  if (!lists) return null;

  return (
    <div className="w-full px-2 sm:px-0">
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
          {lists.map((list, index) => {
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
    </div>
  );
};

const NewRelease = ({ songs, category }: { songs: Song[]; category: string }) => {
  return (
    <div className="flex flex-col gap-y-5">
      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-bold text-white">Mới phát hành</h2>
      </div>
      <div className="flex justify-between">
        <RankingTabs songs={songs} category={category} />
      </div>
    </div>
  );
};

export default NewRelease;
