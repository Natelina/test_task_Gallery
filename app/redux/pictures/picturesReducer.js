import { SET_PICTURES } from "./actions";

const initialState = {
  pictures: [],
};

export const picturesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PICTURES:
      return {
        ...state,
        pictures: [...state.pictures, ...action.payload],
      };

    default:
      return state;
  }
};
