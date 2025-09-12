'use client';

import { Fragment, useState } from 'react';
import { BsChevronRight } from 'react-icons/bs';
import { Popover, Transition } from '@headlessui/react';

import usePopup from '@/hooks/(utils)/usePopup';

import OptionsModal from './OptionsModal';
import { SwitchBox } from './PlayModal';

interface InterfaceModalProps {
  children: React.ReactNode;
}
const InterfaceModal: React.FC<InterfaceModalProps> = ({ children }) => {
  const [isOpen, setOpen] = useState(false);
  const { buttonRef, onClose, onOpen } = usePopup();
  return (
    <Popover className="relative">
      {({ open, close }) => (
        <div>
          <Popover.Button
            ref={buttonRef}
            onMouseEnter={() => onOpen(open)}
            onMouseLeave={() => onClose(open, close)}
            className="w-full focus:outline-none"
          >
            {children}
          </Popover.Button>
          <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100 translate-y-0"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100 translate-y-0"
            leaveTo="opacity-0 translate-y-1"
          >
            <Popover.Panel
              onMouseEnter={() => onOpen(open)}
              onMouseLeave={() => onClose(open, close)}
              className="absolute -left-2.5 -top-[12px] z-10 mt-3 h-[162px] w-80 -translate-x-full transform"
            >
              <div className="h-full shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative h-full rounded-md bg-searchFocus p-[6px]">
                  {/* Options */}
                  <div className="flex h-full flex-col gap-1 px-[6px]">
                    <OptionsModal isOpen={isOpen} setOpen={setOpen} />
                    <div className="flex flex-col gap-3">
                      <div
                        onClick={() => setOpen(true)}
                        className="flex w-full cursor-pointer items-end justify-between gap-2 text-searchText opacity-90 hover:opacity-100"
                      >
                        <h2 className="text-xds">Chủ đề</h2>
                        <div className="flex h-[21px] items-center">
                          <BsChevronRight />
                        </div>
                      </div>
                    </div>
                    <div className="flex w-full items-end gap-2 text-white">
                      <div className="h-[58px] w-[86px] rounded-sm bg-gradient-to-tl from-login" />
                      <h2 className="text-sm font-bold">Tím</h2>
                    </div>
                    <hr className="mx-[6px] my-[10px] h-[2px] opacity-20" />
                    <div className="flex flex-col gap-3">
                      <div className="flex h-10 w-full cursor-pointer items-center justify-between gap-2 text-searchText opacity-90 hover:opacity-100">
                        <h2 className="text-xds">Hiệu ứng chuyển động</h2>
                        <div className="flex h-[21px] items-center">
                          <SwitchBox />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </div>
      )}
    </Popover>
  );
};

export default InterfaceModal;
