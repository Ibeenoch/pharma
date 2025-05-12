import { useNavigate } from "react-router-dom";
import { selectAuth, setNavIndexLink } from "../../features/auth/authSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { lazy } from "react";
const CustomText = lazy(() => import("./Text"));


interface ListProps {
  lists: {
    name: string;
    route: string;
  }[];
  textType:
    | "small"
    | "normal"
    | "extrasmall"
    | "medium"
    | "large"
    | "extralarge"
    | "huge"
    | "superhuge";
  weightType: "normal" | "medium"  | "semibold" | "bold" | "thin" | "superbold";
  extraStyle?: string;
  isVertical?: boolean;
  showOnMobile?: boolean;
  isFooter: boolean;
}

const Lists: React.FC<ListProps> = ({
  lists,
  textType,
  weightType,
  extraStyle,
  isVertical = false,
  showOnMobile = false,
  isFooter = false,
}) => {
  const dispatch = useAppDispatch();
  const { navpageIndex, navpageName } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const handleActiveTab = (name: string, index: number, route: string) => {
    dispatch(setNavIndexLink({ name, index }));
    navigate(route);
  };
  return (
    <ul
      className={`${showOnMobile ? "flex flex-col my-3" : "hidden"} lg:flex ${isVertical ? "lg:flex-col mt-4" : "items-center"}   gap-4`}
    >
      {lists.map((link, i) => (
        <li
          onClick={() => handleActiveTab(link.name, i, link.route)}
          className="cursor-pointer"
        >
          <CustomText
            text={link.name}
            textType={textType}
            color={`${navpageIndex === i && navpageName === link.name && !isFooter && "text-amber-500"}`}
            weightType={weightType}
            extraStyle={`hover:text-amber-500 ${extraStyle} ${navpageIndex === i && navpageName === link.name && !isFooter && "border-b-2 border-amber-500"}`}
          />
        </li>
      ))}
    </ul>
  );
};

export default Lists;
