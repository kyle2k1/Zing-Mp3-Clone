import { User } from '@prisma/client';
import { create } from 'zustand';

interface UseCurrentUser {
  currentUser: User | undefined;
  setCurrentUser: (user: User) => void;
}
const useCurrentUser = create<UseCurrentUser>((set) => ({
  currentUser: undefined,
  setCurrentUser: (user: User) => set({ currentUser: user })
}));

export default useCurrentUser;
