import { create } from 'zustand';

interface VolumeProps {
  change: boolean;
  volume: number;
  mute: boolean;
  setMute: () => void;

  setVolume: (value: number) => void;
  setChange: (value: boolean) => void;
}
const useVolume = create<VolumeProps>((set) => ({
  change: false,
  volume: 0.5,
  mute: false,
  setMute: () => set((state) => ({ mute: !state.mute })),
  setVolume: (value: number) => set({ volume: value }),
  setChange: (value: boolean) => set({ change: value })
}));

export default useVolume;
