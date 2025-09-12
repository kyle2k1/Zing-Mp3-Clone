'use client';

import { useCallback, useState } from 'react';
import { GoDownload, GoSignOut } from 'react-icons/go';
import { IoBanOutline } from 'react-icons/io5';
import { toast } from 'react-toastify';
import { User } from '@prisma/client';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { CldUploadWidget } from 'next-cloudinary';

import useUploadModal from '@/hooks/(header)/useUploadModal';
import { cn } from '@/libs/utils';
import LoadingModal from '@/models/(content)/LoadingModal';

export const text = 'This feature is currently not available...';
interface ActiveAvatarProps {
  currentUser: User | undefined;
}
const uploadPreset = 'kbjrbfku';
const ActiveAvatar: React.FC<ActiveAvatarProps> = ({ currentUser }) => {
  const router = useRouter();
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setShowUploadModal } = useUploadModal();

  const handleUpload = useCallback(
    (result: any) => {
      const image = result.info.secure_url;
      if (image.includes('mp3')) return toast.error('Invalid type of file');
      setLoading(true);
      axios
        .post('/api/user/avatar', {
          userId: currentUser?.id,
          image
        })
        .then(() => {
          router.refresh();
          toast.success('Changed Avatar Successfully!');
        })
        .finally(() => setLoading(false));
    },
    [currentUser, router]
  );
  return (
    <>
      <LoadingModal show={isLoading} />
      <div className="flex w-full flex-col justify-start gap-2 px-2 py-2">
        {/* // Part 1 */}
        <div className="flex flex-col gap-2 py-2">
          {/* // Image */}
          <div className="flex items-center gap-3">
            <CldUploadWidget
              onUpload={handleUpload}
              uploadPreset={uploadPreset}
              options={{ maxFiles: 1 }}
            >
              {({ open }) => {
                return (
                  <div
                    onClick={() => currentUser?.username && open()}
                    className={cn(
                      'h-w-14 flex aspect-square w-14 items-center justify-center overflow-hidden rounded-full',
                      currentUser?.username
                        ? 'cursor-pointer hover:scale-105 hover:border-2 hover:border-dashed hover:opacity-80'
                        : 'cursor-not-allowed'
                    )}
                  >
                    <Image
                      src={currentUser?.image || '/images/placeholder.png'}
                      width={0}
                      height={0}
                      sizes="100vw"
                      alt="Avatar"
                      style={{ width: '100%', height: 'auto' }}
                      className="aspect-square rounded-full object-cover"
                    />
                  </div>
                );
              }}
            </CldUploadWidget>
            <div className="flex flex-col justify-center gap-1 text-white">
              <h2 className="text-clip text-sm font-bold">
                {currentUser?.username || currentUser?.email || 'Hải'}
              </h2>
              <span
                className={cn(
                  'w-fit rounded-md px-1 py-0.5 text-[11px] font-bold uppercase tracking-widest',
                  currentUser?.isSubscribed
                    ? 'bg-yellow-400 text-black'
                    : 'bg-slate-300/50 text-white'
                )}
              >
                {currentUser?.isSubscribed ? 'vip' : 'basic'}
              </span>
            </div>
          </div>
          {/* // Upgrade */}
          <div
            onClick={() => {
              if (!currentUser?.isSubscribed) {
                (async () => {
                  const res = await axios.post('/api/checkout', {
                    data: ''
                  });
                  window.location.href = res.data.url;
                })();
              } else {
                toast.warn('You had a subscription');
              }
            }}
            className="flex w-full cursor-pointer items-center justify-center rounded-full bg-settingsFocus py-2 hover:opacity-90"
          >
            <p className="text-xds font-semibold text-white">Nâng cấp tài khoản</p>
          </div>
        </div>
        {/* // Barrier */}
        <hr className="border-settingsFocus px-1" />
        {/* // Part 2 */}
        <div className="flex flex-col gap-2 pt-2">
          <h2 className="text-sm font-bold text-white">Cá nhân</h2>
          <div
            onClick={() => {
              toast.warning(text);
            }}
            className="flex w-full cursor-not-allowed items-center gap-2 rounded-full p-2 hover:bg-settingsFocus"
          >
            {' '}
            <IoBanOutline size={20} />
            <p className="text-xds">Danh sách chặn</p>
          </div>
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowUploadModal(true);
            }}
            className="flex w-full cursor-pointer items-center gap-2 rounded-full p-2 hover:bg-settingsFocus"
          >
            {' '}
            <GoDownload size={20} />
            <p className="text-xds">Tải lên</p>
          </div>
        </div>
        {/* // Barrier */}
        <hr className="border-settingsFocus px-1" />
        {/* // Part 3 */}
        <div
          onClick={() => signOut({ redirect: true, callbackUrl: process.env.NEXTAUTH_URL })}
          className="flex w-full cursor-pointer items-center gap-2 rounded-full p-2 hover:bg-settingsFocus"
        >
          {' '}
          <GoSignOut size={20} />
          <p className="text-xds">Đăng suất</p>
        </div>
      </div>
    </>
  );
};

export default ActiveAvatar;
