import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { resetSearchProduct } from "../../features/admin/product/productSlice";
import Cancel from "../../assets/icons/cancel-close.svg?react";
import CustomText from "../common/Text";


interface SearchResultProps {
  searchResultArr: {
    image: string;
    amberText: string;
    titleText: string;
    descText: string;
    timeText?: string;
    id?: string;
  }[];
  saerchword: string;
  setShowResult: React.Dispatch<React.SetStateAction<boolean>>;
}

const SearchResult: React.FC<SearchResultProps> = ({
  searchResultArr,
  saerchword,
  setShowResult,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const handleSearchedNav = (id: string) => {
    dispatch(resetSearchProduct());
    navigate(`/product_details/${id}`);
  };
  const closeDisplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowResult(false);
  };

    useEffect(() => {
      // when the user visit the page move the page to the top
      window.scrollTo(0,0);

    },[])
  return (
    <section className="absolute top-30 flex justify-center overflow-y-auto max-h-[70vh]">
      <div className="mx-auto bg-[#fbfcf8] px-2 overflow-y-auto">
        {searchResultArr.length > 0 && (
          <div className="p-2 bg-white mt-2 flex justify-between items-center">
            <CustomText
              text={`${searchResultArr.length} results for ${saerchword}`}
              textType="normal"
              weightType="semibold"
              color="text-gray-500"
            />
            <div className="cursor-pointer" onClick={closeDisplay}>
              <Cancel className="w-5 h-5" />
            </div>
          </div>
        )}
        {searchResultArr && Array.isArray(searchResultArr) && searchResultArr.map((search) => (
          <div
            onClick={() => {
              search && search.id && handleSearchedNav(search && search.id);
            }}
            className="p-2 flex gap-3 items-center my-2 bg-white cursor-pointer"
          >
            <div className="p-2 bg-[#fbfcf8] rounded-lg">
              <img
                src={search && search.image}
                alt="search image"
                className="w-25 h-18 rounded-lg"
              />
            </div>
            <div>
              <CustomText
                text={search && search.amberText}
                textType="normal"
                weightType="semibold"
                color="text-amber-500"
              />
              <CustomText
                text={search && search.titleText}
                textType="small"
                weightType="normal"
              />
              <CustomText
                text={
                  search && search.descText.length > 55
                    ? search.descText.slice(0, 55) + "..."
                    : search.descText
                }
                textType="small"
                weightType="normal"
              />
              <CustomText
                text={search && search.timeText}
                textType="extrasmall"
                weightType="medium"
                color="text-gray-400"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SearchResult;
