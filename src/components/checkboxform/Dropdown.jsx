import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGreaterThan } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import style from "./Dropdown.module.css";
export default function Dropdown({ label, DropDownComponent }) {
  const [active, setActive] = useState(false);
  return (
    <div className={`${style[active ? "" : "hidden"]}`}>
      <button
        onClick={() => {
          setActive((prev) => {
            return !prev;
          });
        }}
        className={style["toggle-dropdown"]}
      >
        <h4 className={style["dropdown-name"]}>
          {label}
          <FontAwesomeIcon
            className={`${style[`${active ? "rotate" : ""}`]} ${style["icon"]}`}
            icon={faGreaterThan}
          ></FontAwesomeIcon>
        </h4>
      </button>
      <div className={style[`dropdown-content`]}>{DropDownComponent}</div>
    </div>
  );
}
