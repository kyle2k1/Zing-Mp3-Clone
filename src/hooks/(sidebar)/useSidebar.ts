import { create } from 'zustand';

interface SidebarProps {
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}
const useSidebar = create<SidebarProps>((set) => ({
  showSidebar: false,
  setShowSidebar: (value: boolean) => set({ showSidebar: value })
}));

export default useSidebar;
