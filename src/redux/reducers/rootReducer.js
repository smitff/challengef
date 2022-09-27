import { combineReducers } from "redux"
// import addatar from "./adid"
// import counter from "./count"
import auth from "./auth"
import location from "./location"
import area from "./area"


export default combineReducers({auth:auth, location:location, area:area})
