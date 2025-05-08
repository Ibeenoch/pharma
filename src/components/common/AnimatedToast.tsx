import React, { lazy } from "react";
import Mark from "../../assets/icons/check-mark.svg?react";
import Danger from "../../assets/icons/exclamation-mark.svg?react";
import Cart from "../../assets/icons/cart-fill-white.svg?react";
import Fave from "../../assets/icons/heart.svg?react";
const CustomText = lazy(() => import("./Text"));


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



  return (
    <div className="">
        {start && (
         
            <div className={`w-60 md:w-90 border border-white ${IconType === 'failed' ? 'bg-red-500': 'bg-white' } shadow-lg flex items-center gap-4 justify-start rounded-xl`}>
              <div
                className={`px-2 flex justify-center w-13 h-13 border border-white ${
                  IconType === "success" ||
                  IconType === "cart" ||
                  IconType === "fave"
                    ? "bg-amber-500"
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
              <div className={`flex ${IconType === 'failed' ? 'bg-red-500': 'bg-white' } items-center gap-2 justify-center`}>
               {
                IconType !== 'failed' && IconType !== 'success' && (
                  <Mark className="w-5 h-5 text-amber-600" />
                )
               } 
                <CustomText
                  text={text}
                  textType="normal"
                  color="text-amber-600"
                  weightType="medium"
                  extraStyle="text-center"
                />
              </div>
            </div>
        
        )}
    </div>
  );
};

export default AnimatedToast;
