import { create } from 'zustand';

interface LoginModalProps {
  showLoginModal: boolean;
  setShowLoginModal: (value?: boolean) => void;
}
const useLoginModal = create<LoginModalProps>((set) => ({
  showLoginModal: false,
  setShowLoginModal: (value?: boolean) => {
    return set((state) => ({
      showLoginModal: value !== undefined ? value : !state.showLoginModal
    }));
  }
}));

export default useLoginModal;
