import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {userInfoReducer} from "./userInfoReducer";
import { loginReducer } from "./loginReduser";
import {registrationReducer} from "./registrationReducer";

export default combineReducers(
    {
        users: usersReducer,
        user_info: userInfoReducer,
        login: loginReducer,
        registration: registrationReducer
    }
)