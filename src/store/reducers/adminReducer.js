import * as actionType from "../actions/actionTypes";

const initialState = {
  userConfig: {},
  usersList: [],
  patientData: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_ALL_USERS:
      return { ...state, usersList: action.data };
    case actionType.GET_USER_CONFIG:
      return { ...state, userConfig: action.data };
    case actionType.GET_PATIENT:
      return { ...state, patientData: action.data };
    case actionType.UPDATE_USER_CONFIG:
      return { ...state, userConfig: action.data };

    default:
      return state;
  }
};

export default reducer;
