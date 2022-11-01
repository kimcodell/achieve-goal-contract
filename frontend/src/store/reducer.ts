import { AnyAction, CombinedState, combineReducers } from "@reduxjs/toolkit";
import { HYDRATE } from "next-redux-wrapper";

interface IRootStates {
  
}

const rootReducer = (
	state: IRootStates,
  action: AnyAction,
): CombinedState<IRootStates> => {
  switch(action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({});
      return combinedReducer(state, action);
    }
  }
}

export type RootStates = ReturnType<typeof rootReducer>;

export default rootReducer;
