import { create } from "zustand";

interface ActiveListStore {
  members: string[];
  add: (memberId: string) => void;
  remove: (memberId: string) => void;
  set: (memberIds: string[]) => void;
}

const useActiveList = create<ActiveListStore>((set) => ({
  members: [],
  add: (memberId: string) =>
    set((state) => ({
      members: [...state.members, memberId],
    })),
  remove: (memberId: string) =>
    set((state) => ({
      members: state.members.filter((id) => id !== memberId),
    })),
  set: (memberIds: string[]) => set({ members: memberIds }),
}));

export default useActiveList;
