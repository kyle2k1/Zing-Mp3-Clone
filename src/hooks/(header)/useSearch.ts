import { create } from 'zustand';

interface SearchProps {
  showSearch: boolean;
  setShowSearch: (value: boolean) => void;
}
const useSearch = create<SearchProps>((set) => ({
  showSearch: false,
  setShowSearch: (value: boolean) => set({ showSearch: value })
}));

export default useSearch;
