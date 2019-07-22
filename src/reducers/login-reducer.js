import { SIGNIN } from "../actions/login-action";

export default function userReducer(state = [], action) {
  switch (action.type) {
    case SIGNIN: {
      state = [...state, action.payload];
      return state;
    }
    default: {
      return state;
    }
  }
}
