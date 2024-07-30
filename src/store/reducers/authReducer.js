import * as actionType from "../actions/actionTypes";

const initialState = {
  user: {},
  username : "",
  view : "login"
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.SET_USER:
      return { ...state, user: action.data  };
    case actionType.SET_USERNAME : 
        return {...state , username : action.data};
    case actionType.SET_VIEW : {
      
      return {...state , view : action.data}
    }
      

    default:
      return state;
  }
};

export default reducer;