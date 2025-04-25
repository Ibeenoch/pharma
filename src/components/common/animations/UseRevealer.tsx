import { useAnimation, useInView, motion } from "framer-motion";
import React, { useEffect, useRef } from "react";

interface useRevealerProps {
  isLeft?: boolean;
  isUp?: boolean;
  children: React.ReactNode;
}
const UseRevealer: React.FC<useRevealerProps> = ({
  isLeft = true,
  isUp = false,
  children,
}) => {
  const ref = useRef(null);
  const inview = useInView(ref, { amount: "all" });

  const mainControls = useAnimation();

  useEffect(() => {
    if (inview) {
      mainControls.start("visible");
    }
  }, [inview]);

  return (
    <div ref={ref}>
      <motion.div
        variants={{
          hidden: { opacity: 0, x: isLeft ? -200 : 100, y: -100 },
          visible: { opacity: 1, x: 0, y: 0 },
        }}
        initial="hidden"
        animate={mainControls}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        {children}
      </motion.div>
    </div>
  );
};

export default UseRevealer;
