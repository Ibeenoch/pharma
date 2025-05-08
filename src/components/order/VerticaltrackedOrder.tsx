import React, { lazy } from "react";
import { formatFullDateTime } from "../../utils/dateFormatter";
const CheckMark = lazy(() =>import("../cart/CheckMark"));
const CustomText = lazy(() =>import('../common/Text'));

interface VerticaltrackedOrderProps {
  steps?: number;
  ordertime?: string;
  shippedtime?: string;
  deliveredtime?: string;
}

const VerticaltrackedOrder: React.FC<VerticaltrackedOrderProps> = ({
  steps = 2,
  ordertime,
  deliveredtime,
  shippedtime,
}) => {
  return (
    <div className="flex gap-5 pb-8 pl-15 border-b border-gray-300">
      <div className="flex flex-col items-center">
        <div
          className={`h-16 w-1 border-2 border-amber-500 bg-amber-500`}
        ></div>
        <CheckMark containerSize={5} iconSize={4} extraStyle="w-min" />
        <div
          className={`h-16 w-1 border-2 border-amber-500 bg-amber-500 ${steps && steps >= 3 ? "" : "opacity-50"} `}
        ></div>
        <CheckMark
          containerSize={5}
          iconSize={4}
          extraStyle={`w-min  ${steps && steps >= 3 ? "" : "opacity-50"}`}
        />
        <div
          className={`h-16 w-1 border-2 border-amber-500 bg-amber-500  ${steps && steps >= 4 ? "" : "opacity-50"}`}
        ></div>
        <CheckMark
          containerSize={5}
          iconSize={4}
          extraStyle={`w-min  ${steps && steps >= 4 ? "" : "opacity-50"}`}
        />
      </div>

      <div className="flex flex-col items-center gap-14">
        <div className="mt-16 md:mt-12">
          <CustomText text="ORDERED" textType="small" weightType="semibold" />
          <CustomText
            text={ordertime && formatFullDateTime(ordertime)}
            textType="small"
            weightType="medium"
          />
        </div>
        <div>
          <CustomText text="SHIPPED" textType="small" weightType="semibold" />
          <CustomText
            text={shippedtime && formatFullDateTime(shippedtime)}
            textType="small"
            weightType="medium"
          />
        </div>
        <div>
          <CustomText text="DELIVERED" textType="small" weightType="semibold" />
          <CustomText
            text={deliveredtime && formatFullDateTime(deliveredtime)}
            textType="small"
            weightType="medium"
          />
        </div>
      </div>
    </div>
  );
};

export default VerticaltrackedOrder;
