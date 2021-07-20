import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {userInfoReducer} from "./userInfoReducer";
import { loginReducer } from "./loginReduser";

export default combineReducers(
    {
        users: usersReducer,
        user_info: userInfoReducer,
        login: loginReducer
    }
)