import { MovieContextProps, initialState } from "./MovieContext";

interface IAction {
  type: string;
  payload: any;
}

export const MovieReducer = (state: MovieContextProps, action: IAction) => {
  switch (action.type) {
    case "ADD_MOVIE_TO_WATCHLIST":
      const newWatchlistState = {
        ...state,
        watchlist: [action.payload, ...state.watchlist],
      };
      localStorage.setItem(
        "watchlist",
        JSON.stringify(newWatchlistState.watchlist)
      );
      return newWatchlistState;
    case "ADD_MOVIE_TO_WATCHED":
      return {
        ...state,
        watched: [action.payload, ...state.watched],
      };
    case "DELETE_MOVIE":
      return;
    case "LOAD_WATCHLIST":
      return {
        ...state,
        watchlist: action.payload,
      };

    default:
      return state;
  }
};
