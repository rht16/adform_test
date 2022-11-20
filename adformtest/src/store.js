import { createStore } from "redux";
import  userReducer  from "./reducres/userReducer";

const store = createStore(userReducer);

export default store;