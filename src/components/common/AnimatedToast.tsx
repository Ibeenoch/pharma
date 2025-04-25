import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Mark from "../../assets/icons/check-mark.svg?react";
import Danger from "../../assets/icons/exclamation-mark.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Fave from "../../assets/icons/heart.svg?react";
import CustomText from "./Text";

interface AnimatedToastProps {
  IconType?: "success" | "failed" | "cart" | "fave";
  start: boolean;
  text: string;
}

const AnimatedToast: React.FC<AnimatedToastProps> = ({
  IconType,
  start,
  text,
}) => {
  const [show, setShow] = useState(start);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (start) {
      setShow(true);
      timer = setTimeout(() => {
        setShow(false);
      }, 7000); // 7 seconds
    }

    return () => clearTimeout(timer);
  }, [start]);

  return (
    <div className="w-full">
      <AnimatePresence>
        {show && (
          <motion.div
            className="fixed top-40 left-[50%] w-full"
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "-700px", opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="w-90 bg-[#f9f9f9] shadow-lg flex items-center gap-4 justify-start rounded-xl">
              <div
                className={`px-2 flex justify-center w-13 h-13 ${
                  IconType === "success" ||
                  IconType === "cart" ||
                  IconType === "fave"
                    ? "bg-green-500"
                    : "bg-red-500"
                } items-center rounded-lg`}
              >
                {IconType === "success" ? (
                  <Mark className="w-6 h-6 text-white" />
                ) : IconType === "cart" ? (
                  <Cart className="w-5 h-5 text-white" />
                ) : IconType === "fave" ? (
                  <Fave className="w-5 h-5 text-white" />
                ) : (
                  <Danger className="w-4 h-4 text-white" />
                )}
              </div>
              <div className="flex justify-center">
                <CustomText
                  text={text}
                  textType="normal"
                  color="text-gray-800"
                  weightType="medium"
                  extraStyle="text-center"
                />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AnimatedToast;
