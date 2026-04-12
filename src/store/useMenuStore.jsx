import { create } from "zustand";

const useMenuStore = create((set) => ({
  selectedSubMenu: null,
  setSelectedSubMenu: (subMenu) => set({ selectedSubMenu: subMenu }),
}));
export default useMenuStore;
