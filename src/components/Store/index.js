import { createStore } from "redux";

const initialState = {
  filter: 0,
  itemsArr: [],
  currency: 0,
  opacity: false,
  currencySymbol: "",
};

const Store = (state = initialState, action) => {
  if (action.type === "add") {
    if (!action.obj.quantity) {
      action.obj.quantity = 1;
    }

    if (state.itemsArr.length === 0) {
      return {
        ...state,
        itemsArr: [action.obj, ...state.itemsArr],
      };
    }

    const temp = state.itemsArr.findIndex((x) => x.id === action.obj.id);
    if (temp >= 0) {
      state.itemsArr[temp].quantity++;
      return {
        ...state,
        itemsArr: [...state.itemsArr],
      };
    } else {
      return {
        ...state,
        itemsArr: [action.obj, ...state.itemsArr],
      };
    }
  }

  if (action.type === "remove") {
    const temp = state.itemsArr.findIndex((x) => x.id === action.obj.id);
    if (action.obj.quantity < 2) {
      state.itemsArr[temp].quantity = 0;

      return {
        ...state,
        itemsArr: state.itemsArr.filter((item) => item.quantity !== 0),
      };
    }

    if (temp >= 0) {
      state.itemsArr[temp].quantity--;
      return {
        ...state,
        itemsArr: [...state.itemsArr],
      };
    }
  }

  if (action.type === "set") {
    return {
      ...state,
      filter: (state.filter = action.filterState),
    };
  }

  if (action.type === "switchCurr") {
    return {
      ...state,
      currency: (state.currency = action.curr),
    };
  }

  if (action.type === "remove") {
    return {
      counter: state.counter - 1,
      itemsArr: state.itemsArr.push(action.obj),
    };
  }

  if (action.type === "hover") {
    return {
      ...state,
      opacity: (state.opacity = action.opacityState),
    };
  }

  if (action.type === "symbolValue") {
    return {
      ...state,
      currencySymbol: (state.currencySymbol = action.symbol),
    };
  }
  return state;
};

const store = createStore(Store);

export default store;
