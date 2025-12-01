'use client';

import { Popover, Transition } from '@headlessui/react';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { BsChevronRight } from 'react-icons/bs';
import { FiSettings } from 'react-icons/fi';
import { GiBlackBook } from 'react-icons/gi';
import { HiOutlineArrowUpRight, HiOutlineShieldCheck } from 'react-icons/hi2';
import { LuPaintbrush2, LuPhone } from 'react-icons/lu';
import { RiAdvertisementFill } from 'react-icons/ri';
import { VscPlayCircle } from 'react-icons/vsc';

import InfoModal from '@/models/(header)/InfoModal';
import InterfaceModal from '@/models/(header)/InterfaceModal';
import PlayModal from '@/models/(header)/PlayModal';

const getSettings = () => [
  {
    id: 1,
    icon: VscPlayCircle,
    label: 'Trình phát nhạc',
    secondary: BsChevronRight
  },
  {
    id: 2,
    icon: LuPaintbrush2,
    label: 'Giao diện',
    secondary: BsChevronRight
  },
  {
    icon: AiOutlineInfoCircle,
    label: 'Giới thiệu',
    secondary: 'images/sidebar/logo.svg',
    data: [
      'Giấy phép mạng xã hội: 157/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 24/4/2019',
      'Chủ quản: Công Ty Cổ Phần VNG Z06 Đường số 13, phường Tân Thuận Đông, quận 7, thành phố Hồ Chí Minh, Việt Nam'
    ]
  },
  {
    icon: LuPhone,
    label: 'Liên hệ',
    secondary: HiOutlineArrowUpRight,
    href: 'https://mp3.zing.vn/huong-dan/contact'
  },
  {
    icon: RiAdvertisementFill,
    label: 'Quảng cáo',
    secondary: HiOutlineArrowUpRight,
    href: 'https://adtima.vn/lien-he?utm_source=zingmp3&utm_medium=footer'
  },
  {
    icon: GiBlackBook,
    label: 'Thỏa thuận sử dụng',
    secondary: HiOutlineArrowUpRight,
    href: 'https://mp3.zing.vn/tnc'
  },
  {
    icon: HiOutlineShieldCheck,
    label: 'Chỉnh sách bảo mật',
    secondary: HiOutlineArrowUpRight,
    href: 'https://zingmp3.vn/privacy.html'
  }
];

const Settings = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const settings = getSettings();
  const settingsOptions = settings.slice(0, 2);
  const settingsInfo = settings.slice(2, 3);
  const settingsContact = settings.slice(3, 7);
  return (
    <Popover className="relative z-10">
      {() => (
        <>
          <Popover.Button className="relative z-10 hidden h-9 w-9 items-center justify-center rounded-full bg-search hover:opacity-90 focus:outline-none sm:flex">
            <FiSettings size={20} title="Cài đặt" />
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
            <Popover.Panel className="absolute left-10 z-10 mt-3 w-54 -translate-x-full transform">
              <div className="relative z-10 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                <div className="relative z-10 rounded-md bg-searchFocus p-[6px]">
                  {/* Options */}
                  {settingsOptions.map((setting) => {
                    return setting?.id === 1 ? (
                      <PlayModal key={setting.label + Math.random() * 10}>
                        <div className="flex h-11 cursor-pointer items-center justify-between rounded-md px-[10px] py-2.5 text-xds text-searchText opacity-90 hover:bg-settingsFocus hover:opacity-100 focus:outline-none">
                          <div className="flex gap-2">
                            <div className="w-h-5 h-5 items-center justify-center">
                              <setting.icon aria-hidden="true" size={18} />
                            </div>
                            <span>{setting.label}</span>
                          </div>
                          <div>{setting?.secondary && <setting.secondary size={19} />}</div>
                        </div>
                      </PlayModal>
                    ) : (
                      <InterfaceModal key={setting.label + Math.random() * 10}>
                        <div className="flex h-11 cursor-pointer items-center justify-between rounded-md px-[10px] py-2.5 text-xds text-searchText opacity-90 hover:bg-settingsFocus hover:opacity-100">
                          <div className="flex gap-2">
                            <div className="w-h-5 h-5 items-center justify-center">
                              <setting.icon aria-hidden="true" size={18} />
                            </div>
                            <span>{setting.label}</span>
                          </div>
                          <div>{setting?.secondary && <setting.secondary size={19} />}</div>
                        </div>
                      </InterfaceModal>
                    );
                  })}
                  <hr className="m-2 mx-[10px] h-[2px] bg-contentDesc opacity-50" />
                  {/* Info */}
                  {settingsInfo.map((setting) => (
                    <Fragment key={setting.label}>
                      <InfoModal
                        data={{
                          data: setting.data,
                          icon: setting.secondary
                        }}
                        isOpenModal={isOpenModal}
                        setIsOpenModal={setIsOpenModal}
                      />
                      <div
                        className="flex h-11 cursor-pointer items-center justify-between gap-2 rounded-md px-[10px] py-2.5 text-xds text-searchText opacity-50 hover:bg-settingsFocus hover:opacity-100"
                        onClick={() => {
                          setIsOpenModal(true);
                        }}
                      >
                        <div className="flex gap-2">
                          <div className="h-5 w-5 items-center justify-center focus:outline-none">
                            <setting.icon
                              aria-hidden="true"
                              size={18}
                              className="focus:outline-none"
                            />
                          </div>
                          <span>{setting.label}</span>
                        </div>
                      </div>
                    </Fragment>
                  ))}
                  {/* Contact */}
                  {settingsContact.map((setting) => (
                    <Link
                      href={setting.href as string}
                      target="blank"
                      key={setting.label + setting.id}
                      className="flex h-11 cursor-pointer items-center justify-between gap-2 rounded-md px-[10px] py-2.5 text-xds text-searchText opacity-50 hover:bg-settingsFocus hover:opacity-100"
                    >
                      <div className="flex gap-2">
                        <div className="w-h-5 h-5 items-center justify-center">
                          <setting.icon aria-hidden="true" size={18} />
                        </div>
                        <span>{setting.label}</span>
                      </div>
                      <div>{setting?.secondary && <setting.secondary size={14} />}</div>
                    </Link>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};

export default Settings;
