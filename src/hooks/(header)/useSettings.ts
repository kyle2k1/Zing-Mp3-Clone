import { create } from 'zustand';

interface SettingsProps {
  showSettings: boolean;
  setShowSettings: (value: boolean) => void;
}
const useSettings = create<SettingsProps>((set) => ({
  showSettings: false,
  setShowSettings: (value: boolean) => set({ showSettings: value })
}));

export default useSettings;
