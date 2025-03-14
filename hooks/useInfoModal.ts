import {create} from 'zustand';
export interface ModalStoreInterface {
        movieId : string;
        isOpen: boolean;
        openModel: (modelId: string) => void;
        closeModa: () => void ;
}

const useInfoModal = create <ModalStoreInterFace> ((set)=>({
    movieId: undefined,
    isOpen: false, 
    openModal: (movieId:string ) => set({isOpen: true , movieId}),
    onCLose: () => set ({isOpen: false, movieId: undefined})

}) );

export default useInfoModal;