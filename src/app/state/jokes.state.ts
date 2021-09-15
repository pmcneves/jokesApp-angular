import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddJokeToFavourites,
  EditJokeRating,
  FetchNewJoke,
  RemoveAllJokesFromFavourites,
  RemoveJoke,
  SetJokes,
  SortBy,
} from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';

export class JokeStateModel {
  joke: Joke | {};
  favourites: Joke[];
  error: string | null;
  sortBy: string;
}
@State<JokeStateModel>({
  name: 'jokesState',
  defaults: {
    joke: {
      jokeData: {},
      isFavourite: false,
      starRating: '',
    },
    favourites: [],
    error: null,
    sortBy: '',
  },
})
export class JokeState {
  @Selector()
  static getJokes(state: JokeStateModel) {
    return state.favourites;
  }

  @Selector()
  static getSortedJokes(state: JokeStateModel) {
    const sortedFavourites: Joke[] = [...state.favourites].sort(
      (j1: Joke, j2: Joke) : number => {
        if (state.sortBy === 'ratingAsc') {
          return j1.starRating < j2.starRating ? 1 : -1;
        } else if (state.sortBy === 'ratingDesc') {
          return j2.starRating < j1.starRating ? 1 : -1;
        }
        return 0
      }
    );
    return sortedFavourites;
  }

  @Selector()
  static getJoke(state: JokeStateModel) {
    return state.joke;
  }

  @Action(AddJokeToFavourites)
  add(
    { getState, patchState }: StateContext<JokeStateModel>,
    { payload }: AddJokeToFavourites
  ) {
    const state = getState();
    patchState({
      favourites: [...state.favourites, payload],
    });
    localStorage.setItem(
      'favourites',
      JSON.stringify([...state.favourites, payload])
    );
  }

  @Action(FetchNewJoke)
  fetchNewJoke(
    { patchState }: StateContext<JokeStateModel>,
    { payload }: FetchNewJoke
  ) {
    patchState({
      joke: payload,
    });
    localStorage.setItem('joke', JSON.stringify(payload));
  }

  @Action(SetJokes)
  set({ patchState }: StateContext<JokeStateModel>) {
    const localStore = localStorage.getItem('favourites');
    const localJokes = localStore ? JSON.parse(localStore) : [];
    patchState({
      favourites: localJokes,
    });
  }

  @Action(RemoveJoke)
  remove(
    { getState, patchState }: StateContext<JokeStateModel>,
    { id }: RemoveJoke
  ) {
    patchState({
      favourites: getState().favourites.filter(
        (favourite) => favourite.jokeData!.id != id
      ),
    });
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }

  @Action(RemoveAllJokesFromFavourites)
  removeAll({ patchState }: StateContext<JokeStateModel>) {
    patchState({
      favourites: [],
    });
    localStorage.removeItem('favourites');
  }

  @Action(EditJokeRating)
  editJokeRating(
    { getState, patchState }: StateContext<JokeStateModel>,
    { id, newRating }: EditJokeRating
  ) {
    const state = getState();
    let favouriteToEdit = state.favourites.find(
      (favourite) => favourite.jokeData.id === id
    ) as Joke;
    favouriteToEdit = {
      ...favouriteToEdit,
      starRating: newRating,
    };
    const favouriteToEditIndex = state.favourites.findIndex(
      (favourite) => favourite.jokeData.id === id
    );
    patchState({
      favourites: [
        ...state.favourites.slice(0, favouriteToEditIndex),
        favouriteToEdit,
        ...state.favourites.slice(favouriteToEditIndex + 1),
      ] as Joke[],
    });
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }

  @Action(SortBy)
  sortByFilter(
    { patchState }: StateContext<JokeStateModel>,
    { sortBy }: SortBy
  ) {
    patchState({
      sortBy: sortBy,
    });
  }
}
