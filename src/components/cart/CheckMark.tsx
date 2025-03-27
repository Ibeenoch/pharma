import Checker from "../../assets/icons/check-mark.svg?react";
interface CheckMarkProps {
  containerSize?: number;
  iconSize?: number;
}

const CheckMark: React.FC<CheckMarkProps> = ({
  containerSize = 4,
  iconSize = 2,
}) => {
  return (
    <div
      className={`w-${containerSize} h-${containerSize} rounded-full bg-amber-500 flex justify-center items-center`}
    >
      <Checker className={`w-${iconSize} h-${iconSize}`} />
    </div>
  );
};

export default CheckMark;
