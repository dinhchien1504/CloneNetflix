import React, { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

interface ModalWrapperProps {
  children: React.ReactNode;
  onClose: () => void;
}

const ModalWrapper: React.FC<ModalWrapperProps> = ({ children, onClose }) => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setShowModal(true);
    const timeout = setTimeout(() => setShowModal(false), 10);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pt-8 font-semibold">
      {/* Overlay */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          showModal ? "opacity-0" : "opacity-70"
        }`}
        onClick={onClose}
      ></div>

      {/* Modal Wrapper */}
      <div
        className={`relative w-[90%] md:w-[75%] lg:w-[65%] max-h-[95vh] bg-zinc-900 rounded-lg shadow-lg z-10 transition-all duration-300 transform overflow-hidden ${
          showModal ? "scale-0 opacity-0" : "scale-100 opacity-100"
        }`}
      >
         {/* Close Button */}
         <div
          className="absolute top-3 right-3 z-20 h-10 w-10 rounded-full bg-black bg-opacity-70 flex items-center justify-center cursor-pointer"
          onClick={onClose}
        >
          <AiOutlineClose className="text-white" size={20} />
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto max-h-[95vh] scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent">
          {children}
        </div>
      </div>
    </div>
  );
};

export default ModalWrapper;
