import { Action, Selector, State, StateContext } from '@ngxs/store';
import {
  AddJokeToFavourites,
  EditJokeRating,
  FetchNewJoke,
  RemoveAllJokesFromFavourites,
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
      starRating: newRating
    }
    const favouriteToEditIndex = state.favourites.findIndex(
      (favourite) => favourite.jokeData.id === id
    );
    console.log(favouriteToEdit, favouriteToEditIndex)

    patchState({
      favourites: [
        ...state.favourites.slice(0, favouriteToEditIndex),
        favouriteToEdit,
        ...state.favourites.slice(favouriteToEditIndex+1),
      ] as Joke[]
    })
    localStorage.setItem('favourites', JSON.stringify(getState().favourites));
  }
}
