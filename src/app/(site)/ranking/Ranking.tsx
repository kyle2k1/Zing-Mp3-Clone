'use client';

import { Tab } from '@headlessui/react';
import { useQueryClient } from '@tanstack/react-query';

import { categories } from '@/app/(site)/components/(content)/NewRelease';
import ListSongs from '@/components/ListSongs';
import { cn } from '@/libs/utils';
import { ranking } from '@/store/queryKeys';
import { Song } from '@/types/types';

const Ranking = () => {
  const active = 'bg-login focus:outline-none';

  const queryClient = useQueryClient();
  const data = queryClient.getQueryData<Song[]>(ranking.rankings());
  let lists;
  if (data) {
    lists = Array.from({ length: 3 }).map((x, idx) => data.slice(idx * 8, idx * 8 + 8));
  }

  return (
    <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
      <div className="h-[calc(100vh-90px-90px)] overflow-hidden overflow-y-auto px-12 pb-10 pt-8">
        <div className="flex flex-col gap-5">
          <h1 className="text-4xl font-bold text-white">Mới Phát Hành</h1>
          <Tab.Group>
            <Tab.List className="flex w-full space-x-2 bg-transparent text-white">
              <div className="flex w-full justify-between">
                <div className="flex gap-4">
                  {categories.map((category) => {
                    return (
                      <Tab
                        key={category}
                        className={({ selected }) => {
                          return cn(
                            'flex h-6 w-20 items-center justify-center rounded-full border border-slate-100/10 font-medium',
                            selected && active
                          );
                        }}
                      >
                        <span className="text-xs uppercase leading-6">{category}</span>
                      </Tab>
                    );
                  })}
                </div>
              </div>
            </Tab.List>
            <Tab.Panels>
              {lists?.map((list, index) => {
                return (
                  <Tab.Panel key={index} className={cn('py-4')}>
                    <ListSongs data={list} className="w-full" />
                  </Tab.Panel>
                );
              })}
            </Tab.Panels>
          </Tab.Group>
        </div>
      </div>
    </section>
  );
};

export default Ranking;
