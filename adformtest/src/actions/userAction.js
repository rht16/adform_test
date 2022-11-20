import { ADD_USER } from "../actionTypes/actionTypes";

const addUser = (obj) => {
  return {
    type: ADD_USER,
    payload: obj
  };
};


export { addUser };