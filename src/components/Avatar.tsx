'use client';

import { Popover, Transition } from '@headlessui/react';
import { User } from '@prisma/client';
import Image from 'next/image';
import { Fragment } from 'react';

import ActiveAvatar from '@/app/(site)/components/(header)/ActiveAvatar';
import InActiveAvatar from '@/app/(site)/components/(header)/InActiveAvatar';
import useLoginModal from '@/hooks/(header)/useLoginModal';

interface AvatarProps {
  currentUser: User | undefined;
}
const Avatar: React.FC<AvatarProps> = ({ currentUser }) => {
  const { setShowLoginModal } = useLoginModal();
  return (
    <Popover className="relative">
      {() => (
        <>
          <Popover.Button className="flex h-9 w-9 cursor-pointer items-center justify-center gap-1 overflow-hidden rounded-full bg-search outline-none hover:opacity-90">
            <Image
              className=""
              alt="Avatar"
              src={currentUser?.image || '/images/placeholder.png'}
              width={41}
              height={41}
              title="Người dùng"
            />
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
            <Popover.Panel className="absolute left-10 z-10 mt-3 w-64 -translate-x-full transform sm:w-[350px]">
              <div className="overflow-hidden rounded-md shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative bg-searchFocus p-[6px]">
                  {currentUser ? (
                    <ActiveAvatar currentUser={currentUser} />
                  ) : (
                    <InActiveAvatar setShowLoginModal={setShowLoginModal} />
                  )}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Avatar;
