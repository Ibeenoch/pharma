import { ChangeEvent, FormEvent, useState } from "react";
import MaginifyGlass from "../../assets/icons/search-alt-white.svg?react";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import {
  searchedProduct,
  selectproductAdmin,
} from "../../features/admin/product/productSlice";
import SearchResult from "./SearchResult";
import { mappedSearchResult } from "../../utils/admin/product/productMap";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const [searchWord, setSearchWord] = useState<string>("");
  const [showResult, setShowResult] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { productSearched } = useAppSelector(selectproductAdmin);
  const searchResultArray = mappedSearchResult(productSearched);

  const handleSearchWord = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchWord) {
      dispatch(searchedProduct(searchWord));
      setShowResult(false);
      navigate("/search_result");
    }
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setShowResult(true);
    setSearchWord(e.target.value);
    dispatch(searchedProduct(e.target.value.trim()));
  };
  return (
    <form className="flex items-center mb-4" onClick={handleSearchWord}>
      <input
        type="search"
        name="search"
        id="search"
        value={searchWord}
        onChange={handleSearchChange}
        placeholder="Search for any Product or Brand..."
        className="hidden lg:flex w-full text-[12px] px-4 py-2 border border-gray-300 focus:border-gray-300 outline outline-gray-300 placeholder:text-xs"
      />
      <button
        type="submit"
        className="bg-gray-500 p-2 flex items-center justify-center cursor-pointer"
      >
        <MaginifyGlass className="stroke-white w-5 h-5" />
      </button>
      {showResult && searchResultArray && (
        <SearchResult
          searchResultArr={searchResultArray}
          saerchword={searchWord}
          setShowResult={setShowResult}
        />
      )}
    </form>
  );
};

export default SearchBar;
