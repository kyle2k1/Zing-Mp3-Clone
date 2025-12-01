'use client';

import { Popover, Transition } from '@headlessui/react';
import Image from 'next/image';
import { Fragment, useState } from 'react';

import getPosition from '@/helpers/getPosition';
import usePopup from '@/hooks/(utils)/usePopup';
import useWindowSize from '@/hooks/(utils)/useWindowSize';
import { cn } from '@/libs/utils';

interface PositionProps {
  height: number;
  width: number;
}

const getOptions = () => [
  {
    icon: 'facebook.svg',
    label: 'Facebook'
  },
  {
    icon: 'zalo.svg',
    label: 'Zalo'
  },
  {
    icon: 'div.svg',
    label: 'Mã nhúng'
  }
];

export interface ShareModalProps {
  children: React.ReactNode;
}

interface OptionsProps {
  icon: string;
  label: string;
}

const ShareModal = ({ children }: ShareModalProps) => {
  const { buttonRef, onClose, onOpen } = usePopup();

  const options: OptionsProps[] = getOptions();
  const size = useWindowSize();
  const [position, setPosition] = useState<PositionProps>({
    height: 0,
    width: 0
  });

  const className = getPosition(position);

  return (
    <Popover className="w-full focus:outline-none">
      {({ open, close }) => (
        <div className="relative w-full">
          <Popover.Button
            ref={buttonRef}
            onMouseEnter={(e) => {
              const width = (e.clientX * 100) / size.width;
              const height = (e.clientY * 100) / size.height;
              setPosition({ width, height });
              onOpen(open);
            }}
            onMouseLeave={() => {
              onClose(open, close);
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
            enterTo="opacity-100 "
            leave="transition ease-in  duration-100"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              static
              onMouseEnter={() => {
                onOpen(open);
              }}
              onMouseLeave={() => {
                onClose(open, close);
              }}
              className={cn(
                className && 'absolute z-10 w-48 rounded-md bg-searchFocus',
                className && className
              )}
            >
              <div className="flex flex-col gap-2 py-2">
                {/* Social Share */}
                <div className="flex flex-col items-start text-searchText">
                  {options.map((option) => (
                    <div
                      key={option.label}
                      className="flex w-full cursor-pointer gap-2 px-3 py-2 hover:bg-contentFocus"
                    >
                      <div className="h-4 w-4 rounded-full">
                        <Image
                          alt="Social Icon"
                          src={option.icon || 'bmw.jpg'}
                          className="h-4 w-4 rounded-full bg-white"
                        />
                      </div>
                      <span className="text-xds">{option.label}</span>
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

export default ShareModal;
