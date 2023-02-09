import { useState, useRef, useEffect } from "react";
import { memo } from "react";
import "./RangeSlider.css";
const RangeSlider = memo(({ lower, upper, currency, onChange }) => {
  const [range, setRange] = useState({
    lower,
    upper,
  });
  const lowerRef = useRef();
  const upperRef = useRef();
  useEffect(() => {
    onChange(range);
  }, [range]);
  const onChangeLower = () => {
    const value = lowerRef.current.value;
    setRange((prev) => {
      return {
        ...prev,
        lower: +value,
      };
    });
  };
  const onChangeUpper = () => {
    const value = upperRef.current.value;
    setRange((prev) => {
      return {
        ...prev,
        upper: +value,
      };
    });
  };
  const rangeWidth = (range.upper - range.lower) / (upper - lower);
  const leftOffSet = 100 - ((upper - range.lower) / (upper - lower)) * 100;
  return (
    <div className="range-wrapper">
      <div className="ranges">
        <input
          min={lower}
          ref={lowerRef}
          value={range.lower}
          onChange={onChangeLower}
          max={range.upper}
          className="range left"
          type={"range"}
        />
        <input
          max={upper}
          min={range.lower}
          value={range.upper}
          ref={upperRef}
          onChange={onChangeUpper}
          className="range right"
          type={"range"}
        ></input>
        <div
          className="full-range"
          style={{ width: `${rangeWidth * 15}rem`, left: `${leftOffSet}%` }}
        />
        <div className="out-range" />
      </div>
      <div className="price">
        <h3 className="price-lower">{`${range.lower}${currency || ""}`}</h3>
        <h3 className="price-higher">{`${range.upper}${currency || ""}`}</h3>
      </div>
    </div>
  );
});
export default RangeSlider;
