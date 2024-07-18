import * as actionTypes from "../actions/actionTypes";

const initialState = {
  patientRecords: {},
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_PATIENTS_RECORD:
      return { ...state, patientRecords: action.data };
    default:
      return state;
  }
};

export default reducer;
