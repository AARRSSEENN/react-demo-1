import {combineReducers} from "redux";
import {usersReducer} from "./usersReducer";
import {userInfoReducer} from "./userInfoReducer";

export default combineReducers(
    {
        users: usersReducer,
        user_info: userInfoReducer
    }
)