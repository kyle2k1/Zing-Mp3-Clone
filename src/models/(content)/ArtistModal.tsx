'use client';

import { Popover, Transition } from '@headlessui/react';
import truncate from 'lodash.truncate';
import { Fragment, useRef, useState } from 'react';
import { AiOutlineUserAdd } from 'react-icons/ai';

import Card from '@/components/Card';
import getPosition from '@/helpers/getPosition';
import useSinger from '@/hooks/(data)/useSinger';
import usePlayer from '@/hooks/(player)/usePlayer';
import usePopup from '@/hooks/(utils)/usePopup';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import { cn } from '@/libs/utils';

interface PositionProps {
  height: number;
  width: number;
}
interface ArtistPopupProps {
  children: React.ReactNode;
  singer: string;
}
const description =
  'Description: Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the standard dummy text ever since the 1500s';

const LoadingUI = () => {
  return (
    <>
      {/* Loading Heading */}
      <div className="flex h-full justify-between">
        <div className="flex items-center gap-2">
          <div className="h-11 w-11 animate-pulse rounded-md bg-gray-600" />
          <div className="flex flex-col gap-1">
            <div className="h-4 w-24 animate-pulse rounded bg-gray-600" />
            <div className="h-3 w-16 animate-pulse rounded bg-gray-600" />
          </div>
        </div>
        <div className="flex items-center">
          <div className="h-6 w-28 animate-pulse rounded-full bg-gray-600" />
        </div>
      </div>
      {/* Loading Description */}
      <div className="flex w-full flex-col gap-2">
        <div className="h-3 w-full animate-pulse rounded bg-gray-600" />
        <div className="h-3 w-4/5 animate-pulse rounded bg-gray-600" />
        <div className="h-3 w-3/5 animate-pulse rounded bg-gray-600" />
      </div>
      {/* Loading Songs */}
      <div className="flex flex-col gap-2">
        <div className="h-4 w-20 animate-pulse rounded bg-gray-600" />
        <div className="flex gap-3">
          {Array.from({ length: 3 }).map((_, index) => (
            <div
              className="w-16"
              key={index}
            >
              <div className="h-16 w-16 animate-pulse rounded-md bg-gray-600" />
              <div className="mt-1 h-3 w-full animate-pulse rounded bg-gray-600" />
              <div className="mt-1 h-3 w-3/4 animate-pulse rounded bg-gray-600" />
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

const ArtistModal = ({ children, singer }: ArtistPopupProps) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const { showPlayer, setShowPlayer, setPlaying, setPlaylist } = usePlayer();
  const { buttonRef, onClose, onOpen } = usePopup();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0,
  });
  const className = getPosition(position);
  const [shouldFetch, setShouldFetch] = useState(false);
  const { isFetching, data: singerData } = useSinger(singer, shouldFetch);
  const artist = singerData;

  return (
    <Popover className="w-fit focus:outline-none">
      {({ open, close }) => {
        // Enable fetching when popover opens
        if (open && !shouldFetch) {
          setShouldFetch(true);
        }

        return (
          <div className="relative w-fit">
            <Popover.Button
              onMouseEnter={(e) => {
                timerRef.current = setTimeout(() => {
                  const width = (e.clientX * 100) / (size?.width || 1);
                  const height = (e.clientY * 100) / (size?.height || 1);
                  setPosition({ width, height });
                  onOpen(open);
                }, 100);
              }}
              ref={buttonRef}
              className="relative w-fit hover:text-textPrimary hover:underline focus:outline-none"
              onMouseLeave={() => {
                if (timerRef.current) {
                  clearTimeout(timerRef.current);
                }
                onClose(open, close);
              }}
            >
              {children}
            </Popover.Button>
            <Transition
              show={open}
              as={Fragment}
              enter="transition ease-out duration-50 "
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 "
              leave="transition ease-in  duration-100"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel
                static
                /* Z-index */
                className={cn('absolute z-40 w-80', className)}
              >
                <div className="relative h-full shadow-lg ring-1 ring-black ring-opacity-5">
                  <div
                    onMouseEnter={(_e) => {
                      onOpen(open);
                    }}
                    onMouseLeave={() => {
                      onClose(open, close);
                    }}
                    className="relative flex h-full flex-col gap-4 overflow-hidden rounded-md bg-searchFocus p-4"
                  >
                    {isFetching ? (
                      <LoadingUI />
                    ) : (
                      <>
                        {/* Heading */}
                        <div className="flex h-full justify-between">
                          <div className="flex items-center gap-2">
                            <div className="h-11 w-11">
                              <Card
                                btnPlay={{ show: true, size: 25 }}
                                image={artist?.[0]?.image || '/images/placeholder.png'}
                                className="h-11 w-11"
                              />
                            </div>
                            <div className="flex flex-col gap-1">
                              <span className="text-xds font-bold text-white">{singer}</span>
                              <span className="text-xx text-contentDesc">{artist?.[0]?.favorites || '(Empty)'}</span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <div className="flex h-6 w-28 cursor-not-allowed items-center justify-center rounded-full bg-login px-2 py-1.5 text-white hover:opacity-80">
                              <div className="flex items-center gap-1">
                                <AiOutlineUserAdd
                                  size={17}
                                  className="font-medium"
                                />
                                <span className="text-xx font-normal leading-6 tracking-wider">QUAN TÂM</span>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* Description */}
                        <div className="flex w-full flex-col text-white">
                          <p className="cursor-pointer hover:text-textPrimary hover:underline">
                            {truncate(description, {
                              length: 100,
                              separator: ' ',
                              omission: '...Xem thêm',
                            })}
                          </p>
                        </div>
                        {/* Songs */}
                        <div className="flex flex-col gap-2">
                          <h2 className="text-xds font-bold text-white">Mới nhất</h2>
                          <div className="flex gap-3">
                            {artist ? (
                              artist?.slice(0, artist?.length).map((song, _index) => (
                                <div
                                  className="w-16"
                                  key={song.link}
                                >
                                  <Card
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      if (!showPlayer) {
                                        setShowPlayer(true);
                                      }
                                      setPlaying(song, true);
                                      setPlaylist(song);
                                    }}
                                    data={song}
                                    btnPlay={{ show: true }}
                                    image={song.image}
                                    className="h-16 w-16"
                                  />
                                  <h2 className="line-clamp-2 text-xx leading-3 text-white">{song.songName}</h2>
                                </div>
                              ))
                            ) : (
                              <h2>(Empty)</h2>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </div>
        );
      }}
    </Popover>
  );
};

export default ArtistModal;
