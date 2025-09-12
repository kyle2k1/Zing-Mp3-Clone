import { create } from 'zustand';

interface FrameProps {
  showFrame: boolean;

  setFrame: (value: boolean) => void;
}
const useFrame = create<FrameProps>((set) => ({
  showFrame: false,
  setFrame: (value: boolean) => set({ showFrame: value })
}));

export default useFrame;
