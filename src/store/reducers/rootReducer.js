import { combineReducers } from "redux";
import authReducer from "./authReducer";
import TPReducer from "./TreatmentPlanReducer";
import adminReducer from "./adminReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  treatmentPlan: TPReducer,
  admin: adminReducer,
});

export default rootReducer;
