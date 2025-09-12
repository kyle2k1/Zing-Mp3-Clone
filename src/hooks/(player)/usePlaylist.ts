import { create } from 'zustand';

interface PlaylistProps {
  showPlaylist: boolean;

  setShowPlaylist: () => void;
}
const usePlaylist = create<PlaylistProps>((set) => ({
  showPlaylist: false,
  setShowPlaylist: () => set((state) => ({ showPlaylist: !state.showPlaylist }))
}));

export default usePlaylist;
