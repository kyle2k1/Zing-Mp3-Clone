import { User } from '@prisma/client';
import { create } from 'zustand';

interface CurrentUserProps {
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
}
const useCurrentUser = create<CurrentUserProps>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: User) => set({ currentUser: user })
}));

export default useCurrentUser;
