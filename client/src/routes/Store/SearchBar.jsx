import { TbCategory } from "react-icons/tb";

import PrimaryButton from "../../components/buttons/PrimaryButton";

const SearchBar = () => {
  return (
    <div className="store-search">
      <TbCategory />
      <form action="">
        <input type="text" placeholder="Search product" />
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
