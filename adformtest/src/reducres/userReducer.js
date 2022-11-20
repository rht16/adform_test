import { ADD_USER } from "../actionTypes/actionTypes";

const initialState = {
  user: [],
};

 const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
