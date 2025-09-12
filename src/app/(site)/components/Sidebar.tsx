'use client';

import { useState } from 'react';
import { BsChevronLeft } from 'react-icons/bs';
import { User } from '@prisma/client';
import axios from 'axios';
import Image, { StaticImageData } from 'next/image';
import { useRouter } from 'next/navigation';

import getBreakpoint from '@/helpers/getBreakpoint';
import useLoginModal from '@/hooks/(header)/useLoginModal';
import usePlayer from '@/hooks/(player)/usePlayer';
import useRoutes from '@/hooks/(sidebar)/useRoutes';
import useSidebar from '@/hooks/(sidebar)/useSidebar';
import useBreakpoint from '@/hooks/(utils)/useBreakpoint';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';

import Box from './(sidebar)/Box';

interface SidebarProps {
  children: React.ReactNode;
  currentUser: User | undefined;
}

const Sidebar: React.FC<SidebarProps> = ({ currentUser, children }) => {
  const router = useRouter();
  const routes = useRoutes();
  const { showSidebar, setShowSidebar } = useSidebar();
  const breakpoints = getBreakpoint([1, 1, 1, 2, 2, 2]);
  const item = useBreakpoint(breakpoints);
  const dataHome = routes.slice(0, 4);
  const dataRankings = routes.slice(4, 6);
  const dataPrivate = routes.slice(6, 7);
  const dataPlaylists = routes.slice(7, 8);
  const condition = (
    classNameTrue: string | StaticImageData,
    classNameFalse: string | StaticImageData
  ) => {
    if (item === 2) {
      return classNameTrue;
    }
    if (showSidebar) {
      return classNameTrue;
    }
    return classNameFalse;
  };
  const [show, setShow] = useState<boolean>(false);
  const { setNavigation } = useNavigation();
  const { showPlayer } = usePlayer();
  const { setShowLoginModal } = useLoginModal();
  return (
    <section className={cn('flex overflow-hidden', 'h-screen')}>
      <div
        onClick={() => router.push('/')}
        className="fixed top-0 z-10 flex translate-x-1/4 translate-y-1/4 cursor-pointer items-center justify-center rounded-full bg-sidebarActive opacity-100 hover:opacity-70 sm:hidden"
      >
        <Image
          height={0}
          width={0}
          alt="Logo"
          src={condition('images/sidebar/logo.svg', 'images/sidebar/logo_mobile.svg') || ''}
          className={cn(
            condition('', 'aspect-square'),
            condition('w-28', 'w-10'),
            condition('h-11', 'h-10')
          )}
        />
      </div>
      <div
        className={cn(
          'overflow-hidden sm:block lg:w-54',
          show || showSidebar ? 'w-54' : 'w-sidebarHeight',
          show || showSidebar ? 'fixed left-0 z-40' : '',
          show || showSidebar ? 'transition-all delay-150 ease-linear' : '',
          showPlayer ? 'h-[calc(100vh-90px)]' : 'h-screen',
          !show && 'hidden'
        )}
      >
        <div
          className={cn(
            'flex flex-col bg-sidebarBackground lg:w-54',
            showSidebar ? 'w-54' : 'w-sidebarHeight',
            showPlayer ? 'h-[calc(100vh-144px)]' : 'h-[calc(100vh-54px)]'
          )}
        >
          <div
            onClick={() => {
              setNavigation(() => router.push('/'));
              if (show) setShow(false);
            }}
            className={cn(
              'h-sidebarHeight cursor-pointer hover:opacity-90',
              condition('pl-[25px] pr-[25px]', '')
            )}
          >
            <div
              className={cn(
                'flex h-sidebarHeight w-full items-center',
                condition('', 'justify-center')
              )}
            >
              <Image
                height={0}
                width={0}
                alt="Logo"
                src={condition('images/sidebar/logo.svg', 'images/sidebar/logo_mobile.svg') || ''}
                className={cn(
                  condition('', 'aspect-square'),
                  condition('w-28', 'w-10'),
                  condition('h-11', 'h-10')
                )}
              />
            </div>
          </div>
          <Box data={dataHome} item={item} />
          <div className="relative ml-[21px] mr-[25px] mt-[14px]">
            <div className="absolute -top-px h-px w-full bg-sidebarActive" />
            <div className="absolute top-0 z-10 h-[14px] w-full bg-sidebarBackground" />
            <div className="absolute top-[14px] h-[10px] w-full shadow-lg shadow-slate-900" />
          </div>

          <div
            onClick={() => show && setShow(false)}
            className="relative overflow-hidden pt-[14px] hover:overflow-y-auto"
          >
            <Box data={dataRankings} item={item} />
            {currentUser && <Box data={dataPrivate} item={item} />}
            <div
              className={cn(
                'my-5 hidden h-30 w-full items-center justify-center px-[21px]',
                currentUser?.isSubscribed ? 'hidden' : 'xl:flex'
              )}
            >
              <div className="bg-vip flex h-full w-full flex-col items-center justify-center gap-3 rounded-md px-3 text-white">
                <h2 className="text-center text-xx font-bold">
                  Nghe nhạc không quảng cáo cùng kho nhạc PREMIUM
                </h2>
                <div
                  onClick={async () => {
                    if (currentUser) {
                      const res = await axios.post('/api/checkout', {
                        data: ''
                      });
                      window.location.href = res.data.url;
                    } else {
                      setShowLoginModal(true);
                    }
                  }}
                  className="flex h-7 w-full cursor-pointer items-center justify-center rounded-full bg-yellow-400 text-xx font-bold text-black hover:opacity-90"
                >
                  NÂNG CẤP TÀI KHOẢN
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={cn('hidden h-px bg-sidebarActive sm:block')} />
        <div
          className={cn(
            'flex h-[54px] items-center justify-between bg-sidebarBackground',
            show ? 'w-sidebarHeight' : 'w-sidebarWidth'
          )}
        >
          <Box data={dataPlaylists} item={item} />
        </div>
      </div>
      {/* /// Layout */}
      <div
        onClick={() => setShow(false)}
        className={cn('inset-0 z-30 bg-black bg-opacity-25', show ? 'fixed' : 'hidden')}
      />
      <div
        onClick={() => setShow(true)}
        className="fixed bottom-0 z-10 flex h-9 w-9 -translate-y-20 cursor-pointer items-center justify-center rounded-full bg-sidebarActive font-semibold opacity-70 hover:opacity-100 sm:hidden"
      >
        <BsChevronLeft size={20} />
      </div>
      <main className="flex-1 overflow-hidden bg-content">{children}</main>
    </section>
  );
};

export default Sidebar;
