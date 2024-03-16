import React, { useState } from "react";

const Filters = ({ ranges, onChange }) => {
  const [selectedRange, setSelectedRange] = useState("all");

  const handleCheckBoxChange = (ran) => {
    if (selectedRange === ran) {
      setSelectedRange(null);
      onChange(null);
    } else {
      setSelectedRange(ran);
      onChange(ran);
    }
  };
  return (
    <>
      <h2>
        Filter by price <span></span>
      </h2>
      <div className="inputs">
        {Object.entries(ranges)?.map(([key, value]) => (
          <div key={key}>
            <input
              type="checkbox"
              checked={selectedRange === key}
              onChange={() => handleCheckBoxChange(key)}
            />
            <span>
              {value.lt === 9000 && value.gt === 0
                ? "All ranges"
                : value.lt === 9000
                ? `${value.gt} - Above`
                : `${value.gt} - ${value.lt}`}
            </span>
            <span>{value.total}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Filters;
