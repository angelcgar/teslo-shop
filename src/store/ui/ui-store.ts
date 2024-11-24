import { create } from "zustand";

interface Props {
  isSideMenuOpen: boolean;

  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<Props>()((set) => ({
  isSideMenuOpen: false,

  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
