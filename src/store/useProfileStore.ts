import { create } from "zustand";
import { persist } from "zustand/middleware";

export type ProfileTabType = "myAnswer" | "bookmark" | "likeAnswer" | "comment";

interface ProfileTabState {
  selectedTab: ProfileTabType;
  setSelectedTab: (tab: ProfileTabType) => void;
}

export const useProfileTabStore = create<ProfileTabState>()(
  persist(
    (set) => ({
      selectedTab: "myAnswer",
      setSelectedTab: (tab) => set({ selectedTab: tab }),
    }),
    {
      name: "profile-tab",
    }
  )
);
