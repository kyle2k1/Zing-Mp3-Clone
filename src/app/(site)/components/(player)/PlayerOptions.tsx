'use client';

import Link from 'next/link';
import { useState } from 'react';
import { AiOutlineDownload } from 'react-icons/ai';
import { GoTrash } from 'react-icons/go';
import { ImFilm } from 'react-icons/im';
import { LuVolume2, LuVolumeX } from 'react-icons/lu';
import { RiPlayListFill } from 'react-icons/ri';

import Options from '@/components/Options';
import useFrame from '@/hooks/(player)/useFrame';
import usePlayer from '@/hooks/(player)/usePlayer';
import usePlaylist from '@/hooks/(player)/usePlaylist';
import useVolume from '@/hooks/(player)/useVolume';
import { cn } from '@/libs/utils';

import Input from './Input';
import Playlist from './Playlist';

const PlayerOptions = () => {
  const [show, setShow] = useState<boolean>(false);
  const { setFrame } = useFrame();
  const { showPlaylist, setShowPlaylist } = usePlaylist();
  const { currentSong, setContinue, setClear } = usePlayer();
  const { volume, mute, setMute } = useVolume();
  return (
    <div className="col-span-1 flex items-center justify-end gap-2 text-white">
      {/* Frame */}
      <div>
        <div
          onClick={() => {
            setFrame(true);
            setContinue(false);
          }}
          className={cn(
            'hidden h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-playerFocus md:flex'
          )}
        >
          {' '}
          <ImFilm size={18} title="MV" />
        </div>
      </div>
      {/* Volume */}
      <div>
        {' '}
        <div className="group relative hidden items-center gap-1 md:flex">
          <div
            onClick={setMute}
            className={cn(
              'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-playerFocus'
            )}
          >
            {mute || volume === 0 ? (
              <LuVolumeX size={20} title="Unmute" />
            ) : (
              <LuVolume2 size={20} title="Mute" />
            )}
          </div>
          <div
            className={cn(
              'absolute -left-3/4 hidden h-3 w-18 -translate-y-full items-center justify-center rounded-sm p-2 lg:static lg:flex lg:translate-y-0 lg:group-hover:bg-transparent',
              'group-hover:flex group-hover:bg-playerFocus'
            )}
          >
            {' '}
            <Input />
          </div>
        </div>
      </div>
      {/* Barrier */}
      <div className="my-auto h-10 w-[1px] bg-playerFocus" />
      {/* Show Playlist */}
      <div className="text-white">
        <div
          onClick={setShowPlaylist}
          className={cn(
            'flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-playerFocus'
          )}
        >
          <RiPlayListFill className="cursor-pointer" size={20} title="Show list" />
        </div>
        {/* Playlist */}
        <section
          className={cn(
            'fixed right-0 top-0 z-10 h-[calc(100vh-90px)] overflow-hidden bg-playlistBackground transition-all delay-150 ease-linear',
            showPlaylist ? 'w-72 px-3' : 'w-0'
          )}
        >
          {/* Heading */}
          <div className="flex items-center justify-end py-3">
            <div className="relative flex w-3/4 justify-between">
              <h2 className="rounded-full bg-[#6A6475] px-3 py-2 text-xds font-medium">
                Danh sách phát
              </h2>
              <div
                onClick={() => setShow(!show)}
                className={cn(
                  'h flex h-9 w-9 cursor-pointer items-center justify-center rounded-full font-medium'
                )}
              >
                {' '}
                <Options className="h-8 w-8 bg-playerFocus" />
              </div>
              {show && (
                <div className="absolute bottom-0 right-0 translate-y-full gap-2 rounded-md bg-searchFocus py-2 text-xds text-searchText">
                  <div
                    onClick={setClear}
                    className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-contentFocus"
                  >
                    {' '}
                    <GoTrash size={14} />
                    <h2>Xóa danh sách phát</h2>
                  </div>
                  {currentSong?.src && (
                    <Link
                      className="flex cursor-pointer items-center gap-2 rounded-md p-2 hover:bg-contentFocus"
                      href={currentSong?.src || '#'}
                      target="_blank"
                    >
                      {' '}
                      <AiOutlineDownload size={16} />
                      <h2>Tải bài hát hiện tại</h2>
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* Content */}
          <Playlist />
        </section>
      </div>
    </div>
  );
};

export default PlayerOptions;
