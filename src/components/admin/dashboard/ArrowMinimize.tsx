import React from "react";

interface ArrowMinimizeProps {
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

const ArrowMinimize: React.FC<ArrowMinimizeProps> = ({
  showIcon,
  Icon,
  callBack,
}) => {
  return (
    <div
      className={`fixed hidden ${
        showIcon ? "lg:hidden" : "lg:block"
      } top-5 left-[14%] bg-amber-500/50 z-50 p-1 rounded-full cursor-pointer`}
    >
      <Icon onClick={callBack} className="w-6 h-6 text-black" />
    </div>
  );
};

export default ArrowMinimize;
