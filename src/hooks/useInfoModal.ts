import { MovieItem } from '@/model/MovieApiResponse';
import { create } from 'zustand';

interface ModalStoreInterface {
    item: MovieItem | null; // Đổi từ string sang null để tránh lỗi undefined
    isOpen: boolean;
    openModal: (item: MovieItem) => void;
    closeModal: () => void;
}

const useInfoModal = create<ModalStoreInterface>((set) => ({
    item: null, 
    isOpen: false,
    openModal: (item) => {
        set(() => ({ isOpen: true, item }));
    },
    closeModal: () => {
        set(() => ({ isOpen: false, item: null }));
    }
}));

export default useInfoModal;
