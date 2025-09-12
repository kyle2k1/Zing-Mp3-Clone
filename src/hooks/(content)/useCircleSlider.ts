import { create } from 'zustand';

interface OptionsProps {
  width: number;
  setWidth: () => void;
}
const useCircleSlider = create<OptionsProps>((set) => ({
  width: 0,
  setWidth: () => {
    const card = document.getElementById('card');
    if (card) {
      set({ width: card.offsetWidth });
    }
  }
}));

export default useCircleSlider;
