import style from "./CheckBoxForm.module.css";
import { motion } from "framer-motion";
import { memo } from "react";
import { useEffect, useState } from "react";
const CheckBoxForm = memo(({ values, labels, onChange }) => {
  const [checkedValues, setCheckedValues] = useState(
    values.reduce((accumulator, value) => {
      accumulator[value] = false;
      return accumulator;
    }, {})
  );
  useEffect(() => {
    const values = [];
    for (const value in checkedValues) {
      if (checkedValues[`${value}`]) {
        values.push(+value);
      }
    }
    onChange(values);
  }, [checkedValues]);
  const handleCheck = (event) => {
    let checked = false;
    if (event.target.checked) {
      checked = true;
    }
    setCheckedValues((prev) => {
      const newState = { ...prev };
      newState[`${event.target.value}`] = checked;
      return newState;
    });
  };
  const elements = values.map((value, index) => {
    return (
      <div key={value} className={style["check-group"]}>
        <input
          onChange={handleCheck}
          type="checkbox"
          value={value}
          name="filter-publisher"
          id="filter-publisher"
        />
        <label htmlFor="filter-publisher">{labels[index]}</label>
      </div>
    );
  });
  return (
    <motion.form
      initial={{ height: 0 }}
      animate={{ height: `auto` }}
      onSubmit={(event) => {
        event.preventDefault();
      }}
      className={style["check-form"]}
    >
      {elements}
    </motion.form>
  );
});
export default CheckBoxForm;
