import { create } from 'zustand';

interface ModalStoreInterface {
    slug: string | null; // Đổi từ string sang null để tránh lỗi undefined
    isOpen: boolean;
    openModal: (slug: string) => void;
    closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
    slug: null, 
    isOpen: false,
    openModal: (slug) => {
        set(() => ({ isOpen: true, slug }));
    },
    closeModal: () => {
        set(() => ({ isOpen: false, slug: null }));
    }
}));

export default useInfoModal;
