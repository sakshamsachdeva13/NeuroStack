import * as actionTypes from '../actions/actionTypes'

const initialState = {
    treatmentPlan : {}
}

const reducer = (state = initialState , action) => {
    switch (action.type) {
        case actionTypes.CREATE_TP:
            return {...state };
        case actionTypes.SET_TP:
            return {...state , treatmentPlan : action.data};
        default:
            return state;

    }
}

export default reducer;
