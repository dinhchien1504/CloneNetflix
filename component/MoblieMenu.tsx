import React from "react";

interface MoblieMenuProps {
  visible: boolean;
}

const MoblieMenu: React.FC<MoblieMenuProps> = ({ visible }) => {
  if (!visible) {
    return null;
  }

  return (
    <div
      className="
    bg-black
    w-56
    absolute
    left-0
    top-8
    py-5
    flex-col
    border-2
    border-gray-100 
    "
    >
      <div className="
      flex
      flex-col
      gap-4
      ">
        <div
          className="
        px-3 text-center text-white
        hover:underline
         "
        >
          Home
        </div>
        <div
          className="
        px-3 text-center text-white
        hover:underline
         "
        >
          Series
        </div>
        <div
          className="
        px-3 text-center text-white
        hover:underline
         "
        >
          FilmsFilms
        </div>
      </div>
    </div>
  );
};

export default MoblieMenu;
