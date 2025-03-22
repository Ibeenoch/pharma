import CustomText from "./Text";

interface ListProps{
    lists: string[];
    textType:  "small" | "normal" | "extrasmall" | "medium" | "large" | "extralarge" | "huge" | "superhuge";
    weightType: "normal" | "medium" | "bold" | "thin" | "superbold";
    extraStyle?: string;
    isVertical?: boolean;
    showOnMobile?: boolean;
}

const Lists: React.FC<ListProps> = ({ lists, textType, weightType, extraStyle, isVertical=false, showOnMobile=false }) => {
  return (
    <ul className={`${showOnMobile ? 'flex flex-col my-3' : 'hidden'} lg:flex ${isVertical ? 'lg:flex-col mt-4' : 'items-center'}   gap-4`}>
    {lists.map((link) => (
      <li className="cursor-pointer">
        <CustomText
          text={link}
          textType={textType}
          weightType={weightType}
          extraStyle={`hover:text-amber-500 ${extraStyle}`}
        />
      </li>
    ))}
  </ul>
  )
}

export default Lists