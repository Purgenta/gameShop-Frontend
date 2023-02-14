import { useEffect, useState, useReducer } from "react";
import RangeSlider from "../rangeslider/RangeSlider";
import axiosRequest from "../../requests/axiosRequest";
import style from "./Filter.module.css";
import Dropdown from "../checkboxform/Dropdown";
import CheckBoxForm from "../checkboxform/CheckBoxForm";
import filterReducer from "./filterReducer";
import useRequestState from "../../hooks/useRequestState";
export default function Filter({ className, onChange }) {
  const { data, error, setData, setError } = useRequestState();
  const [state, dispatch] = useReducer(filterReducer, null);
  const categoryLabels = data && data.categories.map((value) => value.name);
  const categoryValues = data && data.categories.map((value) => value.id);
  useEffect(() => {
    const getFilterData = async () => {
      try {
        const response = await axiosRequest.get(`games/filterValues`);
        setData(response.data);
      } catch (error) {
        setError(error);
      }
    };
    getFilterData();
  }, []);
  useEffect(() => {
    if (!state) return;
    const timeOut = setTimeout(() => {
      let url = `games/getGames`;
      const { filterYear, filterPrice, filterCategories } = state;
      url += `?fromYear=${filterYear.lower}&toYear=${filterYear.upper}&fromPrice=${filterPrice.lower}&toPrice=${filterPrice.upper}`;
      if (filterCategories?.length) {
        filterCategories.forEach((value) => {
          url += `&searchCategories=${value}`;
        });
      }
      onChange(url);
    }, 500);
    return () => {
      clearTimeout(timeOut);
    };
  }, [state]);
  return (
    <aside className={`${className}}`}>
      <ul className={`${style["filter-list"]}`}>
        {data && (
          <>
            <li>
              <Dropdown
                label={"Release year"}
                DropDownComponent={
                  <RangeSlider
                    onChange={(rangeState) => {
                      dispatch({
                        value: { ...rangeState },
                        type: "filterYear",
                      });
                    }}
                    lower={data["filter"]["minYear"]}
                    upper={data["filter"]["maxYear"]}
                  />
                }
              ></Dropdown>
            </li>
            <li>
              <Dropdown
                label={"Price"}
                DropDownComponent={
                  <RangeSlider
                    onChange={(rangeState) => {
                      dispatch({
                        value: { ...rangeState },
                        type: "filterPrice",
                      });
                    }}
                    currency={`\u20AC`}
                    lower={data["filter"]["minPrice"]}
                    upper={data["filter"]["maxPrice"]}
                  ></RangeSlider>
                }
              />
            </li>
            <li>
              <Dropdown
                label={"Categories"}
                DropDownComponent={
                  <CheckBoxForm
                    labels={categoryLabels}
                    values={categoryValues}
                    onChange={(checkedValues) => {
                      dispatch({
                        value: [...checkedValues],
                        type: "filterCategories",
                      });
                    }}
                  />
                }
              ></Dropdown>
            </li>
            <li>
              <Dropdown label={`Sort by`} DropDownComponent={<></>}></Dropdown>
            </li>
          </>
        )}
      </ul>
    </aside>
  );
}
