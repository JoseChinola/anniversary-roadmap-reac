import { useState } from "react";

const Milestone = ({ cx, cy, title, img }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <circle
        cx={cx}
        cy={cy}
        r="15"
        fill="#ff4d6d"
        className="cursor-pointer"
        onClick={() => setOpen(true)}
      />
      {open && (
        <div
          className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-6 rounded-xl shadow-lg z-50"
          onClick={() => setOpen(false)}
        >
          <p className="text-lg font-semibold text-center">{title}</p>
          <img
            src={img}
            alt={title}
            className="max-w-lg w-[90%] mt-4 rounded-xl"
          />
        </div>
      )}
    </>
  );
};

export default Milestone;
