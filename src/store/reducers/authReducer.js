import * as actionType from "../actions/actionTypes";

const initialState = {
  user: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.data };

    default:
      return state;
  }
};

export default reducer;