const reducer = (state, action) => {
  switch (action.type) {
    case "filterCategories": {
      return {
        ...state,
        filterCategories: action.value,
      };
    }
    case "filterYear": {
      return {
        ...state,
        filterYear: action.value,
      };
    }
    case "filterPrice": {
      return {
        ...state,
        filterPrice: action.value,
      };
    }
  }
};
export default reducer;
