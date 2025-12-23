import { useEffect, useState } from "react";

const CursorColor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);
    return () => window.removeEventListener("mousemove", updatePosition);
  }, []);

  return (
    <div className="fixed top-0 left-0 pointer-events-none w-full h-full">
      <div className="p-2 border-2 border-amber-500/30 rounded-full">
         <div
        className="absolute w-3 h-3 bg-amber-500/30 rounded-full transition-transform duration-50"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
        }}
      />
      </div>
   
    </div>
  );
};

export default CursorColor;
