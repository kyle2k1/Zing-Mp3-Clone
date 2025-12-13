'use client';

import { Popover, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { IconType } from 'react-icons';
import { AiOutlineHeart } from 'react-icons/ai';
import { IoAdd } from 'react-icons/io5';
import { RiAddCircleLine, RiLinksLine, RiPlayListAddLine, RiPlayListFill, RiShareForwardLine } from 'react-icons/ri';

import getPosition from '@/helpers/getPosition';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import { cn } from '@/libs/utils';

interface PositionProps {
  height: number;
  width: number;
}

const getOptions = () => [
  {
    icon: AiOutlineHeart,
    label: 'Playlist',
  },
  {
    icon: RiPlayListAddLine,
    label: 'Playlist',
  },
  {
    icon: RiPlayListFill,
    label: 'Playlist',
  },
  {
    icon: RiAddCircleLine,
    label: 'Playlist',
  },
  {
    icon: RiLinksLine,
    label: 'Playlist',
  },
  {
    icon: RiShareForwardLine,
    label: 'Playlist',
  },
];

export interface PlaylistModalProps {
  children: React.ReactNode;
}

interface OptionsProps {
  icon: IconType;
  label: string;
  secondary?: IconType;
  modal?: string;
}

const PlaylistModal = ({ children }: PlaylistModalProps) => {
  const options: OptionsProps[] = getOptions();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0,
  });
  const className = getPosition(position);

  return (
    <Popover className="w-full focus:outline-none">
      {({ open, close }) => (
        <div className="relative w-full">
          <Popover.Button
            onClick={(e) => {
              const width = (e.clientX * 100) / (size.width || 1);
              const height = (e.clientY * 100) / (size.height || 1);
              setPosition({ width, height });
            }}
            className="relative w-full cursor-pointer hover:bg-contentFocus focus:outline-none"
          >
            {children}
          </Popover.Button>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-50 "
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100"
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              className={cn('absolute z-10 w-48 rounded-md bg-searchFocus', className && className, 'px-[-4px]')}
              onMouseLeave={() => close()}
            >
              <div className="flex flex-col justify-center gap-1 py-1">
                {/* Search */}
                <div className="px-3 py-1">
                  <div className="h-8 w-full rounded-full bg-settingsFocus px-3">
                    <input
                      type="text"
                      placeholder="Tìm playlist"
                      className="h-full bg-transparent text-xds placeholder:bg-transparent placeholder:text-searchText focus:outline-none"
                    />
                  </div>
                </div>
                {/* Playlists */}
                <div className="flex flex-col items-start text-searchText">
                  <div className="flex w-full cursor-pointer items-center gap-2 px-3 py-1 hover:bg-contentFocus">
                    <div className="h-5 w-5 rounded-lg text-white">
                      <IoAdd size={16} />
                    </div>
                    <span className="text-xds">Tạo playlist mới</span>
                    Hello
                  </div>
                  {options.map((option) => (
                    <div
                      key={option.label}
                      className="flex w-full cursor-pointer justify-between px-3 py-1 hover:bg-contentFocus"
                    >
                      <div className="flex gap-2">
                        <div>
                          <option.icon size={16} />
                        </div>
                        <span className="text-xds">{option.label}</span>
                      </div>
                      {option.secondary && (
                        <div className="flex items-center">
                          <option.secondary size={18} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

export default PlaylistModal;
