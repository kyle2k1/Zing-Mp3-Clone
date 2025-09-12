'use client';

import { Fragment } from 'react';
import { IconType } from 'react-icons';
import { Dialog, Transition } from '@headlessui/react';
import Image from 'next/image';

interface InfoModalProps {
  isOpenModal: boolean;
  setIsOpenModal: (value: boolean) => void;
  data: {
    data: string[] | undefined;
    icon: string | IconType;
  };
}

const InfoModal = ({ isOpenModal, setIsOpenModal, data: { data, icon } }: InfoModalProps) => {
  return (
    <Transition appear show={isOpenModal} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={() => setIsOpenModal(false)}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-[340px] overflow-hidden rounded-lg bg-searchFocus p-5 text-left align-middle shadow-xl transition-all">
                <Dialog.Title as="h3" className="flex justify-center text-lg font-medium leading-6">
                  <Image src={icon as string} alt="Logo" width={120} height={40} />
                </Dialog.Title>
                <div className="flex flex-col gap-6">
                  <div className="flex flex-col gap-3">
                    {data?.map((item, idx) => (
                      <div className="mt-2 flex justify-center" key={idx}>
                        <p className="text-center text-xds text-white">{item}</p>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsOpenModal(false)}
                    className="h-9 rounded-full bg-login"
                  >
                    Đóng
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default InfoModal;
