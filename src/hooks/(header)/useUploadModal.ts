import { create } from 'zustand';

interface UploadModalProps {
  isUploading: string;
  isLike: string;
  showUploadModal: boolean;
  setShowUploadModal: (value: boolean) => void;
  setUploading: (value: string) => void;
  setLike: (value: string) => void;
}
const useUploadModal = create<UploadModalProps>((set) => ({
  isUploading: 'updated',
  isLike: 'liked',
  showUploadModal: false,
  setShowUploadModal: (value: boolean) => {
    return set({
      showUploadModal: value
    });
  },
  setUploading: (value: string) => set({ isUploading: value }),
  setLike: (value: string) => set({ isLike: value })
}));

export default useUploadModal;
