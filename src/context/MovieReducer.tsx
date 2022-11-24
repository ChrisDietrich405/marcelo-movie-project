import { MovieContextProps, initialState } from "./MovieContext";

interface IAction {
  type: string;
  payload: any;
}

export const MovieReducer = (state: MovieContextProps, action: IAction) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      return {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case "DELETE_MOVIE":
      return 
    default:
      return state;
  }
};
