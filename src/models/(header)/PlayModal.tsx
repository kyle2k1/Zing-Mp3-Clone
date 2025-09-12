/* eslint-disable jsx-a11y/label-has-associated-control */

'use client';

import { Fragment, JSX, useState } from 'react';
import { Popover, Switch, Transition } from '@headlessui/react';

import usePopup from '@/hooks/(utils)/usePopup';
import { cn } from '@/libs/utils';
import {} from '@/models/(header)/OptionsModal';

export interface PlayModalProps {
  children: React.ReactNode;
}

const RadioBox = ({ data, div: DivFragment }: { data: string; div?: () => JSX.Element }) => {
  return (
    <ul className="w-full text-xds font-medium text-white">
      <li className="w-full dark:border-gray-600">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <label id="list-radio-license">{data}</label>
            {DivFragment && <DivFragment />}
          </div>
          <div className="w-3">
            <input
              id="list-radio-license"
              type="radio"
              value=""
              name="list-radio"
              className="relative float-left mr-1 mt-0.5 h-5 w-5 appearance-none rounded-full border-2 border-solid border-neutral-300 before:pointer-events-none before:absolute before:h-4 before:w-4 before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] after:absolute after:z-[1] after:block after:h-4 after:w-4 after:rounded-full after:content-[''] checked:border-login checked:before:opacity-[0.16] checked:after:absolute checked:after:left-1/2 checked:after:top-1/2 checked:after:h-[0.625rem] checked:after:w-[0.625rem] checked:after:rounded-full checked:after:border-login checked:after:bg-login checked:after:content-[''] checked:after:[transform:translate(-50%,-50%)] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:shadow-none focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] checked:focus:border-login checked:focus:before:scale-100 checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:border-neutral-600 dark:checked:border-login dark:checked:after:border-login dark:checked:after:bg-login dark:focus:before:shadow-[0px_0px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:border-login dark:checked:focus:before:shadow-[0px_0px_0px_13px_#3b71ca]"
            />
          </div>
        </div>
      </li>
    </ul>
  );
};

const SwitchBox = () => {
  const [enabled, setEnabled] = useState(false);
  return (
    <Switch
      checked={enabled}
      onChange={setEnabled}
      className={cn(
        'relative inline-flex h-3 w-5 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
        enabled ? 'bg-login' : 'bg-purple-400'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'pointer-events-none inline-block h-2.5 w-2.5 transform rounded-full bg-white leading-3 shadow-lg ring-0 transition duration-200 ease-in-out',
          enabled ? 'translate-x-2.5' : 'translate-x-0'
        )}
      />
    </Switch>
  );
};

const Plus = () => {
  return (
    <div className="flex h-3 w-8 items-center justify-center rounded-sm bg-login font-extrabold">
      <h4 className="text-xxxx tracking-wider"> PLUS</h4>
    </div>
  );
};

const PlayModal: React.FC<PlayModalProps> = ({ children }) => {
  const { buttonRef, onClose, onOpen } = usePopup();

  return (
    <Popover className="relative focus:outline-none">
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
              className="absolute -left-1 -top-2.5 z-10 w-72 -translate-x-full"
            >
              <div className="p-[6px] shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative h-full rounded-md bg-searchFocus">
                  {/* Options */}
                  <div className="flex h-full flex-col px-2">
                    <div className="flex h-9 w-full items-end gap-2 px-2 text-white">
                      <h2 className="flex h-full items-center text-sm font-bold">Chuyển bài</h2>
                      <div className="flex h-full items-center">
                        {' '}
                        <Plus />
                      </div>
                    </div>
                    <div className="flex flex-col gap-3 px-2">
                      <div className="flex h-9 w-full cursor-pointer items-end justify-between gap-2 text-searchText opacity-90 hover:opacity-100">
                        <h2 className="flex h-full items-center text-xds">
                          Chuyển bài mượt mà (Crossfade)
                        </h2>
                        <div className="flex h-full items-center">
                          <SwitchBox />
                        </div>
                      </div>
                      <div className="flex h-9 w-full flex-col gap-3 text-searchText">
                        <input
                          type="range"
                          className="h-1 w-full appearance-none overflow-hidden bg-contentDesc"
                        />
                        <div className="w-full text-center text-xds font-semibold text-white">
                          8 giây
                        </div>
                      </div>
                    </div>
                    <div className="flex h-9 w-full flex-col gap-2 px-2 py-4 text-searchText">
                      <div className="flex cursor-pointer items-end justify-between opacity-90 hover:opacity-100">
                        <h2 className="text-xds">Bỏ qua khoảng lặng (Gapless)</h2>
                        <div className="flex h-full items-center">
                          <SwitchBox />
                        </div>
                      </div>
                      <span className="text-xx opacity-80">
                        Loại bỏ đoạn im lặng khi chuyển bài hát
                      </span>
                    </div>
                    <hr className="mx-2 mt-10 h-[2px] opacity-20" />
                    <div className="flex h-9 w-full items-end gap-2 px-2 text-white">
                      <h2 className="text-sm font-bold">Chất lượng nhạc</h2>
                    </div>
                    <div className="flex w-full flex-col gap-4 px-2 py-4 text-searchText">
                      <div className="flex cursor-pointer items-end justify-between opacity-90 hover:opacity-100">
                        <RadioBox data="Thường (128 kbps)" />
                      </div>
                      <div className="flex cursor-pointer items-end justify-between opacity-90 hover:opacity-100">
                        <RadioBox data="Cao (320 kbps)" />
                      </div>
                      <div className="flex cursor-pointer items-end justify-between opacity-90 hover:opacity-100">
                        <RadioBox data="Lossless" div={Plus} />
                      </div>
                    </div>
                    <hr className="mx-2 mt-2 h-[2px] opacity-20" />
                    <div className="flex w-full flex-col gap-2 px-2 py-3 text-white">
                      <h2 className="text-sm font-bold">Phát nhạc</h2>
                      <div className="flex cursor-pointer items-end justify-between opacity-90 hover:opacity-100">
                        <h2 className="text-xds">Bỏ qua khoảng lặng (Gapless)</h2>
                        <div className="flex h-full items-center">
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

export default PlayModal;

export { SwitchBox, RadioBox, Plus };
