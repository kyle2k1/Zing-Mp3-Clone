'use client';

import { User } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { BsArrowLeft, BsArrowRight } from 'react-icons/bs';

import Download from '@/app/(site)/components/(header)/Download';
import Search from '@/app/(site)/components/(header)/Search';
import Settings from '@/app/(site)/components/(header)/Settings';
import Avatar from '@/components/Avatar';
import useNavigation from '@/hooks/(utils)/useNavigation';
import { cn } from '@/libs/utils';

interface HeaderProps {
  currentUser: User | undefined;
}
const Header: React.FC<HeaderProps> = ({ currentUser }) => {
  const router = useRouter();
  const { index, max, setNavigation } = useNavigation();

  return (
    <section
      className={cn(
        'fixed left-11 right-0 top-0 z-10 h-sidebarHeight bg-content px-8 sm:left-sidebarHeight sm:px-12 lg:left-sidebarWidth'
      )}
    >
      <div className="flex h-full items-center gap-16 sm:justify-between sm:gap-0">
        {/* Btn-Search */}
        <div className="flex items-center justify-between gap-7">
          <div className="hidden gap-6 font-medium md:flex">
            <button
              type="button"
              disabled={index === 0}
              onClick={() => setNavigation(() => router.back(), -1)}
              className={cn(index !== 0 ? 'text-white' : 'opacity-80')}
            >
              <BsArrowLeft size={22} title="Back" />
            </button>
            <button
              type="button"
              disabled={max === index || max === -1}
              onClick={() => setNavigation(() => router.forward())}
              className={cn(max > index ? 'text-white' : 'opacity-80')}
            >
              <BsArrowRight size={22} title="Forward" />
            </button>
          </div>
          <div className="flex">
            {' '}
            <Search />
          </div>
        </div>
        {/* Settings */}
        <div className="flex justify-between gap-3">
          <Download />
          <Settings />
          <Avatar currentUser={currentUser} />
        </div>
      </div>
    </section>
  );
};

export default Header;
