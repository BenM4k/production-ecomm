import React from "react";

const Filters = () => {
  return (
    <>
      <h2>
        Filter by price <span></span>
      </h2>
      <div className="inputs">
        <div value="">
          <input type="checkbox" />
          <span>All price</span>
          <span>427</span>
        </div>
        <div value="">
          <input type="checkbox" />
          <span>$0 - $100</span>
          <span>100</span>
        </div>
        <div value="">
          <input type="checkbox" />
          <span>$100 - $200</span>
          <span>30</span>
        </div>
        <div value="">
          <input type="checkbox" />
          <span>$200 - $300</span>
          <span>250</span>
        </div>
        <div value="">
          <input type="checkbox" />
          <span>$300 - $400</span>
          <span>10</span>
        </div>
        <div value="">
          <input type="checkbox" />
          <span>$400 - $500</span>
          <span>37</span>
        </div>
      </div>
    </>
  );
};

export default Filters;
