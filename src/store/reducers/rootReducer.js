import { combineReducers } from 'redux';
import authReducer from './authReducer'
import TPReducer from './TreatmentPlanReducer'
const rootReducer = combineReducers({
    auth : authReducer,
    treatmentPlan : TPReducer
})

export default rootReducer