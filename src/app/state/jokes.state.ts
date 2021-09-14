import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddJokeToFavourites,
  FetchNewJoke,
  RemoveJoke,
  SetJokes,
} from '../actions/joke.actions';
import { Joke } from '../models/JokesModel';

export class JokeStateModel {
  joke: Joke | {};
  favourites: Joke[];
  error: string | null;
}
@State<JokeStateModel>({
  name: 'jokesState',
  defaults: {
    joke: {
      jokeData: {},
      isFavourite: false,
    },
    favourites: [],
    error: null,
  },
})
export class JokeState {
  @Selector()
  static getJokes(state: JokeStateModel) {
    return state.favourites;
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
    localStorage.setItem('favourites', JSON.stringify([...state.favourites, payload]));
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
      favourites: getState().favourites.filter(favourite => favourite.jokeData!.id != id),
    });
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }
}
