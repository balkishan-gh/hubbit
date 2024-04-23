import { create } from "zustand";

interface DeletePostModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useDeletePostModal = create<DeletePostModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDeletePostModal;
