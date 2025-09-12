/* eslint-disable react/jsx-curly-newline */
/* eslint-disable implicit-arrow-linebreak */

'use client';

import { Tab } from '@headlessui/react';
import { User } from '@prisma/client';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

import EmptyState from '@/components/EmptyState';
import ListSongs from '@/components/ListSongs';
import useUploadModal from '@/hooks/(header)/useUploadModal';
import usePlayer from '@/hooks/(player)/usePlayer';
import { cn } from '@/libs/utils';
import LoadingModal from '@/models/(content)/LoadingModal';

interface UploadedProps {
  currentUser: User | undefined;
}
const Uploaded: React.FC<UploadedProps> = ({ currentUser }) => {
  const active = 'bg-login focus:outline-none';
  const { isUploading, isLike } = useUploadModal();

  const { isLoading, data } = useQuery({
    queryKey: ['user', isUploading],
    queryFn: async () => axios.get('/api/song/updated'),
    enabled: !!isUploading || !!currentUser?.liked,
    refetchOnMount: true
  });
  const result = useQuery({
    queryKey: ['user', isLike],
    queryFn: async () => axios.get('/api/song/liked'),
    enabled: false || !!isLike,
    refetchOnMount: true
  });
  /* // Handle search */
  const { showPlayer } = usePlayer();

  return (
    <>
      <LoadingModal show={isLoading} />
      <section className="mt-sidebarHeight h-screen overflow-hidden bg-content">
        {!isLoading && (!data?.data || data?.data?.length === 0) ? (
          <EmptyState text="Không có bài hát." upload />
        ) : (
          <div
            className={cn(
              'overflow-hidden overflow-y-auto px-12 pt-8',
              showPlayer ? 'h-[calc(100vh-70px)]' : 'h-[calc(100vh)]',
              showPlayer ? 'pb-24' : 'pb-20'
            )}
          >
            <div className="flex flex-col gap-5">
              <h1 className="text-4xl font-bold text-white">Đã tải lên</h1>
              <Tab.Group>
                <Tab.List className="flex w-full space-x-2 bg-transparent text-white">
                  <div className="flex w-full justify-between">
                    <div className="flex gap-4">
                      <Tab
                        className={({ selected }) =>
                          cn(
                            'flex h-6 w-20 items-center justify-center rounded-full border border-slate-100/10 font-medium',
                            selected && active
                          )
                        }
                      >
                        <span className="text-xs uppercase leading-6">Đã tải lên</span>
                      </Tab>
                      <Tab
                        onClick={() => result?.refetch()}
                        className={({ selected }) =>
                          cn(
                            'flex h-6 w-20 items-center justify-center rounded-full border border-slate-100/10 font-medium',
                            selected && active
                          )
                        }
                      >
                        <span className="text-xs uppercase leading-6">Yêu thích</span>
                      </Tab>
                    </div>
                  </div>
                </Tab.List>
                <Tab.Panels>
                  <Tab.Panel className={cn('py-4')}>
                    <ListSongs
                      currentUser={currentUser}
                      data={data?.data}
                      className="w-full"
                      like
                    />
                  </Tab.Panel>
                  <Tab.Panel className={cn('py-4')}>
                    <ListSongs
                      currentUser={currentUser}
                      data={result?.data?.data}
                      className="w-full"
                      like
                    />
                  </Tab.Panel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default Uploaded;
