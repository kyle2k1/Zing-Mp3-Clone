import { create } from 'zustand';

interface NavigationProps {
  index: number;
  max: number;
  setNavigation: (fn: () => void, value?: number) => void;
}
const useNavigation = create<NavigationProps>((set) => ({
  index: 0,
  max: -1,
  setNavigation: (fn: () => void, value?: number) => {
    fn();
    return set((state) => ({
      index: state.index + (value || 1),
      max: Math.max(state.max, state.index + (value || 1))
    }));
  }
}));

export default useNavigation;
