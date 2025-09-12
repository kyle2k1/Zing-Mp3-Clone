import { create } from 'zustand';

interface OptionsProps {
  showOption: number;
  setShowOption: (value: number) => void;
}
const useOptions = create<OptionsProps>((set) => ({
  showOption: -1,
  setShowOption: (value: number) => set({ showOption: value })
}));

export default useOptions;
