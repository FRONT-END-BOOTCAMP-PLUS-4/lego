import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileTabType = "myAnswer" | "bookmark" | "likeAnswer" | "comment";
export type MypageTabType = 0 | 1;

interface ProfileStoreState {
  activeIndex: MypageTabType;
  setActiveIndex: (index: MypageTabType) => void;

  selectedTab: ProfileTabType;
  setSelectedTab: (tab: ProfileTabType) => void;
}

export const useProfileStore = create<ProfileStoreState>()(
  persist(
    (set) => ({
      activeIndex: 0,
      setActiveIndex: (index) => set({ activeIndex: index }),

      selectedTab: "myAnswer",
      setSelectedTab: (tab) => set({ selectedTab: tab }),
    }),
    {
      name: "profile-store",
    }
  )
);
