import Checker from "../../assets/icons/check-mark.svg?react";
interface CheckMarkProps {
  containerSize?: number;
  iconSize?: number;
  extraStyle?: string;
}

const CheckMark: React.FC<CheckMarkProps> = ({
  containerSize = 4,
  iconSize = 2,
  extraStyle,
}) => {
  return (
    <div
      className={`w-${containerSize} h-${containerSize} ${extraStyle} rounded-full p-[2.5px] bg-amber-500 flex justify-center items-center`}
    >
      <Checker className={`w-${iconSize} h-${iconSize} text-white`} />
    </div>
  );
};

export default CheckMark;
