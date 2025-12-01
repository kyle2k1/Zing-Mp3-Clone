import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { MdPlayCircleOutline } from 'react-icons/md';

const useRoutes = () => {
  const pathname = usePathname();
  const routes = useMemo(
    () => [
      {
        icon: '/images/sidebar/home.svg',
        label: 'Khám Phá',
        active: pathname === '/',
        href: '/'
      },
      {
        icon: '/images/sidebar/zingchart.svg',
        label: '#zingchart',
        active: pathname === '/zingchart',
        href: '/zingchart',
        play: MdPlayCircleOutline
      },
      {
        icon: '/images/sidebar/radio.svg',
        label: 'Radio',
        active: pathname === '/#radio',
        href: '#radio',
        secondary: '/images/sidebar/live.svg',
        play: MdPlayCircleOutline
      },
      {
        icon: '/images/sidebar/library.svg',
        label: 'Thư Viện',
        active: pathname === '/library',
        href: '/library',
        play: MdPlayCircleOutline
      },
      {
        icon: '/images/sidebar/rankings.svg',
        label: 'BXH Nhạc Mới',
        active: pathname === '/ranking',
        href: '/ranking',
        play: MdPlayCircleOutline
      },
      {
        icon: '/images/sidebar/hub.svg',
        label: 'Chủ Đề & Thể Loại',
        active: pathname === '/album/1',
        href: '/album/1'
      },
      {
        icon: '/images/sidebar/upload.svg',
        label: 'Cá nhân',
        active: pathname === '/mymusic/uploaded',
        href: '/mymusic/uploaded'
      },
      {
        icon: '/images/sidebar/plus.svg',
        label: 'Tạo playlist mới',
        active: pathname === '/playlist',
        href: '/',
        right: BsChevronRight,
        left: BsChevronLeft,
        disabled: true
      }
    ],
    [pathname]
  );
  return routes;
};

export default useRoutes;
