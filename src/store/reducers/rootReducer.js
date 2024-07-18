import { combineReducers } from "redux";
import authReducer from "./authReducer";
import TPReducer from "./TreatmentPlanReducer";
import adminReducer from "./adminReducer";
import dashboardReducer from "./dashboardReducer";
const rootReducer = combineReducers({
  auth: authReducer,
  treatmentPlan: TPReducer,
  admin: adminReducer,
  dashboard: dashboardReducer,
});

export default rootReducer;
