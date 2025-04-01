import React from "react";

interface ArrowMaximizeProps {
  showIcon: boolean;
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  callBack: () => void;
}

const ArrowMaximize: React.FC<ArrowMaximizeProps> = ({
  showIcon,
  Icon,
  callBack,
}) => {
  return (
    <div
      className={`fixed ${
        showIcon ? "block" : "hidden"
      } top-5 left-[4%] bg-amber-500/50 z-50 p-1 rounded-full cursor-pointer`}
    >
      <Icon onClick={callBack} className="w-6 h-6 text-black" />
    </div>
  );
};

export default ArrowMaximize;
