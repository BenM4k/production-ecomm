import { TbCategory } from "react-icons/tb";

import PrimaryButton from "../../components/buttons/PrimaryButton";
import { useEffect, useState } from "react";

const SearchBar = ({ onChange }) => {
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      onChange(searchItem);
    }, 500);

    return () => {
      clearTimeout(debounceTimer);
    };
  }, [searchItem, onChange]);

  return (
    <div className="store-search">
      <TbCategory />
      <form action="">
        <input
          type="text"
          placeholder="Search product"
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
        />
        <PrimaryButton>search</PrimaryButton>
      </form>
      <select name="" id="">
        <option value="">Sorting</option>
        <option value="">Latest</option>
        <option value="">Popularity</option>
        <option value="">Best Rating</option>
      </select>
    </div>
  );
};

export default SearchBar;
