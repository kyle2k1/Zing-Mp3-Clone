import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BiHomeHeart } from 'react-icons/bi';
import { GoUpload } from 'react-icons/go';

import useUploadModal from '@/hooks/(header)/useUploadModal';

interface EmptyStateProps {
  text: string;
  upload?: boolean;
  home?: boolean;
}
const EmptyState: React.FC<EmptyStateProps> = ({ text, upload, home }) => {
  const { setShowUploadModal } = useUploadModal();
  const router = useRouter();
  return (
    <div className="justify-start10 flex h-full w-full flex-col items-center gap-2">
      <Image
        src="/images/empty.png"
        alt="empty"
        width={0}
        height={0}
        className="rounded-lg object-contain"
      />
      <p className="text-center text-base">{text}</p>

      <div className="w-fit px-3 py-2">
        <button
          type="button"
          onClick={() => {
            if (upload) setShowUploadModal(true);
            if (home) router.push('/');
          }}
          className="flex w-full items-center justify-center rounded-full bg-fuchsia-600 px-4 py-2 text-center font-medium tracking-wide text-white hover:opacity-80 focus:outline-none"
        >
          {upload && (
            <div className="flex items-center justify-center gap-2">
              <GoUpload size={20} />
              <span>Upload</span>
            </div>
          )}
          {home && (
            <div className="flex items-center justify-center gap-2">
              <BiHomeHeart size={20} />
              <span>Home</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default EmptyState;
